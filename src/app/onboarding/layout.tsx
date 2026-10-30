import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Sparkles, LogOut } from "lucide-react";
import { logout } from "@/server/actions/auth";
import { siteConfig } from "@/config/site";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background selection:bg-primary selection:text-primary-foreground flex min-h-screen flex-col">
      {/* Distraction-Free Header */}
      <header className="bg-card/60 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-xl shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <span>{siteConfig.name}</span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <form action={logout}>
              <button
                type="submit"
                title="Sign out"
                className="border-border text-muted-foreground hover:text-foreground hover:bg-muted flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center py-6">{children}</main>

      {/* Minimal Footer */}
      <footer className="text-muted-foreground border-t py-4 text-center text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="hover:underline">
              Documentation
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
