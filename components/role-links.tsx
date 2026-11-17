import Link from "next/link";

import { rolePages } from "../utils/role-data";

type RoleLinksProps = {
  className?: string;
  linkClassName?: string;
};

/**
 * Crawlable links to every role page. Google weighs internal links from
 * strong pages (home, about) when deciding how important a new URL is, so the
 * role pages must not be reachable only through the sitemap.
 */
export default function RoleLinks({ className, linkClassName }: RoleLinksProps) {
  return (
    <ul className={className}>
      {rolePages.map((page) => (
        <li key={page.slug}>
          <Link href={`/${page.slug}`} className={linkClassName}>
            {page.role}
          </Link>
        </li>
      ))}
    </ul>
  );
}
