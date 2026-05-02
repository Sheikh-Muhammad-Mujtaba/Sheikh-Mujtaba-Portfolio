"use client";

import { useMemo } from "react";

type Props = {
  embedUrl: string;
  title?: string;
  className?: string;
  id?: string;
};

function extractYouTubeId(url: string) {
  try {
    const u = new URL(url, "https://example.com");
    if (u.pathname.includes("/embed/")) return u.pathname.split("/embed/")[1].split("?")[0];
    if (u.hostname?.includes("youtu.be")) return u.pathname.slice(1).split("?")[0];
    if (u.searchParams.has("v")) return u.searchParams.get("v") || null;
    return null;
  } catch (e) {
    return null;
  }
}

export default function YouTubeHoverPlayer({ embedUrl, title, className, id }: Props) {
  const videoId = extractYouTubeId(embedUrl || "");

  const src = useMemo(() => {
    if (!videoId) {
      return embedUrl;
    }
    // Use youtube-nocookie to reduce third-party cookie usage in embedded videos.
    return `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1`;
  }, [embedUrl, videoId]);

  return (
    <iframe
      id={id}
      src={src}
      title={title ?? "Project video demo"}
      className={className}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
