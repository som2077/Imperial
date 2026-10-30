"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function StudioReleases() {
  const news = [
    {
      date: "OCT 28, 2026",
      title: "Universal Calculator World v2.4.1 Released on Google Play",
      href: "https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator",
      isExternal: true,
      tag: "Live",
    },
    {
      date: "OCT 24, 2026",
      title: "Chess Pocket Release Candidate with Stockfish C++ Engine",
      href: "#portfolio",
      isExternal: false,
      tag: "Soon",
    },
    {
      date: "OCT 18, 2026",
      title: "Sudoku - Daily Puzzle Game Closed Beta Testing Rollout",
      href: "#portfolio",
      isExternal: false,
      tag: "Beta",
    },
    {
      date: "OCT 12, 2026",
      title: "Imperial Tech O.P.C. Organization Verification Completed in India",
      href: "#about",
      isExternal: false,
      tag: "Company",
    },
  ];

  return (
    <section className="border-t border-[#1F1F1F] bg-black py-20 text-white md:py-28">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 flex flex-col justify-between pb-4 sm:flex-row sm:items-baseline">
          <div>
            <div className="mb-2 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
              Updates &amp; Releases
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Latest news
            </h2>
          </div>
          <Link
            href="/changelog"
            className="group mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#A1A1A1] transition-colors hover:text-white sm:mt-0"
          >
            <span>All updates</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* News Rows (Exact x.ai layout from design.md) */}
        <div className="border-t border-[#1F1F1F]">
          {news.map((item, idx) => {
            const Content = (
              <div className="group -mx-3 grid grid-cols-1 items-center gap-2 rounded-[6px] border-b border-[#1F1F1F] px-3 py-6 transition-colors hover:bg-[#141414] sm:-mx-4 sm:grid-cols-[160px_1fr_32px] sm:gap-4 sm:px-4">
                {/* Date (Mono, uppercase, #6B6B6B) */}
                <div className="font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                  {item.date}
                </div>

                {/* Title (20px, text-white) */}
                <div className="flex items-center gap-3 text-[17px] font-medium text-white transition-colors group-hover:text-white sm:text-[19px]">
                  <span>{item.title}</span>
                  <span className="py-0.2 hidden rounded-[3px] border border-[#2E2E2E] px-1.5 font-mono text-[10px] text-[#6B6B6B] uppercase sm:inline-block">
                    {item.tag}
                  </span>
                </div>

                {/* Arrow (Right, shift 4px on hover) */}
                <div className="text-right text-[#A1A1A1] transition-transform duration-150 group-hover:translate-x-1 group-hover:text-white">
                  {item.isExternal ? <ArrowUpRight className="ml-auto size-4" /> : "→"}
                </div>
              </div>
            );

            return item.isExternal ? (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Content}
              </a>
            ) : (
              <Link key={idx} href={item.href} className="block">
                {Content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
