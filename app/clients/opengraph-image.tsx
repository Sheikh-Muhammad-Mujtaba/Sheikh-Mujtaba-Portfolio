import { clients } from "../../data/clients";
import { ogContentType, ogSize, renderOgCard } from "../../utils/og-card";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Sheikh Mujtaba — Clients & Partners";

export default function Image() {
  return renderOgCard({
    eyebrow: "Case studies",
    title: "Clients & Partners",
    subtitle: `${clients.length} companies · Web, ERP, AI automation and security`,
    tags: ["Web", "ERPNext", "AI Automation"],
  });
}
