import type { CSSProperties } from "react";

import ConsoleAutoplay from "./console-autoplay";
import styles from "../styles/security-console.module.scss";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string; tone?: "muted" | "ok" | "warn" | "accent" | "bright" }
  | { kind: "progress"; label: string };

const SCRIPT: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "sheikh_mujtaba  ::  ai developer + security engineer", tone: "bright" },
  { kind: "cmd", text: "nmap -sV --top-ports 4 erp.client.internal" },
  { kind: "out", text: "PORT      STATE     SERVICE", tone: "muted" },
  { kind: "out", text: "22/tcp    filtered  ssh" },
  { kind: "out", text: "443/tcp   open      https  (tls1.3, hsts)", tone: "ok" },
  { kind: "out", text: "8000/tcp  closed    erpnext-dev" },
  { kind: "cmd", text: "./redteam --target rag-agent --suite prompt-injection" },
  { kind: "progress", label: "fuzzing 1,284 payloads" },
  { kind: "out", text: "[!] 3 jailbreak vectors found -> patched + regression-tested", tone: "warn" },
  { kind: "out", text: "[+] 0 critical  |  guardrails active  |  context grounded", tone: "ok" },
  { kind: "cmd", text: "deploy --env prod --zero-trust" },
  { kind: "out", text: ">> shipped. secure by design.", tone: "accent" },
];

// Timing (ms). Starts almost immediately once the console is on screen.
const START = 120;
const CHAR_MS = 30;
const CMD_PAUSE = 240;
const OUT_GAP = 110;
const PROGRESS_MS = 1200;
const BAR_CELLS = 24;

const TIMELINE = (() => {
  let t = START;
  return SCRIPT.map((line) => {
    const delay = t;
    const typeMs = line.kind === "cmd" ? line.text.length * CHAR_MS : 0;
    if (line.kind === "cmd") t += typeMs + CMD_PAUSE;
    else if (line.kind === "progress") t += PROGRESS_MS + OUT_GAP;
    else t += OUT_GAP;
    return { line, delay, typeMs };
  });
})();

const END = TIMELINE[TIMELINE.length - 1].delay + OUT_GAP;

type Vars = CSSProperties & Record<`--${string}`, string | number>;

const Prompt = () => (
  <>
    <span className={styles.user}>mujtaba@sec-ops</span>
    <span className={styles.muted}>:</span>
    <span className={styles.path}>~</span>
    <span className={styles.muted}>$ </span>
  </>
);

/**
 * Ops terminal transcript. The full text is server-rendered (crawlable, no
 * layout shift); CSS plays the typing once the console scrolls into view.
 */
export default function SecurityConsole() {
  return (
    <ConsoleAutoplay className={styles.terminal}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dot} data-c="red" />
        <span className={styles.dot} data-c="gold" />
        <span className={styles.dot} data-c="green" />
        <span className={styles.title}>mujtaba@sec-ops - zsh - encrypted</span>
        <span className={styles.secure}>[ SECURE ]</span>
      </div>
      <pre className={styles.body} aria-label="Terminal session: reconnaissance, AI red-team audit and a hardened production deploy">
        <code>
          {TIMELINE.map(({ line, delay, typeMs }, i) => {
            if (line.kind === "cmd") {
              const vars: Vars = { "--d": `${delay}ms`, "--t": `${typeMs}ms`, "--n": line.text.length };
              return (
                <span key={i} className={`${styles.line} ${styles.cmdLine}`} style={vars}>
                  <Prompt />
                  <span className={styles.typed}>{line.text}</span>
                </span>
              );
            }
            if (line.kind === "progress") {
              const vars: Vars = { "--d": `${delay}ms`, "--t": `${PROGRESS_MS}ms`, "--n": BAR_CELLS };
              return (
                <span key={i} className={`${styles.line} ${styles.out} ${styles.progress}`} style={vars}>
                  [<span className={styles.bar} data-empty={".".repeat(BAR_CELLS)}>
                    <span className={styles.barFill}>{"#".repeat(BAR_CELLS)}</span>
                  </span>] 100%  <span className={styles.muted}>{line.label}</span>
                </span>
              );
            }
            const vars: Vars = { "--d": `${delay}ms` };
            return (
              <span key={i} className={`${styles.line} ${styles.out}`} data-tone={line.tone} style={vars}>
                {line.text}
              </span>
            );
          })}
          <span className={`${styles.line} ${styles.out}`} style={{ "--d": `${END}ms` } as Vars} aria-hidden="true">
            <Prompt />
            <span className={styles.cursor} />
          </span>
        </code>
      </pre>
      <noscript>
        {/* Without JS nothing would start the animation — show the finished transcript. */}
        <style>{`.${styles.terminal} *{animation:none!important;opacity:1!important;width:auto!important}`}</style>
      </noscript>
    </ConsoleAutoplay>
  );
}
