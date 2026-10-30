"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export function StudioReleases() {
  const releases = [
    {
      category: "Release",
      date: "Oct 28, 2026",
      title: "Universal Calculator World v2.4.1 Live on Google Play",
      description:
        "Shipped 15 new scientific unit conversions, persistent memory tape history, and Material 3 dynamic color theming.",
      link: "https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator",
      isExternal: true,
    },
    {
      category: "Product",
      date: "Oct 24, 2026",
      title: "Chess Pocket Release Candidate Initialized",
      description:
        "Embedded Stockfish 17 C++ WASM neural evaluation, 10,000 curated tactical puzzle challenges, and offline streak records.",
      link: "#portfolio",
      isExternal: false,
    },
    {
      category: "Beta Testing",
      date: "Oct 18, 2026",
      title: "Sudoku - Daily Puzzle Game Beta Rollout",
      description:
        "Sub-16ms touch responsiveness, intelligent auto-pencil note placement, and conflict error detection across 4 difficulty tiers.",
      link: "#portfolio",
      isExternal: false,
    },
    {
      category: "Company",
      date: "Oct 12, 2026",
      title: "Imperial Tech O.P.C. Organization Verification Completed",
      description:
        "Achieved certified corporate developer account verification on Google Play Console for legally incorporated Indian entity.",
      link: "#about",
      isExternal: false,
    },
  ];

  return (
    <section className="py-20 bg-background border-t border-border/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Latest Studio News &amp; Releases
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Changelog and development progress across our mobile applications.
            </p>
          </div>
          <Link
            href="/changelog"
            className="text-xs font-semibold text-foreground hover:underline hidden sm:inline-flex items-center gap-1"
          >
            <span>All updates</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {releases.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/70 bg-card p-5 flex flex-col justify-between transition-all hover:border-foreground/30 hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-2.5">
                  <span className="font-semibold text-foreground">{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                {item.isExternal ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-foreground hover:underline inline-flex items-center gap-1"
                  >
                    <span>View on Play Store</span>
                    <ExternalLink className="size-3 opacity-70" />
                  </a>
                ) : (
                  <Link
                    href={item.link}
                    className="text-xs font-medium text-foreground hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read details</span>
                    <ArrowRight className="size-3 opacity-70" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
