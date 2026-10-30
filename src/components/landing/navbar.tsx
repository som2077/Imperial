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
          "fixed top-0 inset-x-0 z-50 transition-all duration-200 border-b border-border/60 bg-background/80 backdrop-blur-xl",
          isScrolled ? "shadow-md bg-background/95 border-border/80" : ""
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-background font-black text-sm shadow-xs transition-transform group-hover:scale-105">
              <Boxes className="size-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-foreground font-mono leading-none">
                SAAS<span className="text-primary font-bold">KIT</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium leading-none mt-1">
                by Imperial Tech
              </span>
            </div>
          </Link>

          {/* Clean Desktop Navigation Links (Center) */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Templates
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Pricing
            </a>
            <Link
              href="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
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
                className="text-xs font-semibold text-muted-foreground hover:text-foreground h-9 px-3"
              >
                Sign In
              </Button>
            </Link>

            <a href="#pricing">
              <Button
                size="sm"
                className="h-9 px-4 rounded-lg text-xs font-bold bg-foreground text-background hover:bg-foreground/90 shadow-xs transition-all active:scale-[0.98] gap-1.5"
              >
                <span>Get Kit ($80)</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
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
            className="fixed inset-0 top-16 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-16 inset-x-0 bg-background/95 backdrop-blur-2xl border-b border-border shadow-xl z-50 md:hidden px-6 py-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-foreground hover:text-primary transition-colors py-1"
              >
                Templates
              </a>
              <a
                href="#features"
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-foreground hover:text-primary transition-colors py-1"
              >
                Features
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-foreground hover:text-primary transition-colors py-1"
              >
                Pricing
              </a>
              <Link
                href="/docs"
                onClick={() => setMobileOpen(false)}
                className="text-base font-semibold text-foreground hover:text-primary transition-colors py-1"
              >
                Documentation
              </Link>

              <div className="pt-4 border-t border-border/40 flex flex-col gap-2.5">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full text-xs font-semibold h-10">
                    Sign In
                  </Button>
                </Link>
                <a href="#pricing" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full text-xs font-bold h-10 bg-foreground text-background hover:bg-foreground/90">
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
