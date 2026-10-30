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
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-colors duration-200 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-[#1F1F1F]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-full max-w-[1200px] items-center justify-between px-6 lg:px-12">
        {/* Minimalist Logo / Wordmark (x.ai style: pure white, clean) */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-medium tracking-tight hover:opacity-85 transition-opacity"
        >
          <span className="text-sm tracking-tight font-sans font-medium">Imperial Tech</span>
          <span className="font-mono text-[10px] uppercase text-[#6B6B6B] border border-[#2E2E2E] px-1 py-0.2 rounded-[3px]">
            O.P.C.
          </span>
        </Link>

        {/* Desktop Navigation Links (x.ai style: text-14px, muted white, hover white) */}
        <nav className="hidden items-center gap-7 md:flex text-[14px]">
          <Link
            href="#portfolio"
            className="text-[#A1A1A1] hover:text-white transition-colors"
          >
            Our Apps
          </Link>
          <Link
            href="#standards"
            className="text-[#A1A1A1] hover:text-white transition-colors"
          >
            Engineering
          </Link>
          <Link
            href="#about"
            className="text-[#A1A1A1] hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-[#A1A1A1] hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/data-deletion"
            className="text-[#A1A1A1] hover:text-white transition-colors"
          >
            Data Deletion
          </Link>
          <Link
            href="#contact"
            className="text-[#A1A1A1] hover:text-white transition-colors"
          >
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
            className="inline-flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-[6px] text-[13px] font-medium transition-opacity hover:opacity-85"
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
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#A1A1A1] hover:text-white"
            >
              Our Apps
            </Link>
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
            <div className="pt-2 border-t border-[#1F1F1F]">
              <a
                href={siteConfig.company.googlePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-white text-black py-2.5 rounded-[6px] text-xs font-medium"
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
