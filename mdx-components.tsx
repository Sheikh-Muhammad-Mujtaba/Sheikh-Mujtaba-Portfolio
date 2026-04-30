import Image, { ImageProps } from "next/image";
import type { MDXComponents } from "mdx/types";

import commonStyles from "./styles/common.module.scss";
import postStyles from "./styles/post.module.scss";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const imageProps = {
    alt: "",
    sizes: "100vw",
    quality: 100,
  };

  return {
    ...components,
    a: ({ children, ...props }) => (
      <a {...props} className={commonStyles.playfulHover}>
        {children}
      </a>
    ),
    Image: (props) => (
      <Image
        {...imageProps}
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
        sizes={props.sizes ?? imageProps.sizes}
        quality={props.quality ?? imageProps.quality}
      />
    ),
    img: (props) => (
      <Image
        {...imageProps}
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
        sizes={props.sizes ?? imageProps.sizes}
        quality={props.quality ?? imageProps.quality}
      />
    ),
    figure: ({ children, ...props }) => (
      <div className={postStyles.codeContainer}>
        <figure {...props}>{children}</figure>
      </div>
    ),
  };
}
