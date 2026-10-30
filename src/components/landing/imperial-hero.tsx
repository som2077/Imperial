"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function ImperialHero() {
  return (
    <section className="relative overflow-hidden bg-black pt-32 pb-24 text-white md:pt-44 md:pb-36">
      {/* Subtle monochrome ambient glow (design.md rule: radial-gradient ellipse at top) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] opacity-70"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, #1a1a1a, #000000 80%)",
        }}
      />

      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Top Mono Label / Tag (design.md: 12px, UPPERCASE, 0.08em letter-spacing) */}
        <div className="mb-6">
          <span className="inline-block rounded-[4px] border border-[#1F1F1F] bg-[#0A0A0A] px-3 py-1 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Google Play Verified Organization • India
          </span>
        </div>

        {/* Hero H1: 96px / 44px, Weight 500, tight letter-spacing -0.04em, line-height 1.0 */}
        <h1 className="max-w-[1050px] text-[44px] leading-[1.02] font-medium tracking-[-0.04em] text-white sm:text-[68px] lg:text-[92px]">
          Crafting intuitive utilities &amp; engaging games.
        </h1>

        {/* Subtitle: 18px, text-muted (#A1A1A1), max-w 640px, line-height 1.6 */}
        <p className="mt-8 max-w-[640px] text-[16px] leading-[1.6] text-[#A1A1A1] sm:text-[18px]">
          <strong className="font-medium text-white">Imperial Tech O.P.C.</strong> is an independent
          mobile software and game development studio dedicated to building high-performance,
          privacy-focused apps for millions of users worldwide.
        </p>

        {/* 1–2 CTAs: Primary (white filled, 6px radius) & Secondary (text link with arrow) */}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="#portfolio"
            className="inline-flex items-center justify-center rounded-[6px] bg-white px-5 py-3 text-[15px] font-medium text-black transition-opacity hover:opacity-85"
          >
            Explore Our Apps
          </Link>

          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#A1A1A1] transition-colors hover:text-white"
          >
            <span>Contact Support</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>

          <a
            href={siteConfig.company.googlePlayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-mono text-[13px] text-[#6B6B6B] transition-colors hover:text-[#A1A1A1]"
          >
            <span>Google Play Profile</span>
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        {/* Bottom Metadata Indicators (Mono, uppercase, text-subtle) */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#1F1F1F] pt-8 sm:grid-cols-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Resilience
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">100% Offline</div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Telemetry
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">0 Ad Trackers</div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Performance
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">60 FPS Native</div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Support SLA
            </div>
            <div className="mt-1 text-[14px] font-medium text-white">&lt; 48h Human Response</div>
          </div>
        </div>
      </div>
    </section>
  );
}
