import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "@folio/config/tokens.css";
import "./globals.css";

import { BrandMark } from "@/components/brand-mark";
import { brand } from "@/content/brand";
import { getDictionary } from "@/lib/dictionary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found — Ferrowind Partners",
  description: "The page you requested does not exist in this demo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  const dictionary = getDictionary("en");

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <main
          id="main"
          className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-5 px-6 py-16"
        >
          <BrandMark name={brand.name} />

          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">404</p>
          <h1 className="font-display text-fg text-4xl font-bold tracking-tight sm:text-5xl">
            {dictionary.notFound.title}
          </h1>
          <p className="text-muted text-base leading-7">{dictionary.notFound.description}</p>

          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="/en/"
              className="bg-primary text-primary-fg hover:bg-primary-hover focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {dictionary.notFound.back}
            </a>
            <a
              href="/es/"
              hrefLang="es"
              lang="es"
              className="border-border bg-elevated text-fg hover:bg-surface focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {dictionary.language.es}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
