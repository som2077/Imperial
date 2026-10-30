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
import { JsonLd } from "@/components/seo/json-ld";

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
      data-scroll-behavior="smooth"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function c(n){if(!n||!n.attributes)return;var r=[];for(var i=0;i<n.attributes.length;i++){var a=n.attributes[i].name;if(a.indexOf("bis_")===0||a.indexOf("__processed_")===0||a==="cz-shortcut-listen")r.push(a);}for(var j=0;j<r.length;j++)n.removeAttribute(r[j]);}function t(){var w=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_ELEMENT);c(document.documentElement);while(w.nextNode()){c(w.currentNode);}}try{t();var o=new MutationObserver(function(m){for(var i=0;i<m.length;i++){var item=m[i];if(item.type==="attributes"&&item.target){var a=item.attributeName;if(a&&(a.indexOf("bis_")===0||a.indexOf("__processed_")===0||a==="cz-shortcut-listen"))item.target.removeAttribute(a);}else if(item.type==="childList"){for(var j=0;j<item.addedNodes.length;j++){var node=item.addedNodes[j];if(node.nodeType===1){c(node);var cw=document.createTreeWalker(node,NodeFilter.SHOW_ELEMENT);while(cw.nextNode()){c(cw.currentNode);}}}}}});o.observe(document.documentElement,{attributes:true,subtree:true,childList:true});var sa=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(typeof n==="string"&&(n.indexOf("bis_")===0||n.indexOf("__processed_")===0||n==="cz-shortcut-listen"))return;return sa.apply(this,arguments);};}catch(e){}})();`,
          }}
        />
        <JsonLd />
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
