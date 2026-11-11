import { ImageResponse } from "next/og";

import { brand } from "@/content/brand";
import { getDictionary } from "@/lib/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamic = "force-static";

const primary = "#4338ca";
const ink = "#0f172a";
const muted = "#475569";
const subtle = "#64748b";
const surface = "#f8fafc";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dictionary = getDictionary(locale);
  const domain = brand.baseUrl.replace(/^https?:\/\//, "");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: surface,
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: primary,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          F
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: ink }}>{brand.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 800,
            color: ink,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {dictionary.meta.ogTitle}
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            color: muted,
            maxWidth: 920,
          }}
        >
          {brand.tagline[locale]}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: subtle,
        }}
      >
        <span>{dictionary.meta.ogTags}</span>
        <span>{domain}</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
