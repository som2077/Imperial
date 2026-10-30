"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ImperialHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-black text-white">
      {/* Subtle monochrome ambient glow (design.md rule: radial-gradient ellipse at top) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] -z-10 opacity-70"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, #1a1a1a, #000000 80%)",
        }}
      />

      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Top Mono Label / Tag (design.md: 12px, UPPERCASE, 0.08em letter-spacing) */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] border border-[#1F1F1F] bg-[#0A0A0A] px-3 py-1 rounded-[4px] inline-block">
            Google Play Verified Organization • India
          </span>
        </div>

        {/* Hero H1: 96px / 44px, Weight 500, tight letter-spacing -0.04em, line-height 1.0 */}
        <h1 className="text-[44px] sm:text-[68px] lg:text-[92px] font-medium leading-[1.02] tracking-[-0.04em] text-white max-w-[1050px]">
          Crafting intuitive utilities &amp; engaging games.
        </h1>

        {/* Subtitle: 18px, text-muted (#A1A1A1), max-w 640px, line-height 1.6 */}
        <p className="mt-8 text-[16px] sm:text-[18px] leading-[1.6] text-[#A1A1A1] max-w-[640px]">
          <strong className="text-white font-medium">Imperial Tech O.P.C.</strong> is an independent
          mobile software and game development studio dedicated to building high-performance,
          privacy-focused apps for millions of users worldwide.
        </p>

        {/* 1–2 CTAs: Primary (white filled, 6px radius) & Secondary (text link with arrow) */}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center bg-white text-black px-5 py-3 rounded-[6px] font-medium text-[15px] transition-opacity hover:opacity-85"
          >
            Explore Our Apps
          </Link>

          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#A1A1A1] hover:text-white transition-colors"
          >
            <span>Contact Support</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>

          <a
            href={siteConfig.company.googlePlayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-[13px] font-mono text-[#6B6B6B] hover:text-[#A1A1A1] transition-colors"
          >
            <span>Google Play Profile</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Bottom Metadata Indicators (Mono, uppercase, text-subtle) */}
        <div className="mt-16 pt-8 border-t border-[#1F1F1F] grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]">
              Resilience
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">100% Offline</div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]">
              Telemetry
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">0 Ad Trackers</div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]">
              Performance
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">60 FPS Native</div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B]">
              Support SLA
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">&lt; 48h Human Response</div>
          </div>
        </div>
      </div>
    </section>
  );
}
