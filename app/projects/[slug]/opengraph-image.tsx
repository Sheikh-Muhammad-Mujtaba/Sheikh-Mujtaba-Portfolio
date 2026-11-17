import { ogContentType, ogSize, renderOgCard } from "../../../utils/og-card";
import { getProjectPage, projectPages } from "../../../utils/project-details";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Project by Sheikh Mujtaba";

export function generateStaticParams() {
  return projectPages.map((page) => ({ slug: page.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

const MAX_TAGS = 3;

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const page = getProjectPage(slug);

  return renderOgCard({
    eyebrow: page ? `${page.type} project` : "Project",
    title: page?.name ?? "Project",
    tags: page?.detail.stack.slice(0, MAX_TAGS) ?? [],
  });
}
