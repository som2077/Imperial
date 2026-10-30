"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/context";
import { type SupportedLocale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Check } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "card" | "icon";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, locales, t, isPending } = useTranslation();

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  if (variant === "card") {
    return (
      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 ${className}`}>
        {locales.map((item) => {
          const isSelected = item.code === locale;
          return (
            <Card
              key={item.code}
              role="button"
              tabIndex={0}
              onClick={() => setLocale(item.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setLocale(item.code);
                }
              }}
              className={`hover:border-primary/50 cursor-pointer transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 ring-primary shadow-xs ring-1"
                  : "border-border hover:bg-muted/30"
              }`}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={item.name}>
                    {item.flag}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.nativeName}</p>
                    <p className="text-muted-foreground text-xs">{item.name}</p>
                  </div>
                </div>
                {isSelected && <Check className="text-primary h-4 w-4" />}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 rounded-full ${className}`}
            title={`${t("common.language")}: ${currentLocale.nativeName}`}
            disabled={isPending}
          >
            <span className="text-base">{currentLocale.flag}</span>
            <span className="sr-only">{t("common.language")}</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 rounded-full px-3 text-xs font-medium ${className}`}
            disabled={isPending}
          >
            <Globe className="text-muted-foreground h-3.5 w-3.5" />
            <span className="text-sm">{currentLocale.flag}</span>
            <span className="hidden sm:inline">{currentLocale.nativeName}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-muted-foreground text-xs font-semibold">
          {t("common.language")} / Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((item) => {
          const isSelected = item.code === locale;
          return (
            <DropdownMenuItem
              key={item.code}
              onClick={() => setLocale(item.code as SupportedLocale)}
              className="flex cursor-pointer items-center justify-between py-2 text-xs font-medium"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{item.flag}</span>
                <span>{item.nativeName}</span>
                <span className="text-muted-foreground text-[10px]">
                  ({item.code.toUpperCase()})
                </span>
              </div>
              {isSelected && <Check className="text-primary h-3.5 w-3.5" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
