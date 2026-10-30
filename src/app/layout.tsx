import type { Metadata } from "next";
import { fontSans, fontMono } from "@/config/fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { CommandPalette } from "@/components/command-palette";
import { I18nProvider } from "@/lib/i18n/context";
import { getServerLocale } from "@/lib/i18n/server";
import { siteConfig } from "@/config/site";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.name} | Mobile Apps & Games Studio`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    siteConfig.name,
    "Imperial Tech",
    "Universal Calculator World",
    "Chess Pocket",
    "Sudoku Daily Puzzle Game",
    "Google Play Developer",
    "Mobile Game Studio",
    "Android Apps",
    "Privacy-first Apps",
    "Offline Games",
  ],
  authors: [{ name: siteConfig.creator.name }],
  creator: siteConfig.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: `${siteConfig.name} | Crafting Intuitive Utilities & Engaging Mobile Games`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Mobile App & Game Studio`,
    description: siteConfig.description,
    creator: siteConfig.creator.twitter,
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var o=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(typeof n==="string"&&(n==="bis_skin_checked"||n==="bis_register"||n.indexOf("__processed_")===0||n.indexOf("bis_")===0))return;return o.apply(this,arguments);};}catch(e){}`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground flex min-h-full flex-col"
      >
        <AnalyticsProvider>
          <I18nProvider initialLocale={locale}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
              <CommandPalette />
            </ThemeProvider>
          </I18nProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
