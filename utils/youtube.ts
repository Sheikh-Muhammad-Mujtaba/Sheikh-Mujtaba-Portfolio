/** `https://www.youtube.com/embed/<id>?...` → a high-quality still for cards. */
export function youTubeThumbnail(embedUrl: string): string | undefined {
  const id = /\/embed\/([\w-]{6,})/.exec(embedUrl)?.[1];
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}
