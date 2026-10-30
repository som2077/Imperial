"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Calculator Live Cycles (Tape items)
const CALCULATOR_CYCLES = [
  {
    input: "sin(45°) × √128 + 15%",
    result: "= 11.5000 — computed locally in 0.4ms on-device",
    secondaryInput: "120 km/h to miles per hour",
    secondaryResult: "= 74.5645 mph • 18 categories ready offline",
  },
  {
    input: "log10(1000) × π rad",
    result: "= 9.4248 — high precision floating-point engine",
    secondaryInput: "$450 USD to EUR (offline)",
    secondaryResult: "= €415.80 EUR • cached ECB reference rate",
  },
  {
    input: "1,024 GB to Terabytes",
    result: "= 1.0000 TB — binary data conversion suite",
    secondaryInput: "298.15 Kelvin to Celsius",
    secondaryResult: "= 25.00 °C • exact thermodynamic conversion",
  },
];

export function ImperialHero() {
  // Live Timer for Sudoku Card
  const [secondsElapsed, setSecondsElapsed] = React.useState(258); // starts around 04:18

  // Live Calculator Equation Cycle
  const [calcIndex, setCalcIndex] = React.useState(0);
  const [isFading, setIsFading] = React.useState(false);

  // Spotlight mouse tracking per card
  const [mousePositions, setMousePositions] = React.useState<
    Record<string, { x: number; y: number }>
  >({});

  const handleMouseMove = (cardId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions((prev) => ({
      ...prev,
      [cardId]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  // Sudoku live ticking clock
  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to mm:ss
  const formattedTime = React.useMemo(() => {
    const mins = Math.floor(secondsElapsed / 60);
    const secs = secondsElapsed % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [secondsElapsed]);

  // Calculator rotation cycle
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCalcIndex((prev) => (prev + 1) % CALCULATOR_CYCLES.length);
        setIsFading(false);
      }, 250);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const activeCalc = CALCULATOR_CYCLES[calcIndex];

  return (
    <section className="relative overflow-hidden bg-black pt-28 pb-20 text-white sm:pt-36 sm:pb-28">
      {/* Living Ambient Supercluster Glow (Pulsing background aura) */}
      <div
        aria-hidden="true"
        className="animate-hero-pulse pointer-events-none absolute inset-x-0 top-0 -z-10 h-[580px] opacity-75 transition-opacity"
        style={{
          background: "radial-gradient(ellipse 75% 50% at 50% -12%, #22222a 0%, #000000 80%)",
        }}
      />

      {/* Subtle Star Dust Particle Shimmer behind Hero text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-40"
      >
        <span className="animate-hero-star-1 absolute top-20 left-1/4 size-1 rounded-full bg-white shadow-[0_0_6px_#fff]" />
        <span className="animate-hero-star-2 absolute top-40 right-1/4 size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4]" />
        <span className="animate-hero-star-3 absolute top-64 left-1/3 size-1 rounded-full bg-purple-300 shadow-[0_0_6px_#c084fc]" />
        <span className="animate-hero-star-1 absolute top-32 right-1/3 size-0.5 rounded-full bg-white" />
      </div>

      <div className="container mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8">
        {/* Top Centered Pill Badge (Matches screenshot: [New] Meet Grok 4.7  Our new model ↗) */}
        <div className="flex justify-center">
          <Link
            href="#portfolio"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-neutral-800 bg-[#111114]/90 px-4 py-1.5 text-xs text-neutral-300 shadow-sm backdrop-blur transition-all duration-300 hover:border-neutral-700 hover:text-white"
          >
            <span className="relative flex items-center">
              <span className="rounded-full border border-[#f26522]/30 bg-[#f26522]/20 px-2 py-0.5 text-[11px] font-semibold text-[#f26522]">
                New
              </span>
            </span>
            <span className="font-medium text-neutral-200">Universal Calculator v2.4</span>
            <span className="text-neutral-400 transition-colors group-hover:text-white">
              Live on Google Play ↗
            </span>
          </Link>
        </div>

        {/* Hero H1: Frontier mobile apps for everything you do. (With underline on "do." exactly like screenshot's "see.") */}
        <h1 className="mx-auto mt-8 max-w-4xl text-center text-[40px] leading-[1.08] font-medium tracking-[-0.035em] text-white sm:text-[62px] lg:text-[76px]">
          Frontier mobile apps
          <br />
          for everything you{" "}
          <span className="relative inline-block">
            do.
            <span
              className="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-white sm:-bottom-1.5 sm:h-[3px]"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Subtitle: Centered, muted gray text matching screenshot cadence */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-400 sm:text-[17px]">
          Utilities, tactical chess, logic puzzles, and tools. Built native for Android with strict
          zero-telemetry offline storage.
        </p>

        {/* Centered CTA Buttons (Matches screenshot: Primary White Pill + Dark Pill) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#portfolio"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-[14px] font-medium text-black transition-all hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          >
            <span>Explore Our Apps</span>
            <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
              ›
            </span>
          </Link>

          <a
            href={siteConfig.company.googlePlayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-[#161619] px-6 py-2.5 text-[14px] font-medium text-neutral-300 transition-all hover:border-neutral-700 hover:bg-[#222226] hover:text-white"
          >
            <span>Google Play Profile</span>
          </a>
        </div>

        {/* Cards Grid: 2 rows of 3 cards (Exact layout & aesthetic from screenshot) */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-18 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Calculator (Animated Live Computation Cycles) */}
          <Link
            href="#portfolio"
            onMouseMove={handleMouseMove("calc")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#1e1e23] bg-[#0c0c0e] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/80 hover:bg-[#101014] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Interactive Spotlight follow */}
            {mousePositions["calc"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["calc"].x}px ${mousePositions["calc"].y}px, rgba(255,255,255,0.06), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Header inside card */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="font-mono tracking-wider text-neutral-400 uppercase">
                  DEG • RAD • 150+ CONVERTERS
                </span>
                <span className="flex items-center gap-1.5 rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  LIVE ENGINE
                </span>
              </div>

              {/* Chat-style animated computation bubbles */}
              <div
                className={`my-auto space-y-3 transition-opacity duration-300 ${
                  isFading ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
                }`}
              >
                <div className="flex justify-end">
                  <div className="flex max-w-[85%] items-center gap-1.5 rounded-2xl rounded-tr-sm border border-neutral-800/80 bg-[#1c1c20] px-3.5 py-2 text-xs text-neutral-200 shadow-sm">
                    <span>{activeCalc.input}</span>
                    <span className="animate-pulse font-mono text-neutral-500">|</span>
                  </div>
                </div>

                <div className="max-w-[90%] pl-1 text-xs leading-relaxed text-neutral-400">
                  {activeCalc.result}
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm border border-neutral-800/80 bg-[#1c1c20] px-3.5 py-2 text-xs text-neutral-200 shadow-sm">
                    {activeCalc.secondaryInput}
                  </div>
                </div>

                <div className="max-w-[90%] pl-1 text-xs leading-relaxed text-neutral-400">
                  {activeCalc.secondaryResult}
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#18181c] bg-[#08080a]/90 px-5 py-3.5 text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
              <span>Calculator</span>
              <span className="flex items-center gap-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-white">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 2: Build / Terminal (Animated live terminal build & diff) */}
          <Link
            href="#standards"
            onMouseMove={handleMouseMove("build")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#1e1e23] bg-[#0c0c0e] font-mono transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/80 hover:bg-[#101014] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Interactive Spotlight follow */}
            {mousePositions["build"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["build"].x}px ${mousePositions["build"].y}px, rgba(255,255,255,0.06), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5 text-xs">
              {/* Window header with macOS dots and pulsing progress */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#ef4444]" />
                  <span className="size-2 rounded-full bg-[#f59e0b]" />
                  <span className="size-2 rounded-full bg-[#10b981]" />
                  <span className="ml-1 text-neutral-400">projects/main</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                  <span className="relative flex h-1.5 w-7 overflow-hidden rounded-full bg-emerald-950">
                    <span className="h-full w-full rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Terminal command execution lines */}
              <div className="my-auto space-y-1 text-[11px] leading-tight">
                <div className="text-neutral-300">
                  <span className="text-emerald-400">▸</span> ./gradlew assembleRelease --offline
                </div>
                <div className="text-neutral-500">
                  <span className="text-neutral-600">|</span> Kotlin 2.1 &amp; Jetpack Compose{" "}
                  <span className="text-neutral-400">[ready]</span>
                </div>
                <div className="text-neutral-500">
                  <span className="text-neutral-600">|</span> ProGuard R8 code shrinking{" "}
                  <span className="text-neutral-400">[done]</span>
                </div>
                <div className="text-neutral-500">
                  <span className="text-neutral-600">|</span> Zero-telemetry APK audit{" "}
                  <span className="text-emerald-400">[passed]</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-400">
                  <span className="text-cyan-400">•</span> Thought for 1.4s
                  <span className="inline-block animate-pulse text-cyan-400">_</span>
                </div>
              </div>

              {/* Code snippet with diff styling */}
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/80 p-2.5 text-[10.5px] leading-snug">
                <div className="text-neutral-400">◆ Edit src/engine/CalculatorEngine.kt</div>
                <div className="text-neutral-400">
                  <span className="text-neutral-600 select-none">42 </span>
                  <span className="text-purple-400">val</span> result =
                  evaluateExpression(mathInput)
                </div>
                <div className="text-emerald-400">
                  <span className="text-neutral-600 select-none">43 </span>
                  cache.saveOfflineTape(result, encrypted ={" "}
                  <span className="text-amber-400">true</span>)
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#18181c] bg-[#08080a]/90 px-5 py-3.5 font-sans text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
              <span>Build</span>
              <span className="flex items-center gap-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-white">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 3: Bot / Tactical Assistant (Animated live radar pulse & moves) */}
          <Link
            href="#portfolio"
            onMouseMove={handleMouseMove("bot")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#1e1e23] bg-[#0c0c0e] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/80 hover:bg-[#101014] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Interactive Spotlight follow */}
            {mousePositions["bot"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["bot"].x}px ${mousePositions["bot"].y}px, rgba(255,255,255,0.06), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Flagged status header */}
              <div className="flex items-center gap-2 rounded-lg border border-neutral-800/80 bg-[#161619] px-3 py-1.5 text-xs text-neutral-300">
                <span className="text-emerald-400">✓</span>
                <span className="truncate">Chess Pocket → Tactical Mate in 2 (Rating 1850)</span>
              </div>

              {/* Puzzle context box */}
              <div className="rounded-xl border border-neutral-800/60 bg-[#121215] p-3 text-xs leading-relaxed text-neutral-400">
                Black king on f8 trapped behind doubled pawns. White to move — find the tactical
                queen deflection.
              </div>

              {/* Solution bubble */}
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm border border-neutral-800 bg-[#1f1f24] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                  1. Qh7+ Kf8 &nbsp; 2. Qh8#
                </div>
              </div>

              {/* Animated live engine pulse */}
              <div className="flex items-center gap-2 text-xs text-[#f26522]">
                <span className="relative flex size-2.5">
                  <span className="animate-hero-radar absolute inline-flex h-full w-full rounded-full bg-[#f26522]" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#f26522]" />
                </span>
                <span className="font-mono text-[11px] font-medium">Stockfish 16 WASM • 0ms</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#18181c] bg-[#08080a]/90 px-5 py-3.5 text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
              <span>Bot</span>
              <span className="flex items-center gap-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-white">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 4: Sudoku Daily (Real live ticking timer & interactive highlighted cells) */}
          <Link
            href="#portfolio"
            onMouseMove={handleMouseMove("sudoku")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#1e1e23] bg-[#0c0c0e] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/80 hover:bg-[#101014] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Interactive Spotlight follow */}
            {mousePositions["sudoku"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["sudoku"].x}px ${mousePositions["sudoku"].y}px, rgba(255,255,255,0.06), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Header with live ticking timer */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span className="font-mono tracking-wider text-neutral-300 uppercase">
                  DAILY SUDOKU #412
                </span>
                <span className="flex items-center gap-1.5 font-mono text-emerald-400">
                  <span className="size-1.5 animate-ping rounded-full bg-emerald-400" />
                  {formattedTime} • 0 MISTAKES
                </span>
              </div>

              {/* Stylized dark Sudoku board grid with interactive cells */}
              <div className="mx-auto my-auto grid w-full max-w-[240px] grid-cols-4 gap-1.5 rounded-xl border border-neutral-800/80 bg-neutral-950 p-2.5 text-center font-mono shadow-inner">
                <div className="flex h-9 items-center justify-center rounded border border-neutral-800 bg-[#141416] text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600">
                  5
                </div>
                <div className="flex h-9 items-center justify-center rounded border border-neutral-800 bg-[#141416] text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600">
                  3
                </div>
                {/* Active focused cell with breathing cyan aura */}
                <div className="relative flex h-9 animate-pulse items-center justify-center rounded border border-cyan-400 bg-cyan-950/40 text-sm font-semibold text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                  7
                </div>
                <div className="flex h-9 flex-col items-center justify-center rounded border border-dashed border-neutral-800 bg-[#101012] text-[9px] text-neutral-500">
                  <span>1 4</span>
                </div>

                <div className="flex h-9 items-center justify-center rounded border border-neutral-800 bg-[#141416] text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600">
                  6
                </div>
                <div className="flex h-9 flex-col items-center justify-center rounded border border-dashed border-neutral-800 bg-[#101012] text-[9px] text-neutral-500">
                  <span>2 8</span>
                </div>
                <div className="flex h-9 items-center justify-center rounded border border-neutral-800 bg-[#141416] text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600">
                  9
                </div>
                <div className="flex h-9 items-center justify-center rounded border border-neutral-800 bg-[#141416] text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600">
                  1
                </div>
              </div>

              {/* Keypad indicator */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span>AMOLED Dark Theme</span>
                <span className="font-mono text-neutral-400">60 FPS Native</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#18181c] bg-[#08080a]/90 px-5 py-3.5 text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
              <span>Sudoku Daily</span>
              <span className="flex items-center gap-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-white">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 5: Tactical Board / Chess Visual (Tactical combination with glowing Queen move) */}
          <Link
            href="#portfolio"
            onMouseMove={handleMouseMove("studio")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#1e1e23] bg-[#0c0c0e] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/80 hover:bg-[#101014] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Interactive Spotlight follow */}
            {mousePositions["studio"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["studio"].x}px ${mousePositions["studio"].y}px, rgba(255,255,255,0.06), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Header */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span className="font-mono text-neutral-300 uppercase">TACTICAL ANALYSIS</span>
                <span className="flex items-center gap-1 font-mono text-amber-400">
                  <span className="size-1.5 animate-ping rounded-full bg-amber-400" />
                  +M2 (WHITE)
                </span>
              </div>

              {/* Minimalist Scandinavian & Obsidian Chess Board Render with piece interaction */}
              <div className="mx-auto my-auto flex items-center justify-center">
                <div className="relative rounded-xl border border-neutral-800/80 bg-neutral-950 p-2 shadow-inner">
                  <div className="grid grid-cols-4 gap-0.5 text-center text-lg leading-none">
                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-500">
                      ♜
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-500">
                      ♞
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-500">
                      ♚
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-600">
                      .
                    </div>

                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-500">
                      ♟
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-500">
                      ♟
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-600">
                      .
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-500">
                      ♟
                    </div>

                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-600">
                      .
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-600">
                      .
                    </div>
                    {/* Glowing Tactical Queen piece */}
                    <div className="flex size-9 items-center justify-center border border-amber-500/80 bg-amber-500/25 text-white shadow-[0_0_16px_rgba(245,158,11,0.4)] transition-transform duration-300 group-hover:scale-110">
                      ♕
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-600">
                      .
                    </div>

                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-200">
                      ♖
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-600">
                      .
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#27272a] text-neutral-200">
                      ♔
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#18181b] text-neutral-200">
                      ♖
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span>10,000+ Curated Challenges</span>
                <span className="font-mono text-neutral-400">Offline ELO Sync</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#18181c] bg-[#08080a]/90 px-5 py-3.5 text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
              <span>Game Studio</span>
              <span className="flex items-center gap-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-white">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 6: Privacy Core / Cosmic Starry Sphere (Mesmerizing Cosmic Orb with continuous rotation & twinkling stars) */}
          <Link
            href="#standards"
            onMouseMove={handleMouseMove("privacy")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[20px] border border-[#1e1e23] bg-[#0c0c0e] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-600/80 hover:bg-[#101014] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Interactive Spotlight follow */}
            {mousePositions["privacy"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["privacy"].x}px ${mousePositions["privacy"].y}px, rgba(255,255,255,0.06), transparent 50%)`,
                }}
              />
            )}

            <div className="relative flex flex-1 flex-col items-center justify-between p-5">
              {/* Header */}
              <div className="flex w-full items-center justify-between text-[11px] text-neutral-400">
                <span className="font-mono text-neutral-300 uppercase">ZERO TELEMETRY</span>
                <span className="flex items-center gap-1 font-mono text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  AUDIT VERIFIED
                </span>
              </div>

              {/* Animated Cosmic Celestial Orb matching screenshot Card 6 */}
              <div className="relative my-auto flex size-36 items-center justify-center">
                {/* Outer radial ambient glow */}
                <div
                  className="animate-hero-pulse absolute inset-0 rounded-full opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(59,130,246,0.25) 50%, transparent 70%)",
                  }}
                />

                {/* The Celestial Orb Sphere with continuous rotation */}
                <div
                  className="relative size-32 overflow-hidden rounded-full border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-108"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #ffffff 0%, #a855f7 25%, #3b82f6 55%, #0f172a 85%, #000000 100%)",
                    boxShadow:
                      "inset -12px -12px 28px rgba(0,0,0,0.95), inset 6px 6px 14px rgba(255,255,255,0.4), 0 0 30px rgba(139,92,246,0.35)",
                  }}
                >
                  {/* Rotating celestial star layer inside orb */}
                  <div className="animate-hero-spin pointer-events-none absolute inset-0 opacity-90">
                    <span className="animate-hero-star-1 absolute top-4 left-7 size-1 rounded-full bg-white shadow-[0_0_4px_#fff]" />
                    <span className="animate-hero-star-2 absolute top-9 left-14 size-1.5 rounded-full bg-cyan-200 shadow-[0_0_5px_#06b6d4]" />
                    <span className="animate-hero-star-3 absolute top-16 left-8 size-0.5 rounded-full bg-white" />
                    <span className="animate-hero-star-1 absolute top-20 left-18 size-1 rounded-full bg-purple-200 shadow-[0_0_4px_#a855f7]" />
                    <span className="animate-hero-star-2 absolute top-7 left-20 size-0.5 rounded-full bg-white" />
                    <span className="animate-hero-star-3 absolute top-14 left-22 size-1 rounded-full bg-white shadow-[0_0_3px_#fff]" />
                    <span className="animate-hero-star-1 absolute top-22 left-11 size-1 rounded-full bg-cyan-300 shadow-[0_0_4px_#22d3ee]" />
                    <span className="animate-hero-star-2 absolute top-24 left-20 size-0.5 rounded-full bg-white" />
                  </div>

                  {/* Specular glare reflection highlight */}
                  <div className="absolute top-1.5 left-2.5 h-9 w-16 -rotate-45 rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[1px]" />
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="flex w-full items-center justify-between text-[11px] text-neutral-500">
                <span>0 Trackers • 100% Offline</span>
                <span className="font-mono text-neutral-400">AES-256</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#18181c] bg-[#08080a]/90 px-5 py-3.5 text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
              <span>Privacy Core</span>
              <span className="flex items-center gap-1 text-neutral-400 transition-transform duration-200 group-hover:translate-x-1.5 group-hover:text-white">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom Trust Indicators (Subtle hairline divider, preserves corporate verification info) */}
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
