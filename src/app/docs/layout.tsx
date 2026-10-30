import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
              <Sparkles className="text-primary h-5 w-5" />
              <span>{siteConfig.shortName} Docs</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground hidden text-xs sm:inline"
            >
              Blog
            </Link>
            <Link
              href="/changelog"
              className="text-muted-foreground hover:text-foreground hidden text-xs sm:inline"
            >
              Changelog
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="container mx-auto flex max-w-6xl flex-1 flex-col gap-8 px-4 py-10 sm:px-8 md:flex-row">
        <DocsSidebar />
        <main className="max-w-3xl min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
