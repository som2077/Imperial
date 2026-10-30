export type SupportedLocale = "en" | "es" | "de" | "fr" | "hi";

export interface LocaleMetadata {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
  direction: "ltr" | "rtl";
}

export const DEFAULT_LOCALE: SupportedLocale = "en";
export const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

export const SUPPORTED_LOCALES: LocaleMetadata[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English (US)",
    flag: "🇺🇸",
    direction: "ltr",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    direction: "ltr",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    direction: "ltr",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    direction: "ltr",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    direction: "ltr",
  },
];

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.some((item) => item.code === locale);
}
