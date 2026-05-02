"use client";

import { useMemo, useState } from "react";

type Props = {
  embedUrl: string;
  title?: string;
  className?: string;
  id?: string;
};

function extractYouTubeId(url: string) {
  try {
    const parsedUrl = new URL(url, "https://example.com");
    if (parsedUrl.pathname.includes("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1].split("?")[0];
    }
    if (parsedUrl.hostname?.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1).split("?")[0];
    }
    if (parsedUrl.searchParams.has("v")) {
      return parsedUrl.searchParams.get("v") || null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function YouTubeHoverPlayer({ embedUrl, title, className, id }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoId = extractYouTubeId(embedUrl || "");

  const src = useMemo(() => {
    if (!videoId) {
      return embedUrl;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1&autoplay=1`;
  }, [embedUrl, videoId]);

  if (isLoaded) {
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

  return (
    <button
      type="button"
      id={id}
      className={className}
      onClick={() => setIsLoaded(true)}
      aria-label={title ? `Play ${title}` : "Play project video demo"}
    >
      <span>Play Demo</span>
    </button>
  );
}
