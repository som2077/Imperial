import { en, type Dictionary } from "./en";
import { es } from "./es";
import { de } from "./de";
import { fr } from "./fr";
import { hi } from "./hi";
import type { SupportedLocale } from "../config";

export type { Dictionary };

export const dictionaries: Record<SupportedLocale, Dictionary> = {
  en,
  es,
  de,
  fr,
  hi,
};

export function getDictionary(locale: SupportedLocale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
