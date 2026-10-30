"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  ExternalLink,
  ShieldCheck,
  Mail,
  Heart,
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
      {/* Bottom CTA Card inspired directly by the reference banner */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-700 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Internal ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-pink-500/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-emerald-300" />
              <span>Google Play Verified Studio</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Ready to experience privacy-first mobile apps?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              Download our live Android utilities or join early access playtests for our tactical
              games. Zero trackers, pure native performance.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-white text-neutral-950 hover:bg-white/90 font-bold px-7 text-xs shadow-lg"
              >
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Explore on Google Play</span>
                  <ExternalLink className="size-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 text-xs font-semibold backdrop-blur-xs"
              >
                <Link href="#contact">Contact Developer Desk</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Column Navigation Links & Corporate Info */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-xs">
                <Smartphone className="size-4" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-foreground">
                Imperial Tech <span className="text-xs font-semibold uppercase text-primary">O.P.C.</span>
              </span>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              An independent mobile application and game development studio legally incorporated in
              India, crafting intuitive, privacy-respecting software for global users.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold text-foreground">Stay Updated</span>
              <p className="text-[11px] text-muted-foreground mb-2">
                Get notified when new apps and puzzle packs release on Google Play.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <Check className="size-4" />
                  <span>Subscribed! Thank you for following our studio.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" size="sm" className="rounded-xl text-xs font-semibold px-4">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Our Apps */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Studio Apps
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="#portfolio"
                  className="hover:text-foreground transition-colors flex items-center justify-between"
                >
                  <span>Universal Calculator</span>
                  <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="hover:text-foreground transition-colors flex items-center justify-between"
                >
                  <span>Chess Pocket</span>
                  <span className="text-[10px] text-purple-500 font-mono">SOON</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#portfolio"
                  className="hover:text-foreground transition-colors flex items-center justify-between"
                >
                  <span>Sudoku - Daily</span>
                  <span className="text-[10px] text-amber-500 font-mono">BETA</span>
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1 pt-1 text-primary font-medium"
                >
                  <span>Google Play Catalog</span>
                  <ExternalLink className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio & Engineering */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Studio
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-foreground transition-colors">
                  Studio Standards
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-foreground transition-colors">
                  Zero-Tracker Guarantee
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground transition-colors">
                  Corporate Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Legal (Mandated by Google Play) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
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
                  className="hover:text-rose-500 font-medium transition-colors"
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
                  Developer Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Support Desk */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Support Desk
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.company.supportEmail}`}
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Mail className="size-3" />
                  <span>{siteConfig.company.supportEmail}</span>
                </a>
              </li>
              <li>
                <span className="text-[11px] text-muted-foreground block">
                  SLA: {siteConfig.company.responseTimeSLA}
                </span>
              </li>
              <li>
                <span className="text-[11px] text-muted-foreground block">
                  Hours: {siteConfig.company.supportHours}
                </span>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground text-primary font-medium">
                  Submit Support Ticket
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Entity Statement */}
        <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} <strong>{siteConfig.company.legalName}</strong>. All
            rights reserved. Legally incorporated in India.
          </p>
          <div className="flex items-center gap-4">
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
              Google Play Console
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
