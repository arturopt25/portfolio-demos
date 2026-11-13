import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@folio/config/tokens.css";
import "./globals.css";

import { createMetadata } from "@folio/seo";

import { buildAppThemeScript } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const themeScript = buildAppThemeScript();

const siteName = "Casefern";
const baseUrl = "https://casefern-demo.pages.dev";

export const metadata: Metadata = createMetadata({
  title: "Casefern — Customer support that flows",
  description:
    "A fictional B2B SaaS demo: a shared inbox, automations, and reporting for modern support teams.",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
