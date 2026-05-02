"use client";

import { useEffect, useRef } from "react";

type Props = {
  embedUrl: string;
  title?: string;
  className?: string;
  id?: string;
};

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
    __ytApiLoading?: Promise<void>;
  }
}

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

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (window.__ytApiLoading) return window.__ytApiLoading;

  window.__ytApiLoading = new Promise((resolve) => {
    window.onYouTubeIframeAPIReady = () => resolve();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });

  return window.__ytApiLoading;
}

export default function YouTubeHoverPlayer({ embedUrl, title, className, id }: Props) {
  const containerId = useRef(id ?? `yt-player-${Math.random().toString(36).slice(2, 9)}`);
  const playerRef = useRef<any>(null);

  const videoId = extractYouTubeId(embedUrl || "") || embedUrl;

  useEffect(() => {
    let mounted = true;
    if (!videoId) return;

    loadYouTubeAPI()
      .then(() => {
        if (!mounted) return;
        // Create player
        playerRef.current = new window.YT.Player(containerId.current, {
          videoId,
          playerVars: {
            enablejsapi: 1,
            origin: window.location.origin,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (e: any) => {
              try {
                e.target.mute();
              } catch (err) {}
            },
          },
        });

        // Ensure iframe has autoplay permission
        setTimeout(() => {
          try {
            const iframe = playerRef.current.getIframe();
            if (iframe) {
              iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
              iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            }
          } catch (e) {}
        }, 1000);
      })
      .catch(() => {});

    return () => {
      mounted = false;
      try {
        if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy();
      } catch (e) {}
    };
  }, [videoId]);

  const handlePlay = async () => {
    try {
      const p = playerRef.current;
      if (!p) return;
      p.mute && p.mute();
      // playVideo may throw if not allowed; ignore errors
      p.playVideo && p.playVideo();
    } catch (e) {}
  };

  const handlePause = () => {
    try {
      const p = playerRef.current;
      if (!p) return;
      p.pauseVideo && p.pauseVideo();
    } catch (e) {}
  };

  if (!videoId) {
    // fallback to regular iframe
    return (
      <iframe
        src={embedUrl}
        title={title}
        className={className}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <div
      id={containerId.current}
      className={className}
      tabIndex={0}
      onMouseEnter={handlePlay}
      onFocus={handlePlay}
      onMouseLeave={handlePause}
      onBlur={handlePause}
      aria-label={title ?? "YouTube video player"}
    />
  );
}
