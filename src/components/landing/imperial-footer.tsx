"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, ChevronRight, Check } from "lucide-react";

export function ImperialFooter() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mt-24 w-full bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
      {/* Top Bar: Need help? -> Get Support */}
      <div className="border-b border-neutral-900">
        <div className="container mx-auto flex items-center justify-between px-6 py-6 sm:px-10">
          <span className="text-base font-medium text-neutral-200 sm:text-lg">Need help?</span>
          <Link
            href={`mailto:${siteConfig.company.supportEmail}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80 sm:text-base"
          >
            <span>Get Support</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Massive Backbone-style Typography Wordmark (Guaranteed No-Cutoff Scaling) */}
      <div className="w-full overflow-hidden border-b border-neutral-900 py-6 select-none sm:py-10">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-center text-[clamp(2.5rem,8.4vw,9.5rem)] leading-none font-black tracking-tighter whitespace-nowrap text-white uppercase">
            IMPERIAL TECH
          </h2>
        </div>
      </div>

      {/* Main Grid: Newsletter (Left) + Multi-column Links (Right) */}
      <div className="container mx-auto px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Stay Connected Newsletter */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-orange-500">◆</span>
              <h3 className="text-lg font-bold tracking-tight text-white">Stay connected</h3>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
              Unlock access to new utility drops, puzzle releases, and studio updates.
            </p>

            <form onSubmit={handleSubscribe} className="mt-2 flex max-w-sm items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-white transition-colors outline-none placeholder:text-neutral-500 focus:border-neutral-500"
                />
              </div>

              <button
                type="submit"
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md bg-white text-black transition-opacity hover:opacity-90 active:scale-95"
                title="Subscribe"
              >
                {subscribed ? (
                  <Check className="size-4 text-emerald-600" />
                ) : (
                  <ChevronRight className="size-5" />
                )}
              </button>
            </form>

            <p className="text-[11px] leading-normal text-neutral-500">
              Information collected will be used as described in our{" "}
              <Link href="/privacy" className="text-neutral-400 underline hover:text-white">
                privacy practices
              </Link>
              .
            </p>
          </div>

          {/* Right Columns: Links (Exact PokiGames 4-Column Structure) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {/* Column 1: Apps */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-wider text-white">Apps</h4>
              <ul className="flex flex-col gap-2 text-xs text-neutral-400">
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Calculator World
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Chess Pocket
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Sudoku - Daily
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    All Android Apps
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="transition-colors hover:text-white">
                    Beta Releases
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Categories */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-wider text-white">Categories</h4>
              <ul className="flex flex-col gap-2 text-xs text-neutral-400">
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Sudoku &amp; Puzzles
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Tactical Chess &amp; Board
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Scientific &amp; Utilities
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    Offline Logic
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    60 FPS Native Touch
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-wider text-white">Platform</h4>
              <ul className="flex flex-col gap-2 text-xs text-neutral-400">
                <li>
                  <a
                    href={siteConfig.company.googlePlayStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-emerald-400 transition-colors hover:underline"
                  >
                    Google Play Store
                  </a>
                </li>
                <li>
                  <span className="text-neutral-400">Verified Organization</span>
                </li>
                <li>
                  <span className="text-neutral-400">Android 15 (API 35)</span>
                </li>
                <li>
                  <span className="text-neutral-400">Zero Telemetry Audit</span>
                </li>
                <li>
                  <span className="text-neutral-500">sudokuking</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-wider text-white">Company</h4>
              <ul className="flex flex-col gap-2 text-xs text-neutral-400">
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/data-deletion" className="transition-colors hover:text-white">
                    User Data Deletion
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="transition-colors hover:text-white">
                    Updates
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="transition-colors hover:text-white">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Region & Language Pills + Social Media Icons */}
        <div className="mt-16 flex flex-col gap-6 border-t border-neutral-900 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Region Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
            >
              <span>India (INR)</span>
              <ChevronRight className="size-3 text-neutral-500" />
            </button>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-700 hover:text-white"
            >
              <span>English</span>
              <ChevronRight className="size-3 text-neutral-500" />
            </button>
          </div>

          {/* Right: Social Media Icons (Backbone Style) */}
          <div className="flex items-center gap-4 text-neutral-400">
            {/* Discord */}
            <a
              href={siteConfig.socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="transition-colors hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Reddit */}
            <a
              href="https://reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reddit"
              className="transition-colors hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.703zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href={siteConfig.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="transition-colors hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-white"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Links */}
        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-900/60 pt-6 text-[10px] leading-relaxed text-neutral-500 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-2xl">
            1. All mobile applications developed and published by Imperial Tech O.P.C. are
            distributed via official Google Play channels. 2. Legally incorporated entity in India
            under the Companies Act. Verified Google Play Organization Account. &copy;{" "}
            {new Date().getFullYear()} {siteConfig.company.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-neutral-400">
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy &amp; Cookies
            </Link>
            <Link href="/data-deletion" className="transition-colors hover:text-white">
              User Data Deletion
            </Link>
            <span className="inline-flex cursor-pointer items-center gap-1 transition-colors hover:text-white">
              Your Privacy Choices
              <span className="py-0.2 inline-block rounded-xs bg-blue-500 px-1 text-[9px] font-bold text-white">
                ✓&#215;
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
