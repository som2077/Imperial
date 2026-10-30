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
      className={`${fontSans.variable} ${fontMono.variable} ${fontSans.className} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var BAD_PREFIXES=["bis_","fdprocessed","__processed_","data-gr","data-new-gr","data-gramm","data-dashlane","data-lastpass","data-lt-","data-color-mode","data-darkreader","data-feedly","data-avast","data-bitwarden"];var BAD_EXACT=["cz-shortcut-listen","data-gramm","data-gramm_editor","data-enable-grammarly","wt-ignore-input","data-lpignore","data-dashlane-rid","data-dashlane-classification","data-lastpass-root","data-lastpass-icon-root","data-lt-installed","data-lt-tmp-id","data-theme-loaded"];function isBad(n){if(typeof n!=="string")return false;for(var i=0;i<BAD_EXACT.length;i++){if(n===BAD_EXACT[i])return true;}for(var j=0;j<BAD_PREFIXES.length;j++){if(n.indexOf(BAD_PREFIXES[j])===0)return true;}return false;}function clean(el){if(!el||!el.attributes)return;var toRemove=[];for(var i=0;i<el.attributes.length;i++){var name=el.attributes[i].name;if(isBad(name))toRemove.push(name);}for(var j=0;j<toRemove.length;j++)el.removeAttribute(toRemove[j]);}function walkAndClean(root){if(!root)return;clean(root);if(root.nodeType===1){var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT);while(w.nextNode())clean(w.currentNode);}}try{var origSet=Element.prototype.setAttribute;Element.prototype.setAttribute=function(n,v){if(isBad(n))return;return origSet.apply(this,arguments);};var observer=new MutationObserver(function(mutations){for(var i=0;i<mutations.length;i++){var m=mutations[i];if(m.type==="attributes"&&m.target){if(isBad(m.attributeName))m.target.removeAttribute(m.attributeName);}else if(m.type==="childList"){for(var j=0;j<m.addedNodes.length;j++){var node=m.addedNodes[j];if(node&&node.nodeType===1)walkAndClean(node);}}}});observer.observe(document.documentElement,{attributes:true,subtree:true,childList:true});walkAndClean(document.documentElement);}catch(e){}})();`,
          }}
        />
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className={`${fontSans.className} bg-background text-foreground flex min-h-full flex-col font-sans`}
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
