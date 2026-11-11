import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@folio/config/tokens.css";
import "./globals.css";

import { createMetadata } from "@folio/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteName = "Catalyst Studio";
const baseUrl = "https://catalyst-demo.pages.dev";

export const metadata: Metadata = createMetadata({
  title: "Catalyst Studio — Rebrand in a weekend, launch on Monday",
  description:
    "A fictional campaign landing demo for an agency that rebrands fast. Token-driven theming and a clear conversion path.",
  siteName,
  baseUrl,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
