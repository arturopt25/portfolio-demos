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

const siteName = "FlowDesk";
const baseUrl = "https://flowdesk-demo.pages.dev";

export const metadata: Metadata = createMetadata({
  title: "FlowDesk — Customer support that flows",
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
