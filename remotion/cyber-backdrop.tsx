import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { cyber, GLYPHS, monoFont } from "./theme";

export const CYBER_BACKDROP_DURATION = 360; // 12s @ 30fps — every motion below completes whole cycles so the loop is seamless

const TAU = Math.PI * 2;
const NODE_COUNT = 22;
const STREAM_COUNT = 16;
const STREAM_LENGTH = 14;
const LINK_DISTANCE = 0.24; // fraction of the larger side

/**
 * Hero backdrop: glyph rain, a drifting threat-intel node graph with data
 * packets, a radar sweep and a scan line. Sized from the Player's measured box.
 */
export const CyberBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0 → 1 across the loop
  const isNarrow = width < 760;
  const maxSide = Math.max(width, height);

  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
    const baseX = random(`nx-${i}`) * width;
    const baseY = random(`ny-${i}`) * height;
    const amp = 18 + random(`na-${i}`) * 28;
    const phase = random(`np-${i}`) * TAU;
    return {
      x: baseX + Math.sin(t * TAU + phase) * amp,
      y: baseY + Math.cos(t * TAU * 2 + phase) * amp * 0.6,
      hot: random(`nh-${i}`) > 0.82,
      phase,
    };
  });

  const links: { a: number; b: number; d: number }[] = [];
  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      const d = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) / maxSide;
      if (d < LINK_DISTANCE) links.push({ a, b, d });
    }
  }

  const radarX = isNarrow ? width * 0.5 : width * 0.74;
  const radarY = isNarrow ? height * 0.3 : height * 0.48;
  const radarR = Math.min(width, height) * (isNarrow ? 0.42 : 0.46);
  const sweepDeg = t * 360 * 3;
  const scanY = ((t * 2) % 1) * height;
  const glyphStep = Math.floor(frame / 4); // 90 steps per loop → glyphs repeat on loop

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* Radar */}
      <div
        style={{
          position: "absolute",
          left: radarX - radarR,
          top: radarY - radarR,
          width: radarR * 2,
          height: radarR * 2,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, rgba(34,211,238,0.22) 0deg, rgba(34,211,238,0.05) 28deg, transparent 70deg, transparent 360deg)",
          maskImage: "radial-gradient(circle, black 55%, transparent 71%)",
          WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 71%)",
          opacity: 0.55,
          // Static gradient + transform: the GPU composites the sweep instead of repainting it.
          transform: `rotate(${sweepDeg}deg)`,
          willChange: "transform",
        }}
      />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <circle
            key={r}
            cx={radarX}
            cy={radarY}
            r={radarR * r * 0.7}
            fill="none"
            stroke={cyber.cyan}
            strokeOpacity={0.08}
            strokeDasharray={r === 1 ? "2 6" : undefined}
          />
        ))}
        <line x1={radarX - radarR * 0.7} y1={radarY} x2={radarX + radarR * 0.7} y2={radarY} stroke={cyber.cyan} strokeOpacity={0.06} />
        <line x1={radarX} y1={radarY - radarR * 0.7} x2={radarX} y2={radarY + radarR * 0.7} stroke={cyber.cyan} strokeOpacity={0.06} />

        {/* Node graph */}
        {links.map(({ a, b, d }) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={cyber.cyan}
            strokeOpacity={0.16 * (1 - d / LINK_DISTANCE)}
            strokeWidth={1}
          />
        ))}
        {links
          .filter((_, i) => i % 3 === 0)
          .map(({ a, b }, i) => {
            const speed = 1 + (i % 3); // whole cycles per loop
            const p = (t * speed + random(`pk-${a}-${b}`)) % 1;
            const x = nodes[a].x + (nodes[b].x - nodes[a].x) * p;
            const y = nodes[a].y + (nodes[b].y - nodes[a].y) * p;
            const hostile = random(`pkc-${a}-${b}`) > 0.85;
            const color = hostile ? cyber.red : cyber.cyan;
            const o = Math.sin(p * Math.PI);
            // Halo circle instead of an SVG drop-shadow filter, which re-rasterises every frame.
            return (
              <g key={`pk-${a}-${b}`}>
                <circle cx={x} cy={y} r={5} fill={color} opacity={o * 0.18} />
                <circle cx={x} cy={y} r={1.8} fill={color} opacity={o * 0.9} />
              </g>
            );
          })}
        {nodes.map((n, i) => {
          const pulse = (Math.sin(t * TAU * 3 + n.phase) + 1) / 2;
          const color = n.hot ? cyber.gold : cyber.cyan;
          return (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r={2.2} fill={color} opacity={0.75} />
              <circle cx={n.x} cy={n.y} r={4 + pulse * 7} fill="none" stroke={color} strokeOpacity={0.35 * (1 - pulse)} />
            </g>
          );
        })}
      </svg>

      {/* Glyph rain */}
      {Array.from({ length: isNarrow ? Math.ceil(STREAM_COUNT / 2) : STREAM_COUNT }, (_, s) => {
        const fontSize = 12 + Math.round(random(`fs-${s}`) * 4);
        const streamH = STREAM_LENGTH * fontSize * 1.15;
        const speed = 1 + Math.floor(random(`sp-${s}`) * 2);
        const y = ((t * speed + random(`so-${s}`)) % 1) * (height + streamH) - streamH;
        const x = random(`sx-${s}`) * width;
        const chars = Array.from({ length: STREAM_LENGTH }, (_, c) =>
          GLYPHS[Math.floor(random(`g-${s}-${c}-${(glyphStep + c) % 90}`) * GLYPHS.length)]
        );
        return (
          <div
            key={s}
            style={{
              position: "absolute",
              left: x,
              top: y,
              fontFamily: monoFont,
              fontSize,
              lineHeight: 1.15,
              whiteSpace: "pre",
              color: cyber.cyan,
              opacity: 0.12 + random(`op-${s}`) * 0.14,
              maskImage: "linear-gradient(180deg, transparent, black 85%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent, black 85%)",
            }}
          >
            {chars.slice(0, -1).join("\n")}
            {"\n"}
            <span style={{ color: cyber.white }}>{chars[chars.length - 1]}</span>
          </div>
        );
      })}

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: scanY - 80,
          height: 80,
          background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.05) 85%, rgba(34,211,238,0.22))",
        }}
      />
    </AbsoluteFill>
  );
};
