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
  ShieldCheck,
  Building2,
  Mail,
  ExternalLink,
  ChevronRight,
  Trash2,
} from "lucide-react";

export function ImperialNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-md shadow-xs"
          : "bg-background/40 backdrop-blur-xs border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform hover:opacity-90"
        >
          <div className="relative flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 via-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-500/20">
            <Smartphone className="size-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="absolute -bottom-0.5 -right-0.5 flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-foreground">
              Imperial Tech <span className="text-xs font-semibold uppercase text-primary">O.P.C.</span>
            </span>
            <span className="text-[10px] font-medium text-muted-foreground -mt-1 hidden sm:block">
              Mobile App &amp; Game Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="#portfolio"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Our Apps
          </Link>
          <Link
            href="#standards"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Studio Standards
          </Link>
          <Link
            href="#about"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            About Us
          </Link>
          <Link
            href="/privacy"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="#contact"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Contact
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-xs font-medium"
          >
            <a
              href={siteConfig.company.googlePlayStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <span>Google Play</span>
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          </Button>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium px-4 text-xs shadow-sm"
          >
            <Link href="#portfolio" className="flex items-center gap-1">
              <span>Explore Apps</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="size-9 rounded-lg"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-2 pb-6 md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <Link
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Smartphone className="size-4 text-primary" />
              <span>Our Apps</span>
            </Link>
            <Link
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <ShieldCheck className="size-4 text-primary" />
              <span>Studio Standards</span>
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Building2 className="size-4 text-primary" />
              <span>About Us</span>
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <ShieldCheck className="size-4 text-primary" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              href="/data-deletion"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Trash2 className="size-4 text-rose-500" />
              <span>User Data Deletion</span>
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <Mail className="size-4 text-primary" />
              <span>Contact Support</span>
            </Link>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Button asChild className="w-full rounded-full bg-foreground text-background">
              <a
                href={siteConfig.company.googlePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <span>Visit Google Play Profile</span>
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
