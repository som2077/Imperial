"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Check } from "lucide-react";

export function AppsPortfolio() {
  return (
    <section id="portfolio" className="py-24 md:py-32 bg-black text-white border-t border-[#1F1F1F]">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-[640px] mb-20">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-3">
            Mobile Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Our Apps
          </h2>
          <p className="mt-4 text-base text-[#A1A1A1] leading-[1.6]">
            Every utility and game from Imperial Tech O.P.C. is engineered with native platform code,
            instant touch physics, and strict zero-telemetry offline storage.
          </p>
        </div>

        {/* Stacked Feature Blocks (x.ai style: no heavy decoration, clean hairline dividers) */}
        <div className="space-y-24">
          {/* Block 1: Universal Calculator World */}
          <div className="border-t border-[#1F1F1F] pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B]">
                01 / Utilities &amp; Scientific Tools
              </span>
              <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-[#A1A1A1] border border-[#2E2E2E] bg-[#0A0A0A] px-2 py-0.5 rounded-[4px]">
                Available on Google Play
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-white">
                Universal Calculator World
              </h3>

              <p className="text-[#A1A1A1] text-base leading-[1.6] max-w-[640px]">
                A precision multi-purpose calculation suite crafted with Kotlin and Jetpack Compose.
                Features 150+ unit conversions across 18 specialized categories, historical tape
                logging, and trigonometric tools with 100% on-device data retention.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#A1A1A1] pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> 150+ unit &amp; currency conversions
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> 100% offline formula recall
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> Zero background network requests
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> Sub-16ms touch frame rates
                </div>
              </div>

              <div className="pt-2 flex items-center gap-6">
                <a
                  href="https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-85 transition-opacity"
                >
                  <span>Get on Google Play</span>
                  <ArrowUpRight className="size-4" />
                </a>

                <Link
                  href="#contact"
                  className="text-xs font-mono text-[#6B6B6B] hover:text-[#A1A1A1] transition-colors"
                >
                  Developer Notes →
                </Link>
              </div>
            </div>
          </div>

          {/* Block 2: Chess Pocket */}
          <div className="border-t border-[#1F1F1F] pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B]">
                02 / Board &amp; Strategy
              </span>
              <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-[#A1A1A1] border border-[#2E2E2E] bg-[#0A0A0A] px-2 py-0.5 rounded-[4px]">
                New Release / Coming Soon
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-white">
                Chess Pocket
              </h3>

              <p className="text-[#A1A1A1] text-base leading-[1.6] max-w-[640px]">
                Compact tactical chess puzzle trainer engineered with an embedded Stockfish C++ WASM
                engine. Over 10,000 curated puzzle challenges, adaptive offline bot sparring, and
                uncluttered board aesthetics with zero interstitial video advertisements.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#A1A1A1] pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> 10,000+ master-curated tactical puzzles
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> Adaptive 800–2400 ELO offline AI bot
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> 100% offline gameplay progress
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> Zero telemetry tracking identifiers
                </div>
              </div>

              <div className="pt-2 flex items-center gap-6">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-85 transition-opacity"
                >
                  <span>Request Early Access</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#6B6B6B] hover:text-[#A1A1A1] transition-colors inline-flex items-center gap-1"
                >
                  <span>Play Store Developer Hub</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Block 3: Sudoku - Daily Puzzle Game */}
          <div className="border-t border-[#1F1F1F] pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B]">
                03 / Brain &amp; Logic
              </span>
              <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase text-[#A1A1A1] border border-[#2E2E2E] bg-[#0A0A0A] px-2 py-0.5 rounded-[4px]">
                In Testing / Closed Beta
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-white">
                Sudoku - Daily Puzzle Game
              </h3>

              <p className="text-[#A1A1A1] text-base leading-[1.6] max-w-[640px]">
                Classic numerical deduction puzzles crafted for mindful concentration. Includes 4
                balanced difficulty tiers (Easy to Master), automated pencil notes, duplicate error
                detection, and battery-efficient dark interface rendering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#A1A1A1] pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> 4 balanced algorithmic difficulty levels
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> Intelligent pencil notes &amp; conflict checks
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> Offline daily trophy streak calendar
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white">✔</span> 60 FPS Skia hardware-accelerated grid
                </div>
              </div>

              <div className="pt-2 flex items-center gap-6">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-white hover:opacity-85 transition-opacity"
                >
                  <span>Join Playtest Group</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                <Link
                  href="/privacy"
                  className="text-xs font-mono text-[#6B6B6B] hover:text-[#A1A1A1] transition-colors"
                >
                  Data Safety Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
