import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * 1200×630 (1.91:1) is the size every major unfurler expects: Facebook,
 * LinkedIn, WhatsApp, Slack, Discord and X's `summary_large_image`. Keep the
 * important content inside the centre ~1000px — X and some chat apps crop the
 * edges on narrow screens.
 */
export const ogSize = { width: 1200, height: 630 } as const;

export const ogContentType = "image/png";

const PALETTE = {
  background: "#030712",
  accent: "#22d3ee",
  gold: "#d6b56d",
  text: "#f8fafc",
  muted: "#94a3b8",
} as const;

const TITLE_LONG_THRESHOLD = 60;

type OgCardProps = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Short footer chips. */
  tags?: string[];
};

let profileDataUrl: Promise<string> | undefined;

/** Read once per server instance; the file is traced into the deployment. */
function loadProfile(): Promise<string> {
  profileDataUrl ??= readFile(join(process.cwd(), "assets/og/profile.jpg")).then(
    (buffer) => `data:image/jpeg;base64,${buffer.toString("base64")}`,
  );
  return profileDataUrl;
}

/**
 * Shared Open Graph card. Satori (the renderer behind `ImageResponse`) does not
 * support `background-clip: text`, so every colour here is solid — the old
 * gradient title rendered as black text on a black background.
 */
export async function renderOgCard({
  eyebrow,
  title,
  subtitle,
  tags = [],
}: OgCardProps): Promise<ImageResponse> {
  const profile = await loadProfile();
  const titleSize = title.length > TITLE_LONG_THRESHOLD ? 50 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: PALETTE.background,
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 10% 90%, rgba(214,181,109,0.16), transparent 50%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: PALETTE.accent,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.12,
              color: PALETTE.text,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.35,
                color: PALETTE.muted,
              }}
            >
              {subtitle}
            </div>
          ) : null}
          <div style={{ display: "flex", flex: 1 }} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 14,
              maxHeight: 112,
              overflow: "hidden",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 20,
                  color: PALETTE.text,
                  border: `1px solid ${PALETTE.accent}`,
                  borderRadius: 999,
                  padding: "8px 18px",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 300,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori only renders <img>. */}
          <img
            src={profile}
            width={260}
            height={260}
            alt=""
            style={{ borderRadius: 999, border: `6px solid ${PALETTE.gold}` }}
          />
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, fontWeight: 700, color: PALETTE.text }}>
            Sheikh Mujtaba
          </div>
          <div style={{ display: "flex", marginTop: 6, fontSize: 22, color: PALETTE.gold }}>
            sheikhmujtaba.me
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
