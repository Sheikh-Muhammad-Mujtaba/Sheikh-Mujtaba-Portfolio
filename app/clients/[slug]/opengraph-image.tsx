import { clients, getClient, serviceLabels } from "../../../data/clients";
import { ogContentType, ogSize, renderOgCard } from "../../../utils/og-card";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Client case study by Sheikh Mujtaba";

export function generateStaticParams() {
  return clients.map((client) => ({ slug: client.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

const MAX_TAGS = 3;

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const client = getClient(slug);

  return renderOgCard({
    eyebrow: "Case study",
    title: client?.name ?? "Client case study",
    subtitle: client?.sector,
    tags: client?.services.slice(0, MAX_TAGS).map((key) => serviceLabels[key]) ?? [],
  });
}
