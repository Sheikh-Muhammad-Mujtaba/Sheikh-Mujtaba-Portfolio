import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { cyber, decode, monoFont } from "./theme";

export const PORTRAIT_HUD_DURATION = 240; // 8s loop

const TAU = Math.PI * 2;

/**
 * Biometric-scan HUD laid over the hero portrait: breathing corner brackets,
 * a sweeping scan beam, a face-lock reticle and identity readouts.
 * Kept to the top two-thirds so it never fights the glass badge at the bottom.
 */
export const PortraitHud: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const breathe = (Math.sin(t * TAU * 2) + 1) / 2;
  const inset = 14 + breathe * 4;
  const bracket = Math.min(width, height) * 0.12;
  const fontSize = width < 320 ? 9 : 10.5;

  // Beam sweeps down twice per loop, fading near the badge.
  const beamP = (t * 2) % 1;
  const beamY = beamP * height * 0.78;
  const beamOpacity = Math.sin(beamP * Math.PI);

  // Face lock: reticle around the upper-centre of the frame.
  const fx = width * 0.5;
  const fy = height * 0.34;
  const fr = Math.min(width, height) * 0.2;
  const lockCycle = (t * 2) % 1; // re-acquires on each sweep
  const locked = lockCycle > 0.45;
  const lockColor = locked ? cyber.green : cyber.cyan;

  const live = Math.floor(frame / 15) % 2 === 0;
  const idText = decode("ID::SHEIKH_MUJTABA", Math.min(1, lockCycle * 2.2), Math.floor(frame / 3));

  const bracketStyle = (top: boolean, left: boolean): React.CSSProperties => ({
    position: "absolute",
    width: bracket,
    height: bracket,
    top: top ? inset : undefined,
    bottom: top ? undefined : inset,
    left: left ? inset : undefined,
    right: left ? undefined : inset,
    borderTop: top ? `2px solid ${cyber.cyan}` : undefined,
    borderBottom: top ? undefined : `2px solid ${cyber.cyan}`,
    borderLeft: left ? `2px solid ${cyber.cyan}` : undefined,
    borderRight: left ? undefined : `2px solid ${cyber.cyan}`,
    opacity: 0.55 + breathe * 0.35,
    filter: `drop-shadow(0 0 6px ${cyber.cyanSoft})`,
  });

  return (
    <AbsoluteFill style={{ fontFamily: monoFont, color: cyber.cyan }}>
      <div style={bracketStyle(true, true)} />
      <div style={bracketStyle(true, false)} />
      <div style={bracketStyle(false, true)} />
      <div style={bracketStyle(false, false)} />

      {/* Scan beam */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: beamY - 60,
          height: 60,
          opacity: beamOpacity,
          background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.10) 80%, rgba(34,211,238,0.45))",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: beamY,
          height: 1,
          opacity: beamOpacity,
          background: cyber.cyan,
          boxShadow: `0 0 12px ${cyber.cyan}`,
        }}
      />

      {/* Face reticle */}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <g transform={`rotate(${t * 360} ${fx} ${fy})`} opacity={0.5}>
          <circle cx={fx} cy={fy} r={fr} fill="none" stroke={lockColor} strokeWidth={1} strokeDasharray="4 8" />
        </g>
        <g opacity={locked ? 0.8 : 0.35}>
          {[
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
          ].map(([sx, sy]) => {
            const r = fr * (locked ? 0.82 : 1.05);
            const x = fx + sx * r;
            const y = fy + sy * r;
            const l = fr * 0.22;
            return (
              <path
                key={`${sx}${sy}`}
                d={`M ${x} ${y - sy * l} L ${x} ${y} L ${x - sx * l} ${y}`}
                fill="none"
                stroke={lockColor}
                strokeWidth={1.5}
              />
            );
          })}
        </g>
      </svg>

      {/* Readouts */}
      <div
        style={{
          position: "absolute",
          top: inset + 10,
          left: inset + 12,
          right: inset + 12,
          display: "flex",
          justifyContent: "space-between",
          fontSize,
          letterSpacing: "0.14em",
          textShadow: "0 1px 6px rgba(2,6,23,0.9)",
        }}
      >
        <span>{idText}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, color: cyber.white }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: live ? cyber.red : "transparent",
              boxShadow: live ? `0 0 8px ${cyber.red}` : "none",
            }}
          />
          LIVE
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: fy + fr + 10,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: fontSize - 0.5,
          letterSpacing: "0.22em",
          color: lockColor,
          opacity: locked ? 0.9 : 0.5,
          textShadow: "0 1px 6px rgba(2,6,23,0.9)",
        }}
      >
        {locked ? "MATCH 99.7% | CLEARANCE L5" : "ACQUIRING..."}
      </div>
    </AbsoluteFill>
  );
};
