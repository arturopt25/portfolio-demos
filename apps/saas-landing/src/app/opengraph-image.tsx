import { ImageResponse } from "next/og";

export const alt = "Casefern — Customer support that actually flows";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f8fafc",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 16,
            background: "#4338ca",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          C
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>Casefern</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 800,
            color: "#0f172a",
            letterSpacing: -2,
          }}
        >
          Customer support that actually flows.
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            color: "#475569",
            maxWidth: 900,
          }}
        >
          A fictional B2B SaaS demo: shared inbox, automations, and reporting for modern support
          teams.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#64748b",
        }}
      >
        <span>Shared inbox · Automations · Reporting</span>
        <span>casefern-demo.pages.dev</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
