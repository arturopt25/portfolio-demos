import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@folio/config/tokens.css";
import "./globals.css";

import { createMetadata } from "@folio/seo";

import { AppProviders } from "@/components/app-providers";
import { ThemeScript } from "@/components/theme-script";
import { brand } from "@/content/brand";
import { normalizeTheme } from "@/lib/theme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Build-time default theme. Use `NEXT_PUBLIC_DEFAULT_THEME=dark|bold` when
 * building; invalid values fall back to `brand.defaultTheme` ("default").
 * Runtime `?theme=` overrides are validated by the blocking script.
 */
const defaultTheme = normalizeTheme(
  process.env.NEXT_PUBLIC_DEFAULT_THEME ?? brand.defaultTheme,
  brand.defaultTheme,
);

const themeColor =
  defaultTheme === "dark" ? "#020617" : defaultTheme === "bold" ? "#0b0b0f" : "#ffffff";

export const metadata: Metadata = {
  ...createMetadata({
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    siteName: brand.name,
    baseUrl: brand.baseUrl,
    path: "/",
    image: "/og.png",
  }),
  applicationName: brand.name,
  authors: [{ name: brand.name }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={inter.variable}
      data-theme={defaultTheme === "default" ? undefined : defaultTheme}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript defaultTheme={defaultTheme} />
      </head>
      <body className="font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
