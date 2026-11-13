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
  title: "Page not found / Página no encontrada — Ferrowind Partners",
  description:
    "The page you requested does not exist in this demo. / La página solicitada no existe en esta demo.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GlobalNotFound() {
  const english = getDictionary("en");
  const spanish = getDictionary("es");

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <main
          id="main"
          className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-5 px-6 py-16"
        >
          <BrandMark name={brand.name} />

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">404</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            <span lang="en">{english.notFound.title}</span>
            <span aria-hidden="true"> / </span>
            <span lang="es">{spanish.notFound.title}</span>
          </h1>
          <p className="text-base leading-7 text-muted">
            <span lang="en">{english.notFound.description}</span>{" "}
            <span lang="es">{spanish.notFound.description}</span>
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="/en/"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {english.notFound.back}
            </a>
            <a
              href="/es/"
              hrefLang="es"
              lang="es"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-elevated px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {spanish.notFound.back}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
