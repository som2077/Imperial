"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  ShieldCheck,
  Mail,
  ArrowRight,
  Check,
} from "lucide-react";

export function ImperialFooter() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-background border-t border-border/60 overflow-hidden">
      {/* Bottom CTA Card (x.ai Minimalist Style) */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-neutral-950 p-8 sm:p-12 lg:p-16 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-mono text-neutral-300">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Google Play Verified Developer Entity</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans">
              Experience privacy-first mobile apps today.
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              Explore our production-grade Android utilities or join early access playtests for our
              tactical logic games. Zero trackers, pure native performance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-full bg-white text-neutral-950 hover:bg-white/90 font-semibold px-6 text-xs shadow-md"
              >
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Explore on Google Play</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 text-xs font-medium"
              >
                <Link href="#contact">Contact Developer Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Footer Columns (x.ai Style) */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Column 1: Studio Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Products
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="#portfolio" className="hover:text-foreground transition-colors">
                  Universal Calculator
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-foreground transition-colors">
                  Chess Pocket
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-foreground transition-colors">
                  Sudoku - Daily
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1 text-primary"
                >
                  <span>Play Store Catalog</span>
                  <ExternalLink className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Engineering */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Engineering
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="#standards" className="hover:text-foreground transition-colors">
                  Studio Standards
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-foreground transition-colors">
                  Offline-First Architecture
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-foreground transition-colors">
                  Zero Telemetry Audit
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-foreground transition-colors">
                  Stockfish 17 Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Studio */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Studio
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  Corporate Identity (India)
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-foreground transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground transition-colors">
                  Support Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal (Mandated by Google Play) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/data-deletion"
                  className="hover:text-rose-500 font-semibold transition-colors text-rose-600 dark:text-rose-400"
                >
                  User Data Deletion
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Google Play Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Support Desk & SLA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Developer Support
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground font-mono">
              <li>
                <a
                  href={`mailto:${siteConfig.company.supportEmail}`}
                  className="hover:text-primary transition-colors block text-foreground font-semibold truncate"
                >
                  {siteConfig.company.supportEmail}
                </a>
              </li>
              <li className="text-[11px] text-muted-foreground">
                SLA: {siteConfig.company.responseTimeSLA}
              </li>
              <li className="text-[11px] text-muted-foreground">
                Hours: {siteConfig.company.supportHours}
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground text-primary font-medium">
                  Submit Ticket →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Newsletter & Updates */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Stay Informed
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Get notified of new game releases and utility updates.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                <Check className="size-3.5" /> Subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full rounded-lg border border-input bg-background px-2.5 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground"
                />
                <Button type="submit" size="sm" className="w-full rounded-lg text-xs h-7 font-medium">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Exact Entity Registration */}
        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <p>
            &copy; {new Date().getFullYear()} <strong>{siteConfig.company.legalName}</strong>. All
            rights reserved. Legally incorporated in India.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/data-deletion" className="hover:text-foreground transition-colors">
              Data Deletion
            </Link>
            <span>•</span>
            <a
              href={siteConfig.company.googlePlayStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Play Console Profile
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
