import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sheikh Mujtaba Portfolio",
    short_name: "Mujtaba",
    description:
      "Portfolio of Sheikh Mujtaba, an AI Developer and Security Engineer specializing in Agentic AI systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#000000",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/Logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["portfolio", "technology", "business"],
    lang: "en-US",
    dir: "ltr",
  };
}
