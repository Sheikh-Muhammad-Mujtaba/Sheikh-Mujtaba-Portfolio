import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Sheikh Mujtaba - AI Developer & Security Engineer";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #020617 0%, #030712 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.2), transparent 70%)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontSize: 68,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #22d3ee 0%, #d6b56d 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Sheikh Mujtaba
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#f8fafc",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          AI Developer & Security Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#cbd5e1",
            textAlign: "center",
          }}
        >
          Building Secure AI Agents & ERPNext Automation Solutions
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
            fontSize: 20,
          }}
        >
          <span style={{ color: "#22d3ee" }}>•</span>
          <span style={{ color: "#f8fafc" }}>AI Agents</span>
          <span style={{ color: "#22d3ee" }}>•</span>
          <span style={{ color: "#f8fafc" }}>Digital FTE</span>
          <span style={{ color: "#22d3ee" }}>•</span>
          <span style={{ color: "#f8fafc" }}>Security</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
