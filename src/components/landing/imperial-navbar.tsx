"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Smartphone,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Mail,
  Trash2,
} from "lucide-react";

export function ImperialNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-border/50 bg-background/85 backdrop-blur-md"
          : "border-b border-border/30 bg-background/60 backdrop-blur-xs"
      }`}
    >
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo (x.ai Minimalist Style) */}
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background font-mono font-bold text-xs shadow-xs">
            IT
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Imperial Tech{" "}
            <span className="text-[10px] font-mono text-muted-foreground uppercase border border-border px-1 py-0.5 rounded">
              O.P.C.
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-0.5 md:flex">
          <Link
            href="#portfolio"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Our Apps
          </Link>
          <Link
            href="#standards"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Engineering
          </Link>
          <Link
            href="#about"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/data-deletion"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Data Deletion
          </Link>
          <Link
            href="#contact"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground px-2.5"
          >
            <a
              href={siteConfig.company.googlePlayStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <span>Play Store</span>
              <ExternalLink className="size-3 opacity-70" />
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-full bg-foreground px-3.5 text-xs font-medium text-background hover:bg-foreground/90 transition-all"
          >
            <Link href="#portfolio" className="flex items-center gap-1">
              <span>Explore Apps</span>
              <ChevronRight className="size-3" />
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="size-8 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl px-4 py-4 md:hidden">
          <nav className="space-y-1">
            <Link
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Smartphone className="size-3.5" />
              <span>Our Apps</span>
            </Link>
            <Link
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ShieldCheck className="size-3.5" />
              <span>Engineering Standards</span>
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Building2 className="size-3.5" />
              <span>About Us</span>
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ShieldCheck className="size-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              href="/data-deletion"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10"
            >
              <Trash2 className="size-3.5" />
              <span>User Data Deletion</span>
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Mail className="size-3.5" />
              <span>Developer Contact</span>
            </Link>
          </nav>

          <div className="mt-3 pt-3 border-t border-border">
            <Button asChild size="sm" className="w-full rounded-full bg-foreground text-background text-xs">
              <a
                href={siteConfig.company.googlePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                <span>Google Play Developer Profile</span>
                <ExternalLink className="size-3" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
