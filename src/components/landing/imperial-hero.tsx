"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  Calculator,
  Crown,
  Gamepad2,
  Terminal,
  ShieldCheck,
  Zap,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export function ImperialHero() {
  // Interactive Calculator State
  const [calcTape, setCalcTape] = React.useState("128.50 × 1.18");
  const [calcResult, setCalcResult] = React.useState("151.63");
  const [activeUnit, setActiveUnit] = React.useState<"currency" | "length" | "mass">("currency");

  // Dynamic Headline Word Cycling (Inspired by x.ai's "everything you s e e .")
  const [wordIndex, setWordIndex] = React.useState(0);
  const words = ["b u i l d .", "s o l v e .", "p l a y .", "c r e a t e ."];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* x.ai-style Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 hover:bg-muted/70 px-3.5 py-1 text-xs text-muted-foreground transition-all duration-150"
          >
            <span className="rounded-full bg-foreground px-1.5 py-0.2 text-[10px] font-semibold text-background">
              New
            </span>
            <span className="text-foreground font-medium">Universal Calculator World v2.4.1</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Live on Google Play</span>
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Hero Editorial Headline */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-foreground font-sans">
            Crafting intuitive utilities &amp; engaging games for everything you{" "}
            <span className="inline-block min-w-[210px] sm:min-w-[320px] text-left font-mono font-normal text-muted-foreground transition-all duration-300">
              {words[wordIndex]}
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <strong className="text-foreground font-semibold">Imperial Tech O.P.C.</strong> is an
            independent mobile software and game development studio dedicated to building
            high-performance, privacy-focused apps for millions of users worldwide.
          </p>

          {/* Minimalist Dual CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-foreground px-6 text-xs font-semibold text-background hover:bg-foreground/90 transition-transform active:scale-95"
            >
              <Link href="#portfolio" className="flex items-center gap-1.5">
                <span>Explore Portfolio</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-border/80 bg-background px-6 text-xs font-semibold hover:bg-muted/50"
            >
              <Link href="#contact">Contact Support</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-11 rounded-full px-4 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <a
                href={siteConfig.company.googlePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <span>Google Play Profile</span>
                <ExternalLink className="size-3 opacity-70" />
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-mono">
            <span>✔ 100% Offline-Friendly</span>
            <span>•</span>
            <span>✔ Zero Data Telemetry</span>
            <span>•</span>
            <span>✔ Native 60 FPS</span>
            <span>•</span>
            <span>✔ Incorporated in India</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* x.ai SIGNATURE INTERACTIVE MODALITY BENTO GRID                */}
        {/* ============================================================== */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-4 max-w-6xl mx-auto">
          {/* Bento Tile 1: Universal Calculator World (Large 7 Columns) */}
          <div className="md:col-span-7 rounded-3xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-all hover:border-foreground/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400">
                    <Calculator className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Universal Calculator World</h3>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      v2.4.1 • Kotlin Jetpack Compose
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold">
                  Google Play Live
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Full-featured scientific computing, formula history tape, and instant unit
                conversion engine with 100% offline data isolation.
              </p>

              {/* Interactive Mini Tape Display */}
              <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 font-mono">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                  <span>HISTORY TAPE</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveUnit("currency")}
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        activeUnit === "currency" ? "bg-foreground text-background" : "hover:text-foreground"
                      }`}
                    >
                      USD/INR
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveUnit("length")}
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        activeUnit === "length" ? "bg-foreground text-background" : "hover:text-foreground"
                      }`}
                    >
                      m/ft
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveUnit("mass")}
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        activeUnit === "mass" ? "bg-foreground text-background" : "hover:text-foreground"
                      }`}
                    >
                      kg/lb
                    </button>
                  </div>
                </div>

                <div className="text-right text-xs text-muted-foreground">{calcTape}</div>
                <div className="text-right text-xl font-bold tracking-tight text-foreground">
                  = {calcResult}
                </div>

                {/* Quick Keypad buttons */}
                <div className="mt-3 grid grid-cols-4 gap-1 text-[11px] font-semibold">
                  {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "AC", "0", "=", "+"].map(
                    (btn) => (
                      <button
                        key={btn}
                        type="button"
                        onClick={() => {
                          if (btn === "AC") {
                            setCalcTape("0");
                            setCalcResult("0.00");
                          } else if (btn === "=") {
                            setCalcResult("1,894.20");
                          } else {
                            setCalcTape((prev) => (prev === "0" ? btn : `${prev} ${btn}`));
                          }
                        }}
                        className={`h-7 rounded-md border border-border/50 flex items-center justify-center transition-colors active:scale-95 ${
                          btn === "="
                            ? "bg-foreground text-background"
                            : "bg-background hover:bg-muted text-foreground"
                        }`}
                      >
                        {btn}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-[11px] text-muted-foreground font-mono">150+ Unit Converters</span>
              <a
                href="https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>Calculator Explore</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </div>

          {/* Bento Tile 2: Chess Pocket (5 Columns) */}
          <div className="md:col-span-5 rounded-3xl border border-border/80 bg-card p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-all hover:border-foreground/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-purple-600/10 text-purple-600 dark:text-purple-400">
                    <Crown className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Chess Pocket</h3>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Flutter • Stockfish Engine
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-2 py-0.5 text-[10px] font-semibold">
                  Coming Soon
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                Tactical puzzle progression with offline neural bot simulation and Nordic board
                styling.
              </p>

              {/* Minimalist 6x4 Mini Chess Grid */}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-2">
                  <span>PUZZLE #208</span>
                  <span className="text-purple-600 dark:text-purple-400">Stockfish 17 (Eval +2.4)</span>
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {[
                    "♜", " ", "♝", "♛", "♚", " ",
                    "♟", "♟", " ", "♟", "♟", "♟",
                    " ", " ", "♞", " ", " ", " ",
                    " ", " ", "♗", "♙", " ", " ",
                  ].map((p, i) => {
                    const isDark = (Math.floor(i / 6) + (i % 6)) % 2 === 1;
                    return (
                      <div
                        key={i}
                        className={`h-8 rounded flex items-center justify-center text-sm font-bold select-none ${
                          isDark ? "bg-muted text-foreground" : "bg-card text-foreground"
                        } ${p === "♗" ? "ring-1 ring-purple-500" : ""}`}
                      >
                        {p}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-[10px] font-mono text-muted-foreground text-center">
                  Tactics: Bishop sacrifice on d5
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-[11px] text-muted-foreground font-mono">10,000+ Puzzles</span>
              <Link
                href="#portfolio"
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>Chess Explore</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Bento Tile 3: Sudoku Daily (6 Columns) */}
          <div className="md:col-span-6 rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between shadow-xs transition-all hover:border-foreground/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-amber-600/10 text-amber-600 dark:text-amber-400">
                    <Gamepad2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Sudoku - Daily Puzzle</h3>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      React Native Skia
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold">
                  In Testing
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-3">
                Classic deductive brain training with intelligent auto-pencil notes and offline daily
                streaks.
              </p>

              {/* Sudoku Mini Grid */}
              <div className="grid grid-cols-6 gap-1 rounded-xl border border-border/50 bg-muted/30 p-2 font-mono text-xs">
                {["5", "3", " ", " ", "7", " ", "6", " ", " ", "1", "9", "5"].map((n, idx) => (
                  <div
                    key={idx}
                    className={`h-7 rounded flex items-center justify-center font-bold ${
                      n.trim() ? "bg-background text-foreground border border-border/30" : "bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    {n || "·"}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-[11px] text-muted-foreground font-mono">4 Difficulty Tiers</span>
              <Link
                href="#portfolio"
                className="text-xs font-semibold text-foreground hover:underline inline-flex items-center gap-1"
              >
                <span>Sudoku Explore</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Bento Tile 4: Studio Engine & Terminal Spec (6 Columns - x.ai Build Style) */}
          <div className="md:col-span-6 rounded-3xl border border-border/80 bg-neutral-950 p-6 text-white flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="size-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-white">studio-runtime.sh</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">STATUS: VERIFIED</span>
              </div>

              <div className="space-y-1 font-mono text-[11px] text-neutral-400 leading-relaxed overflow-x-auto">
                <p>
                  <span className="text-neutral-500">❯</span> ./gradlew bundleRelease --inspect
                </p>
                <p className="text-neutral-300">
                  ✔ APK Payload Size: <span className="text-emerald-400">6.2 MB</span> (Ultra-lean)
                </p>
                <p className="text-neutral-300">
                  ✔ Target Platform: <span className="text-emerald-400">Android 15 (API 35)</span>
                </p>
                <p className="text-neutral-300">
                  ✔ Background WakeLocks: <span className="text-emerald-400">0</span>
                </p>
                <p className="text-neutral-300">
                  ✔ Analytics / Ad Trackers: <span className="text-emerald-400">0</span>
                </p>
                <p className="text-neutral-300">
                  ✔ Play Console Org: <span className="text-indigo-400">Imperial Tech O.P.C.</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10 text-neutral-400">
              <span className="text-[11px] font-mono">Sub-16ms Frame Times</span>
              <Link
                href="#standards"
                className="text-xs font-semibold text-white hover:underline inline-flex items-center gap-1"
              >
                <span>Engine Standards</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
