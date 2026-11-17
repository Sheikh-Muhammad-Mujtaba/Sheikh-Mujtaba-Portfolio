import { ogContentType, ogSize, renderOgCard } from "../utils/og-card";

export const contentType = ogContentType;
export const size = ogSize;
export const alt = "Sheikh Mujtaba (Mujtaba Javed) - AI Security Engineer & AI Developer";

export default function Image() {
  return renderOgCard({
    eyebrow: "AI Security Engineer",
    title: "Sheikh Mujtaba (Mujtaba Javed)",
    subtitle: "AI red teaming, prompt injection testing, secure AI agents and RAG pipelines.",
    tags: ["AI Security", "Agentic AI", "Red Teaming"],
  });
}
