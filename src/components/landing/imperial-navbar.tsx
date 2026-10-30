"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
      className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-200 ${
        scrolled
          ? "border-b border-[#1F1F1F] bg-black/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-12">
        {/* Minimalist Logo / Wordmark (x.ai style: pure white, clean) */}
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight text-white transition-opacity hover:opacity-85"
        >
          <span className="font-sans text-sm font-medium tracking-tight">Imperial Tech</span>
          <span className="py-0.2 rounded-[3px] border border-[#2E2E2E] px-1 font-mono text-[10px] text-[#6B6B6B] uppercase">
            O.P.C.
          </span>
        </Link>

        {/* Desktop Navigation Links (x.ai style: text-14px, muted white, hover white) */}
        <nav className="hidden items-center gap-7 text-[14px] md:flex">
          <Link href="#standards" className="text-[#A1A1A1] transition-colors hover:text-white">
            Engineering
          </Link>
          <Link href="#about" className="text-[#A1A1A1] transition-colors hover:text-white">
            About
          </Link>
          <Link href="/privacy" className="text-[#A1A1A1] transition-colors hover:text-white">
            Privacy
          </Link>
          <Link href="/data-deletion" className="text-[#A1A1A1] transition-colors hover:text-white">
            Data Deletion
          </Link>
          <Link href="#contact" className="text-[#A1A1A1] transition-colors hover:text-white">
            Contact
          </Link>
        </nav>

        {/* Header Actions (Button Primary: white bg, black text, 6px radius) */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href={siteConfig.company.googlePlayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[6px] bg-white px-4 py-2 text-[13px] font-medium text-black transition-opacity hover:opacity-85"
          >
            <span>Google Play</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white hover:text-[#A1A1A1]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Pure Black with Hairline Border) */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1F1F1F] bg-black px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <Link
              href="#standards"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#A1A1A1] hover:text-white"
            >
              Engineering
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#A1A1A1] hover:text-white"
            >
              About
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#A1A1A1] hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/data-deletion"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#A1A1A1] hover:text-white"
            >
              User Data Deletion
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#A1A1A1] hover:text-white"
            >
              Contact
            </Link>
            <div className="border-t border-[#1F1F1F] pt-2">
              <a
                href={siteConfig.company.googlePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-[6px] bg-white py-2.5 text-xs font-medium text-black"
              >
                <span>Google Play Profile</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
