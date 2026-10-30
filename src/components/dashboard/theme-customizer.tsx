"use client";

import { useState } from "react";
import { COLOR_THEMES } from "@/config/themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Type, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const FONT_PRESETS = [
  {
    name: "Geist Sans",
    id: "fontGeist",
    style: "Modern, clean, Vercel/Linear style",
    tag: "Active",
  },
  { name: "Inter", id: "fontInter", style: "Classic, balanced SaaS staple", tag: "Alternative" },
  {
    name: "Plus Jakarta",
    id: "fontJakarta",
    style: "Warm, high-converting startup look",
    tag: "Alternative",
  },
  {
    name: "Outfit",
    id: "fontOutfit",
    style: "Futuristic, friendly consumer SaaS",
    tag: "Alternative",
  },
  { name: "Roboto", id: "fontRoboto", style: "Google Material standard", tag: "Alternative" },
];

export function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState<string>("zinc");

  const handleApplyTheme = (themeId: string) => {
    setActiveTheme(themeId);

    // Dynamically apply class to document element for live preview
    const root = document.documentElement;
    // Remove other theme classes
    Object.values(COLOR_THEMES).forEach((t) => {
      root.classList.remove(t.cssClass);
    });

    if (themeId !== "zinc") {
      const theme = COLOR_THEMES[themeId];
      if (theme) {
        root.classList.add(theme.cssClass);
      }
    }

    toast.success(`Theme preview set to ${COLOR_THEMES[themeId]?.name || themeId}!`);
  };

  const copyFontConfig = (fontId: string) => {
    const code = `// In src/config/fonts.ts:\nexport const fontSans = ${fontId};`;
    navigator.clipboard.writeText(code);
    toast.success("Font config snippet copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Color Palette Selector Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="text-primary h-5 w-5" />
            <CardTitle>Color Palette Presets</CardTitle>
          </div>
          <CardDescription>
            Choose from 6 production-tested brand palettes. Click any palette to preview it live
            across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(COLOR_THEMES).map((theme) => {
              const isSelected = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleApplyTheme(theme.id)}
                  type="button"
                  className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-primary/20 shadow-xs ring-2"
                      : "border-border hover:border-foreground/20 hover:bg-muted/50"
                  }`}
                >
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-xs"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {isSelected && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-semibold">{theme.name}</span>
                    </div>
                    <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                      {theme.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-muted-foreground flex items-center justify-between border-t pt-2 text-xs">
            <span>
              To make permanent, add class to{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono">&lt;html&gt;</code> in{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 font-mono">layout.tsx</code>
            </span>
            <Link
              href="/docs/fonts-and-theming"
              className="text-primary font-medium hover:underline"
            >
              View Documentation Guide →
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Typography Presets Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Type className="text-primary h-5 w-5" />
            <CardTitle>Typography System</CardTitle>
          </div>
          <CardDescription>
            Switch the entire SaaS font in 1 second via{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
              src/config/fonts.ts
            </code>
            . Zero Layout Shift (CLS = 0).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {FONT_PRESETS.map((font) => (
              <div
                key={font.id}
                className="border-border bg-card hover:bg-muted/30 flex items-center justify-between rounded-lg border p-3 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{font.name}</span>
                    <Badge
                      variant={font.tag === "Active" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {font.tag}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-xs">{font.style}</p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyFontConfig(font.id)}
                  className="gap-1.5 text-xs"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy Config
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
