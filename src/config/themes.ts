export interface ThemePalette {
  id: string;
  name: string;
  description: string;
  primaryColor: string; // Hex for preview badges
  cssClass: string;
  light: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
  dark: {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
}

/**
 * ==============================================================================
 * 🎨 PRODUCTION-READY COLOR THEME PRESETS
 * ==============================================================================
 * Copy-paste any of these palettes into src/app/globals.css OR apply the
 * corresponding class (e.g. "theme-violet", "theme-emerald") on the <html> tag!
 */
export const COLOR_THEMES: Record<string, ThemePalette> = {
  zinc: {
    id: "zinc",
    name: "Neutral Zinc (Default)",
    description: "Minimalist, high-contrast monochrome aesthetic (Vercel & Linear style)",
    primaryColor: "#18181b",
    cssClass: "theme-zinc",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "240 5.9% 10%",
      primaryForeground: "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      secondaryForeground: "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "240 4.8% 95.9%",
      accentForeground: "240 5.9% 10%",
      border: "240 5.9% 90%",
      ring: "240 5.9% 10%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "0 0% 98%",
      primaryForeground: "240 5.9% 10%",
      secondary: "240 3.7% 15.9%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "240 3.7% 15.9%",
      accentForeground: "0 0% 98%",
      border: "240 3.7% 15.9%",
      ring: "240 4.9% 83.9%",
    },
  },

  violet: {
    id: "violet",
    name: "Modern Violet",
    description: "Vibrant indigo-purple hues popular with AI copilot and developer tools",
    primaryColor: "#7c3aed",
    cssClass: "theme-violet",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "262 83% 58%",
      primaryForeground: "210 20% 98%",
      secondary: "262 20% 95%",
      secondaryForeground: "262 83% 40%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "262 30% 94%",
      accentForeground: "262 83% 50%",
      border: "240 5.9% 90%",
      ring: "262 83% 58%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "263 70% 66%",
      primaryForeground: "240 10% 3.9%",
      secondary: "262 25% 18%",
      secondaryForeground: "210 20% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "262 30% 20%",
      accentForeground: "263 70% 66%",
      border: "240 3.7% 15.9%",
      ring: "263 70% 66%",
    },
  },

  emerald: {
    id: "emerald",
    name: "Emerald Green",
    description: "Crisp organic green tones ideal for FinTech, sustainability, and trust",
    primaryColor: "#10b981",
    cssClass: "theme-emerald",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "160 84% 39%",
      primaryForeground: "0 0% 98%",
      secondary: "160 20% 95%",
      secondaryForeground: "160 84% 25%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "160 25% 94%",
      accentForeground: "160 84% 30%",
      border: "240 5.9% 90%",
      ring: "160 84% 39%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "160 70% 50%",
      primaryForeground: "240 10% 3.9%",
      secondary: "160 25% 18%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "160 25% 20%",
      accentForeground: "160 70% 50%",
      border: "240 3.7% 15.9%",
      ring: "160 70% 50%",
    },
  },

  blue: {
    id: "blue",
    name: "Ocean Blue",
    description: "Classic corporate tech blue for dependable B2B and Enterprise platforms",
    primaryColor: "#2563eb",
    cssClass: "theme-blue",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "221 83% 53%",
      primaryForeground: "210 40% 98%",
      secondary: "220 20% 95%",
      secondaryForeground: "221 83% 35%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "220 25% 94%",
      accentForeground: "221 83% 45%",
      border: "240 5.9% 90%",
      ring: "221 83% 53%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "217 91% 60%",
      primaryForeground: "240 10% 3.9%",
      secondary: "220 25% 18%",
      secondaryForeground: "210 40% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "220 25% 20%",
      accentForeground: "217 91% 60%",
      border: "240 3.7% 15.9%",
      ring: "217 91% 60%",
    },
  },

  orange: {
    id: "orange",
    name: "Sunset Orange",
    description: "Warm, energetic, high-converting amber palette (ShipFast style)",
    primaryColor: "#f97316",
    cssClass: "theme-orange",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "24 95% 53%",
      primaryForeground: "0 0% 98%",
      secondary: "24 20% 95%",
      secondaryForeground: "24 95% 35%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "24 25% 94%",
      accentForeground: "24 95% 45%",
      border: "240 5.9% 90%",
      ring: "24 95% 53%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "24 95% 58%",
      primaryForeground: "240 10% 3.9%",
      secondary: "24 25% 18%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "24 25% 20%",
      accentForeground: "24 95% 58%",
      border: "240 3.7% 15.9%",
      ring: "24 95% 58%",
    },
  },

  rose: {
    id: "rose",
    name: "Cyber Rose",
    description: "Eye-catching vibrant ruby-rose for creative tools, community, and social SaaS",
    primaryColor: "#e11d48",
    cssClass: "theme-rose",
    light: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: "346 77% 49%",
      primaryForeground: "355 100% 97%",
      secondary: "346 20% 95%",
      secondaryForeground: "346 77% 35%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "346 25% 94%",
      accentForeground: "346 77% 45%",
      border: "240 5.9% 90%",
      ring: "346 77% 49%",
    },
    dark: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      primary: "346 77% 55%",
      primaryForeground: "240 10% 3.9%",
      secondary: "346 25% 18%",
      secondaryForeground: "355 100% 97%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "346 25% 20%",
      accentForeground: "346 77% 55%",
      border: "240 3.7% 15.9%",
      ring: "346 77% 55%",
    },
  },
};

/**
 * Default Active Theme
 */
export const defaultTheme = COLOR_THEMES.zinc;
