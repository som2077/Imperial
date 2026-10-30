import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  NEXT_LOCALE_COOKIE,
  isSupportedLocale,
  type SupportedLocale,
} from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

export async function getServerLocale(): Promise<SupportedLocale> {
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get(NEXT_LOCALE_COOKIE)?.value;
    if (localeCookie && isSupportedLocale(localeCookie)) {
      return localeCookie;
    }
  } catch {
    // Return fallback during static generation or build-time rendering
  }
  return DEFAULT_LOCALE;
}

export async function getServerDictionary(): Promise<{
  locale: SupportedLocale;
  dictionary: Dictionary;
}> {
  const locale = await getServerLocale();
  return {
    locale,
    dictionary: getDictionary(locale),
  };
}
