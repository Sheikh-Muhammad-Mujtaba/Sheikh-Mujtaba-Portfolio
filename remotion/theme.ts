// Shared palette for the Remotion compositions — mirrors styles/variables.module.scss
export const cyber = {
  bg: "#020617",
  cyan: "#22d3ee",
  cyanSoft: "rgba(34, 211, 238, 0.35)",
  emerald: "#14b8a6",
  green: "#34d399",
  gold: "#d6b56d",
  red: "#f43f5e",
  white: "#f8fafc",
  muted: "#77879e",
};

export const monoFont =
  "var(--font-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

export const FPS = 30;

// Glyph pool for rain / decode effects: mostly binary, with a little hex.
export const GLYPHS = "0101010101010101010101ABCDEF";

// Scrambles `target` into random glyphs, resolving left→right as progress goes 0→1.
export const decode = (target: string, progress: number, seed: number) => {
  const resolved = Math.floor(target.length * Math.min(Math.max(progress, 0), 1));
  let out = "";
  for (let i = 0; i < target.length; i++) {
    if (i < resolved || target[i] === " ") {
      out += target[i];
    } else {
      out += GLYPHS[Math.abs(Math.floor(Math.sin((seed + i) * 12.9898) * 43758.5453)) % GLYPHS.length];
    }
  }
  return out;
};
