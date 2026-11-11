import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Inter } from "next/font/google";

import "@folio/config/tokens.css";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Redirecting — Ferrowind Partners",
  description: "This demo is available in English and Spanish.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
