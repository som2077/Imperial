import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, CheckCircle2, History, Sparkles } from "lucide-react";

export const metadata = {
  title: "Changelog & Product Updates",
  description: "Stay up-to-date with our latest releases, features, improvements, and fixes.",
};

export default function ChangelogPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
            <Sparkles className="text-primary h-5 w-5" />
            <span>{siteConfig.shortName}</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="mb-3 gap-1">
            <History className="text-primary h-3 w-3" /> Product Roadmap
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">Changelog & Releases</h1>
          <p className="text-muted-foreground text-base">
            Detailed log of all major architectural improvements, new integrations, and security
            enhancements.
          </p>
        </div>

        {/* Timeline */}
        <div className="before:bg-border/60 relative space-y-8 before:absolute before:inset-0 before:left-3 before:w-0.5">
          {siteConfig.changelog.map((item, index) => (
            <div key={index} className="relative pl-8">
              {/* Timeline marker */}
              <div className="bg-primary border-background ring-primary/20 absolute top-5 left-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-4 ring-2" />

              <Card className="hover:border-primary/40 shadow-2xs transition-colors">
                <CardHeader className="pb-3">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-mono text-sm font-bold">
                        {item.version}
                      </span>
                      <Badge
                        variant={
                          item.badge === "major"
                            ? "default"
                            : item.badge === "feature"
                              ? "success"
                              : "secondary"
                        }
                        className="text-[10px] font-semibold uppercase"
                      >
                        {item.badge}
                      </Badge>
                    </div>
                    <span className="text-muted-foreground text-xs">{item.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2.5 pt-0 text-sm">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-foreground/90 text-xs leading-relaxed sm:text-sm">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
