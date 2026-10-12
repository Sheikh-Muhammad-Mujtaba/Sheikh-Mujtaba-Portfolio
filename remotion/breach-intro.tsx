import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { cyber, decode, monoFont } from "./theme";

// Matches the 4s CSS logo animation in styles/intro-overlay.module.scss:
// first impact at 20% (frame 24), second bounce at 42% (frame 50), travel from 72% (frame 86).
export const BREACH_INTRO_DURATION = 120;

const IMPACTS = [24, 50];

const BOOT_LOG: { at: number; text: string; tone?: "ok" | "warn" }[] = [
  { at: 2, text: "[0.000] smj-secure-os v5.5 :: cold boot" },
  { at: 10, text: "[0.214] loading kernel modules ........ ok", tone: "ok" },
  { at: 18, text: "[0.488] tls1.3 handshake :: x25519 / aes-256-gcm", tone: "ok" },
  { at: 28, text: "[0.903] scanning perimeter ............ 0 threats", tone: "ok" },
  { at: 38, text: "[1.260] prompt-injection guard ........ armed", tone: "ok" },
  { at: 48, text: "[1.612] anomalous probe :: 185.**.**.7 -> dropped", tone: "warn" },
  { at: 60, text: "[2.004] verifying operator identity ...", },
  { at: 72, text: "[2.410] operator: sheikh_mujtaba // clearance L5", tone: "ok" },
];

const fade = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/**
 * Intro overlay layer: boot log, lock-on reticle around the bouncing logo,
 * impact shockwaves, and an "ACCESS GRANTED" decode. Transparent background —
 * it sits on top of the overlay's own gradient.
 */
export const BreachIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const cx = width / 2;
  const cy = height / 2;
  const logo = Math.min(Math.max(width * 0.18, 80), 160);
  const isNarrow = width < 640;

  const exit = 1 - fade(frame, 84, 104);
  const reticleIn = fade(frame, 22, 34) * (1 - fade(frame, 78, 90));
  const progress = interpolate(frame, [6, 64], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const granted = frame >= 66;
  const status = granted
    ? decode("ACCESS GRANTED", fade(frame, 66, 76), Math.floor(frame / 2))
    : decode("ESTABLISHING SECURE CHANNEL", fade(frame, 8, 52), Math.floor(frame / 2));
  const glitch = granted && frame < 74 ? Math.sin(frame * 7) * 4 : 0;

  const labelSize = isNarrow ? 11 : 13;
  const statusTop = cy + logo * 0.5 + (isNarrow ? 46 : 70);

  return (
    <AbsoluteFill style={{ opacity: exit, fontFamily: monoFont }}>
      {/* Viewport frame brackets */}
      {(["tl", "tr", "bl", "br"] as const).map((c) => {
        const inset = isNarrow ? 14 : 28;
        const size = isNarrow ? 22 : 36;
        const top = c[0] === "t";
        const left = c[1] === "l";
        const line = `1px solid ${cyber.cyan}`;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              width: size,
              height: size,
              opacity: fade(frame, 0, 10) * 0.7,
              top: top ? inset : undefined,
              bottom: top ? undefined : inset,
              left: left ? inset : undefined,
              right: left ? undefined : inset,
              borderTop: top ? line : undefined,
              borderBottom: top ? undefined : line,
              borderLeft: left ? line : undefined,
              borderRight: left ? undefined : line,
            }}
          />
        );
      })}

      {/* Boot log */}
      <div
        style={{
          position: "absolute",
          left: isNarrow ? 22 : 48,
          top: isNarrow ? 30 : 52,
          fontSize: isNarrow ? 9.5 : 12,
          lineHeight: 1.75,
          color: cyber.muted,
          whiteSpace: "pre",
        }}
      >
        {BOOT_LOG.filter((l) => frame >= l.at).map((l) => {
          const typed = Math.min(l.text.length, Math.floor((frame - l.at) * 6));
          const color = l.tone === "warn" ? cyber.red : l.tone === "ok" ? "rgba(52,211,153,0.85)" : cyber.muted;
          return (
            <div key={l.at} style={{ color }}>
              {l.text.slice(0, typed)}
            </div>
          );
        })}
      </div>

      {/* Impact shockwaves */}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {IMPACTS.map((at, i) => {
          const p = fade(frame, at, at + 22);
          if (frame < at || p >= 1) return null;
          return (
            <g key={at}>
              <ellipse
                cx={cx}
                cy={cy + logo * 0.42}
                rx={logo * (0.5 + p * (i === 0 ? 3.2 : 1.8))}
                ry={logo * (0.08 + p * (i === 0 ? 0.5 : 0.28))}
                fill="none"
                stroke={cyber.cyan}
                strokeWidth={2 - p * 1.5}
                opacity={(1 - p) * 0.8}
              />
              <circle
                cx={cx}
                cy={cy}
                r={logo * (0.55 + p * (i === 0 ? 2.2 : 1.2))}
                fill="none"
                stroke={cyber.cyan}
                strokeWidth={1}
                opacity={(1 - p) * 0.4}
              />
            </g>
          );
        })}

        {/* Lock-on reticle */}
        <g opacity={reticleIn} transform={`rotate(${frame * 1.6} ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={logo * 0.78} fill="none" stroke={cyber.cyan} strokeOpacity={0.55} strokeDasharray="14 10 2 10" />
        </g>
        <g opacity={reticleIn} transform={`rotate(${-frame * 0.9} ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={logo * 0.92} fill="none" stroke={cyber.gold} strokeOpacity={0.35} strokeDasharray="60 30" />
        </g>
        <g opacity={reticleIn} stroke={cyber.cyan} strokeOpacity={0.6}>
          {[0, 90, 180, 270].map((deg) => {
            const r1 = logo * 1.0;
            const r2 = logo * 1.12;
            const a = (deg * Math.PI) / 180;
            return (
              <line key={deg} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2} />
            );
          })}
        </g>
      </svg>

      {/* Status + progress */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: statusTop,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: fade(frame, 4, 14),
        }}
      >
        <div
          style={{
            fontSize: granted ? labelSize + 4 : labelSize,
            letterSpacing: "0.32em",
            fontWeight: granted ? 700 : 500,
            color: granted ? cyber.green : cyber.cyan,
            textShadow: granted
              ? `${glitch}px 0 rgba(244,63,94,0.7), ${-glitch}px 0 rgba(34,211,238,0.7), 0 0 18px rgba(52,211,153,0.55)`
              : "0 0 12px rgba(34,211,238,0.45)",
            whiteSpace: "pre",
          }}
        >
          {status}
        </div>
        <div
          style={{
            width: Math.min(width * 0.6, 280),
            height: 2,
            background: "rgba(34,211,238,0.12)",
            overflow: "hidden",
            opacity: granted ? 1 - fade(frame, 70, 80) : 1,
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${cyber.emerald}, ${cyber.cyan})`,
              boxShadow: `0 0 10px ${cyber.cyan}`,
            }}
          />
        </div>
        <div style={{ fontSize: isNarrow ? 9 : 10, letterSpacing: "0.24em", color: cyber.muted }}>
          {granted ? "WELCOME, OPERATOR" : `SECURING SESSION ${String(Math.round(progress * 100)).padStart(3, "0")}%`}
        </div>
      </div>
    </AbsoluteFill>
  );
};
