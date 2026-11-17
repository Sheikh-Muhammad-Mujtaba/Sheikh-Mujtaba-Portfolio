import { blogPosts, getPost } from "../../../utils/blog-data";
import { ogContentType, ogSize, renderOgCard } from "../../../utils/og-card";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Article by Sheikh Mujtaba, AI Security Engineer";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

const MAX_TAGS = 2;

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgCard({
    eyebrow: post?.focusKeyword ?? "Engineering Notes",
    title: post?.heading ?? post?.title ?? "Engineering Notes",
    subtitle: post ? `${post.readingMinutes} min read` : undefined,
    tags: post?.keywords.slice(0, MAX_TAGS) ?? [],
  });
}
