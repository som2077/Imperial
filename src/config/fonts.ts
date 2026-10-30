import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans, Outfit, Roboto } from "next/font/google";

/**
 * ==============================================================================
 * 🔤 AVAILABLE FONT PRESETS
 * ==============================================================================
 * All fonts are powered by Next.js font optimization:
 * - Automatically self-hosted during build (zero Google telemetry or CDN latency)
 * - Zero Cumulative Layout Shift (CLS = 0)
 * - WOFF2 compressed modern web format
 */

// Preset 1: Geist (Default - Modern, clean, Vercel/Linear style)
export const fontGeist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Preset 2: Inter (Classic, balanced, standard SaaS staple)
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Preset 3: Plus Jakarta Sans (Trendy, warm, high-converting startup look)
export const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Preset 4: Outfit (Futuristic, friendly, consumer-facing SaaS)
export const fontOutfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Preset 5: Roboto (Google Material standard, universal legibility)
export const fontRoboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Monospace Font (For code blocks, API keys, terminal outputs)
export const fontGeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * ==============================================================================
 * 🎯 ACTIVE FONT CONFIGURATION (CHANGE HERE IN 1 SECOND)
 * ==============================================================================
 * To switch the entire website's primary font, change `fontSans` below:
 * Options: fontGeist | fontInter | fontJakarta | fontOutfit | fontRoboto
 */
export const fontSans = fontGeist;

// Monospace font for code blocks & developer keys
export const fontMono = fontGeistMono;
