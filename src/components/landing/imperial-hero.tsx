"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Calculator,
  Crown,
  Gamepad2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Zap,
  Play,
  RotateCcw,
} from "lucide-react";

export function ImperialHero() {
  const [activeTab, setActiveTab] = React.useState<"calculator" | "chess" | "sudoku">("calculator");
  const [calcInput, setCalcInput] = React.useState("2,480 + 15%");
  const [calcResult, setCalcResult] = React.useState("2,852.00");

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Dynamic Aura Mesh Glows (Directly inspired by Fiberplane layout) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[650px] w-[1000px] -translate-x-1/2 overflow-hidden blur-[120px] opacity-60 dark:opacity-40"
      >
        <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 mix-blend-multiply filter" />
        <div className="absolute top-12 right-1/4 h-[320px] w-[320px] rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 mix-blend-multiply filter" />
        <div className="absolute -bottom-8 left-1/3 h-[300px] w-[450px] rounded-full bg-linear-to-r from-cyan-400 via-sky-500 to-indigo-500 mix-blend-multiply filter" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Floating Pill Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-md shadow-xs transition-all hover:border-primary/40">
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-primary">Google Play Verified Developer</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">Imperial Tech O.P.C. (India)</span>
          </div>
        </div>

        {/* Catchy Main Headline (Editorial & Modern) */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Crafting Intuitive Utilities &amp;{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Engaging Mobile Games
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-indigo-500/10 -z-1"
              />
            </span>
          </h1>

          {/* Subheadline from websiteinfo.md */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal">
            <strong className="text-foreground font-semibold">Imperial Tech O.P.C.</strong> is an
            independent software and game development studio dedicated to building high-performance,
            privacy-focused apps for millions of users worldwide.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90 shadow-md transition-all hover:scale-[1.02]"
            >
              <Link href="#portfolio" className="flex items-center gap-2">
                <span>Explore Our Apps</span>
                <ArrowDown className="size-4 animate-bounce" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-border bg-background/80 px-7 text-sm font-semibold backdrop-blur-sm hover:bg-accent transition-all"
            >
              <Link href="#contact">Contact Support</Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="h-12 rounded-full px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <a
                href={siteConfig.company.googlePlayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <span>Google Play Profile</span>
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span>100% Offline-Friendly</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-blue-500" />
              <span>Safe &amp; Privacy-First</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="size-4 text-amber-500" />
              <span>High Native 60 FPS Performance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-4 text-purple-500" />
              <span>Zero Intrusive Tracking</span>
            </div>
          </div>
        </div>

        {/* Floating Studio Window Preview (Hero Canvas with Tabs) */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* Subtle Ambient Behind Card Glow */}
          <div
            aria-hidden="true"
            className="absolute -inset-1 rounded-[32px] bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-20 blur-xl dark:opacity-30"
          />

          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-card/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-card/80">
            {/* Window Studio Header Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3 sm:px-6">
              {/* Traffic lights & Studio Title */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-rose-500/80" />
                  <span className="size-3 rounded-full bg-amber-500/80" />
                  <span className="size-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-3 text-xs font-medium text-muted-foreground hidden sm:inline-block">
                  Imperial Tech Studio Showcase
                </span>
              </div>

              {/* App Switcher Tabs */}
              <div className="flex items-center rounded-xl bg-background/80 p-1 border border-border/60 text-xs shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("calculator")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-medium transition-all ${
                    activeTab === "calculator"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calculator className="size-3.5" />
                  <span>Calculator World</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("chess")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-medium transition-all ${
                    activeTab === "chess"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Crown className="size-3.5" />
                  <span>Chess Pocket</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("sudoku")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-medium transition-all ${
                    activeTab === "sudoku"
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Gamepad2 className="size-3.5" />
                  <span>Sudoku Daily</span>
                </button>
              </div>
            </div>

            {/* Window Content Area */}
            <div className="p-6 sm:p-8">
              {/* TAB 1: Universal Calculator World */}
              {activeTab === "calculator" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3.5" />
                      <span>Available on Google Play • Rating 4.8★</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      Universal Calculator World
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Advanced multi-purpose calculation suite crafted for students, engineers, and
                      everyday professionals. Includes complete unit conversions, memory tape, and
                      offline formulas.
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">150+</span> Unit Converters
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">100%</span> Offline DB
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">0</span> Ad Trackers
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Kotlin</span> Native 60 FPS
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        asChild
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 shadow-sm"
                      >
                        <a
                          href="https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <span>Get on Google Play</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Calculator UI Mockup Preview */}
                  <div className="md:col-span-6">
                    <div className="mx-auto max-w-xs rounded-2xl border border-border/80 bg-background p-4 shadow-xl">
                      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>SCIENTIFIC TAPE</span>
                        <span className="text-emerald-500 font-mono">RAD | DEG</span>
                      </div>
                      {/* Screen */}
                      <div className="rounded-xl bg-muted/60 p-3 text-right">
                        <div className="text-xs text-muted-foreground font-mono">{calcInput}</div>
                        <div className="text-2xl font-bold tracking-tight text-foreground font-mono">
                          {calcResult}
                        </div>
                      </div>
                      {/* Grid */}
                      <div className="mt-3 grid grid-cols-4 gap-1.5 text-xs font-semibold">
                        {["AC", "sin", "cos", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+"].map(
                          (btn) => (
                            <button
                              key={btn}
                              type="button"
                              onClick={() => {
                                if (btn === "AC") {
                                  setCalcInput("0");
                                  setCalcResult("0");
                                } else {
                                  setCalcInput((prev) => (prev === "0" ? btn : prev + " " + btn));
                                }
                              }}
                              className="flex h-9 items-center justify-center rounded-lg bg-card border border-border/60 hover:bg-accent active:scale-95 transition-all"
                            >
                              {btn}
                            </button>
                          )
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setCalcInput("2,480 + 15%");
                            setCalcResult("2,852.00");
                          }}
                          className="col-span-2 flex h-9 items-center justify-center rounded-lg bg-card border border-border/60 hover:bg-accent"
                        >
                          0
                        </button>
                        <button
                          type="button"
                          className="flex h-9 items-center justify-center rounded-lg bg-card border border-border/60 hover:bg-accent"
                        >
                          .
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalcResult("3,490.50")}
                          className="flex h-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          =
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Chess Pocket */}
              {activeTab === "chess" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
                      <Sparkles className="size-3.5" />
                      <span>New Release / Coming Soon</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      Chess Pocket
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Compact, tactical puzzle trainer with an embedded Stockfish C++ engine. Designed
                      for distraction-free offline training, customizable Scandinavian boards, and
                      master-curated tactical puzzle arcs.
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">10,000+</span> Tactical Puzzles
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Stockfish</span> Offline AI
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Zero Ads</span> No Paywalls
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Flutter</span> 60 FPS Engine
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        asChild
                        className="rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs px-5 shadow-sm"
                      >
                        <Link href="#portfolio" className="flex items-center gap-1.5">
                          <span>View Release Details</span>
                          <ExternalLink className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Chess Board UI Mockup */}
                  <div className="md:col-span-6">
                    <div className="mx-auto max-w-xs rounded-2xl border border-border/80 bg-background p-4 shadow-xl">
                      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>TACTICAL PUZZLE #412</span>
                        <span className="text-purple-500 font-mono">White to Move &amp; Win</span>
                      </div>
                      {/* Stylized Chess Grid */}
                      <div className="grid grid-cols-6 gap-1 rounded-xl border border-border/60 bg-muted/30 p-2">
                        {[
                          "♜", "♞", "♝", "♛", "♚", "♜",
                          "♟", "♟", "♟", " ", "♟", "♟",
                          " ", " ", "♞", "♟", " ", " ",
                          " ", " ", " ", "♗", "♙", " ",
                          "♙", "♙", "♙", " ", " ", "♙",
                          "♖", "♘", " ", "♕", "♔", "♖",
                        ].map((piece, i) => {
                          const isDark = (Math.floor(i / 6) + (i % 6)) % 2 === 1;
                          return (
                            <div
                              key={i}
                              className={`flex size-10 sm:size-11 items-center justify-center rounded-md text-lg font-bold select-none ${
                                isDark
                                  ? "bg-indigo-900/10 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200"
                                  : "bg-background text-foreground"
                              } ${piece === "♗" ? "ring-2 ring-purple-500" : ""}`}
                            >
                              {piece}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          Hint: Bishop takes e5 sacrifice
                        </span>
                        <RotateCcw className="size-3.5 cursor-pointer hover:text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Sudoku Daily */}
              {activeTab === "sudoku" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
                  <div className="md:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <Zap className="size-3.5" />
                      <span>In Testing / Beta Available</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                      Sudoku - Daily Puzzle Game
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Classic numerical deduction reimagined with clean typography, automatic pencil
                      notes, conflict error highlighting, and mindful daily meditation logic streaks.
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">4</span> Difficulty Tiers
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Smart</span> Pencil Notes
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Offline</span> Daily Streak
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 p-2.5">
                        <span className="font-semibold text-foreground">Zero</span> Data Selling
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        asChild
                        className="rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs px-5 shadow-sm"
                      >
                        <Link href="#portfolio" className="flex items-center gap-1.5">
                          <span>Request Beta Access</span>
                          <ExternalLink className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Sudoku Board UI Mockup */}
                  <div className="md:col-span-6">
                    <div className="mx-auto max-w-xs rounded-2xl border border-border/80 bg-background p-4 shadow-xl">
                      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                        <span>DAILY CHALLENGE #18</span>
                        <span className="text-amber-500 font-mono">Medium • 04:12</span>
                      </div>
                      {/* Stylized Sudoku 6x6 grid */}
                      <div className="grid grid-cols-6 gap-1 rounded-xl border border-border/60 bg-muted/30 p-2">
                        {[
                          "5", "3", " ", " ", "7", " ",
                          "6", " ", " ", "1", "9", "5",
                          " ", "9", "8", " ", " ", " ",
                          "8", " ", " ", " ", "6", " ",
                          "4", " ", " ", "8", " ", "3",
                          "7", " ", " ", " ", "2", " ",
                        ].map((num, idx) => (
                          <div
                            key={idx}
                            className={`flex size-10 sm:size-11 items-center justify-center rounded-md font-mono text-sm font-bold ${
                              num.trim()
                                ? "bg-card text-foreground border border-border/40"
                                : "bg-amber-500/5 text-amber-600 dark:text-amber-400 border border-dashed border-amber-500/30"
                            }`}
                          >
                            {num.trim() || "?"}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          Auto-notes enabled
                        </span>
                        <span className="font-mono">Mistakes: 0/3</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
