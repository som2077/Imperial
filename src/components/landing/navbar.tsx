"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Boxes, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "border-border/60 bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-200",
          isScrolled ? "bg-background/95 border-border/80 shadow-md" : ""
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <div className="bg-foreground text-background flex size-8 items-center justify-center rounded-lg text-sm font-black shadow-xs transition-transform group-hover:scale-105">
              <Boxes className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-mono text-base leading-none font-extrabold tracking-tight">
                SAAS<span className="text-primary font-bold">KIT</span>
              </span>
              <span className="text-muted-foreground mt-1 text-[10px] leading-none font-medium">
                by Imperial Tech
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links (Center) */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Templates
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Pricing
            </a>
            <Link
              href="/docs"
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              Docs
            </Link>
          </nav>

          {/* Clean Right Actions */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:inline-block">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-9 px-3 text-xs font-semibold"
              >
                Sign In
              </Button>
            </Link>

            <a href="#pricing">
              <Button
                size="sm"
                className="bg-foreground text-background hover:bg-foreground/90 h-9 gap-1.5 rounded-lg px-4 text-xs font-bold shadow-xs transition-all active:scale-[0.98]"
              >
                <span>Get Kit ($80)</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer rounded-lg p-2 transition-colors md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <>
          <div
            className="animate-in fade-in fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-xs duration-200 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="bg-background/95 border-border animate-in slide-in-from-top-2 fixed inset-x-0 top-16 z-50 border-b px-6 py-6 shadow-xl backdrop-blur-2xl duration-200 md:hidden">
            <div className="flex flex-col space-y-4">
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="text-foreground hover:text-primary py-1 text-base font-semibold transition-colors"
              >
                Templates
              </a>
              <a
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="text-foreground hover:text-primary py-1 text-base font-semibold transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="text-foreground hover:text-primary py-1 text-base font-semibold transition-colors"
              >
                Pricing
              </a>
              <Link
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className="text-foreground hover:text-primary py-1 text-base font-semibold transition-colors"
              >
                Documentation
              </Link>

              <div className="border-border/40 flex flex-col gap-2.5 border-t pt-4">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="h-10 w-full text-xs font-semibold">
                    Sign In
                  </Button>
                </Link>
                <a href="#pricing" onClick={() => setMobileOpen(false)}>
                  <Button className="bg-foreground text-background hover:bg-foreground/90 h-10 w-full text-xs font-bold">
                    Get Kit ($80)
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
