import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export const alt = "Sheikh Mujtaba - AI Developer & Security Engineer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  let logoBase64 = "";
  
  try {
    const logoPath = path.join(process.cwd(), "public", "Logo.png");
    const logoData = fs.readFileSync(logoPath);
    logoBase64 = logoData.toString("base64");
  } catch (error) {
    console.warn("Failed to load Logo.png, attempting Logo.avif:", error);
    try {
      const logoPath = path.join(process.cwd(), "public", "Logo.avif");
      const logoData = fs.readFileSync(logoPath);
      logoBase64 = logoData.toString("base64");
    } catch (err) {
      console.warn("Failed to load Logo.avif as fallback:", err);
    }
  }

  const logoUrl = logoBase64 ? `data:image/png;base64,${logoBase64}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "800",
            color: "white",
            margin: "0 0 20px 0",
            textAlign: "center",
            letterSpacing: "-0.02em",
          }}
        >
          Sheikh Mujtaba
        </h1>
        <p
          style={{
            fontSize: "36px",
            color: "#22d3ee",
            margin: "0 0 16px 0",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          AI Developer & Security Engineer
        </p>
        <div
          style={{
            display: "flex",
            gap: "24px",
            fontSize: "24px",
            color: "#94a3b8",
          }}
        >
          <span>Agentic AI</span>
          <span style={{ color: "#475569" }}>•</span>
          <span>RAG Pipelines</span>
          <span style={{ color: "#475569" }}>•</span>
          <span>Secure Architecture</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
