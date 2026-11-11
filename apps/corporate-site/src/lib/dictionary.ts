import en from "@/messages/en.json";
import es from "@/messages/es.json";

import type { Locale } from "./i18n";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
