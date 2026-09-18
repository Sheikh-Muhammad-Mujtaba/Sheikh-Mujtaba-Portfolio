import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import styles from "../styles/blog.module.scss";
import { headingId, type PostBlock } from "../utils/blog-data";

/**
 * Minimal inline renderer for the post content model: `**bold**`,
 * backtick-wrapped code and `[label](/href)` links. Anything else is emitted as
 * plain text, so authored content can never inject markup.
 */
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (!part) return null;
    const key = `${index}-${part.slice(0, 12)}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={key} className={styles.inlineCode}>
          {part.slice(1, -1)}
        </code>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        return (
          <Link key={key} href={href} className={styles.inlineLink}>
            {label}
          </Link>
        );
      }
      return (
        <a
          key={key}
          href={href}
          className={styles.inlineLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      );
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

export default function BlogContent({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "h2":
            return (
              <h2 key={key} id={headingId(block.text)} className={styles.h2}>
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={key} className={styles.h3}>
                {block.text}
              </h3>
            );

          case "p":
            return <p key={key}>{renderInline(block.text)}</p>;

          case "ul":
            return (
              <ul key={key} className={styles.list}>
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} className={`${styles.list} ${styles.listOrdered}`}>
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ol>
            );

          case "code":
            return (
              <pre key={key} className={styles.code} data-lang={block.lang}>
                <code>{block.code}</code>
              </pre>
            );

          case "callout":
            return (
              <aside key={key} className={styles.callout}>
                <p className={styles.calloutTitle}>{block.title}</p>
                <p>{renderInline(block.text)}</p>
              </aside>
            );

          case "table":
            return (
              <div key={key} className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
