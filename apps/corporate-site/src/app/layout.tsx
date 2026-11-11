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

const siteName = "Nexova Systems";
const baseUrl = "https://nexova-demo.pages.dev";

export const metadata: Metadata = createMetadata({
  title: "Nexova Systems — Engineering clarity for complex infrastructure",
  description:
    "A fictional corporate site demo for an infrastructure consultancy. Services, case studies, and contact.",
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
