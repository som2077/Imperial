"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  type SupportedLocale,
  type LocaleMetadata,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  NEXT_LOCALE_COOKIE,
} from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";
import { useAppStore } from "@/lib/store/use-app-store";

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  dictionary: Dictionary;
  t: (path: string, fallbackOrParams?: string | Record<string, string | number>) => string;
  locales: LocaleMetadata[];
  isPending: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolvePath(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const segments = path.split(".");
  let current: unknown = obj;

  for (const segment of segments) {
    if (current && typeof current === "object" && segment in current) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

export function I18nProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: SupportedLocale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setStoreLocale = useAppStore((state) => state.setLocale);

  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);
  const [isPending, startTransition] = useTransition();

  const setLocale = (newLocale: SupportedLocale) => {
    startTransition(() => {
      setLocaleState(newLocale);
      setStoreLocale(newLocale);

      // Persist to document cookie for Server Components
      if (typeof document !== "undefined") {
        document.cookie = `${NEXT_LOCALE_COOKIE}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = newLocale;
      }

      router.refresh();
    });
  };

  const dictionary = getDictionary(locale);

  const t = (path: string, fallbackOrParams?: string | Record<string, string | number>): string => {
    let resolved = resolvePath(dictionary, path);

    // Fallback to English dictionary if key is missing in active locale
    if (!resolved) {
      resolved = resolvePath(getDictionary(DEFAULT_LOCALE), path);
    }

    if (!resolved) {
      if (typeof fallbackOrParams === "string") {
        return fallbackOrParams;
      }
      return path;
    }

    if (fallbackOrParams && typeof fallbackOrParams === "object") {
      let templated = resolved;
      for (const [key, val] of Object.entries(fallbackOrParams)) {
        templated = templated.replace(new RegExp(`{${key}}`, "g"), String(val));
      }
      return templated;
    }

    return resolved;
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        dictionary,
        t,
        locales: SUPPORTED_LOCALES,
        isPending,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}

export const useI18n = useTranslation;
