import { getRole, rolePages } from "../../utils/role-data";
import { ogContentType, ogSize, renderOgCard } from "../../utils/og-card";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Sheikh Mujtaba (Mujtaba Javed)";

export function generateStaticParams() {
  return rolePages.map((page) => ({ role: page.slug }));
}

type ImageProps = {
  params: Promise<{ role: string }>;
};

const MAX_TAGS = 3;

export default async function Image({ params }: ImageProps) {
  const { role } = await params;
  const page = getRole(role);

  return renderOgCard({
    eyebrow: page?.role ?? "Sheikh Mujtaba",
    title: page ? `Sheikh Mujtaba — ${page.role}` : "Sheikh Mujtaba",
    subtitle: "Mujtaba Javed · Pakistan · Remote worldwide",
    tags: page?.tags.slice(0, MAX_TAGS) ?? [],
  });
}
