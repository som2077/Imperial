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

  // Spotlight mouse tracking per card (Subtle x.ai border illumination)
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
    <section className="relative overflow-hidden bg-[#000000] pt-28 pb-20 text-[#FFFFFF] sm:pt-36 sm:pb-28">
      {/* x.ai exact ambient radial glow: ellipse at top #1a1a1a to #000000 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] opacity-70"
        style={{
          background: "radial-gradient(ellipse 75% 50% at 50% -12%, #1a1a1a 0%, #000000 80%)",
        }}
      />

      {/* Subtle starlight particle dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-35"
      >
        <span className="animate-hero-star-1 absolute top-20 left-1/4 size-1 rounded-full bg-white" />
        <span className="animate-hero-star-2 absolute top-40 right-1/4 size-1.5 rounded-full bg-neutral-300" />
        <span className="animate-hero-star-3 absolute top-64 left-1/3 size-1 rounded-full bg-neutral-400" />
        <span className="animate-hero-star-1 absolute top-32 right-1/3 size-0.5 rounded-full bg-white" />
      </div>

      <div className="container mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8">
        {/* Top Centered Pill Badge (Matches x.ai: [New] Meet Grok 4.7 Our new model ↗) */}
        <div className="flex justify-center">
          <a
            href={siteConfig.apps[0].playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-1.5 text-xs text-[#A1A1A1] transition-colors hover:border-[#2E2E2E] hover:text-[#FFFFFF]"
          >
            <span className="rounded-full border border-[#eb5a28]/35 bg-[#eb5a28]/15 px-2 py-0.5 text-[11px] font-semibold text-[#ff7243]">
              New
            </span>
            <span className="font-medium text-[#FFFFFF]">Universal Calculator v2.4</span>
            <span className="text-[#A1A1A1] transition-colors group-hover:text-[#FFFFFF]">
              Live on Google Play ↗
            </span>
          </a>
        </div>

        {/* Hero H1: Frontier mobile apps for everything you do. (With crisp underline on "do." like x.ai's "see.") */}
        <h1 className="mx-auto mt-8 max-w-4xl text-center text-[40px] leading-[1.06] font-medium tracking-[-0.04em] text-[#FFFFFF] sm:text-[62px] lg:text-[76px]">
          Frontier mobile apps
          <br />
          for everything you{" "}
          <span className="relative inline-block">
            do.
            <span
              className="absolute -bottom-1 left-0 h-[2.5px] w-full bg-[#FFFFFF] sm:-bottom-1.5 sm:h-[3px]"
              aria-hidden="true"
            />
          </span>
        </h1>

        {/* Subtitle: Centered, muted gray text (#A1A1A1) matching x.ai typography */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-relaxed text-[#A1A1A1] sm:text-[17px]">
          Utilities, tactical chess, logic puzzles, and tools. Built native for Android with strict
          zero-telemetry offline storage.
        </p>

        {/* Centered CTA Buttons (x.ai Buttons: Primary White, Secondary Transparent with #2E2E2E border) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={siteConfig.company.googlePlayStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-[6px] bg-[#FFFFFF] px-6 py-2.5 text-[15px] font-medium text-[#000000] transition-opacity hover:opacity-85"
          >
            <span>Google Play Profile</span>
            <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
              ›
            </span>
          </a>

          <Link
            href="#standards"
            className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#2E2E2E] bg-transparent px-6 py-2.5 text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#141414]"
          >
            <span>Engineering Standards</span>
          </Link>
        </div>

        {/* Cards Grid: 2 rows of 3 cards (Exact x.ai color tokens: bg-[#0A0A0A], border-[#1F1F1F], hover:bg-[#141414]) */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-18 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Calculator (Simulated Chat / Q&A conversation in x.ai monochrome palette) */}
          <a
            href={siteConfig.apps[0].playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove("calc")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] transition-colors duration-200 hover:border-[#2E2E2E] hover:bg-[#141414]"
          >
            {/* Subtle mouse spotlight follow */}
            {mousePositions["calc"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["calc"].x}px ${mousePositions["calc"].y}px, rgba(255,255,255,0.05), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Header inside card */}
              <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
                <span className="font-mono tracking-[0.08em] uppercase">
                  DEG • RAD • 150+ CONVERTERS
                </span>
                <span className="flex items-center gap-1.5 rounded-[4px] border border-[#1F1F1F] bg-[#000000] px-1.5 py-0.5 font-mono text-[10px] text-[#A1A1A1]">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#10b981]" />
                  KOTLIN
                </span>
              </div>

              {/* Chat-style animated computation bubbles */}
              <div
                className={`my-auto space-y-3 transition-opacity duration-300 ${
                  isFading ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
                }`}
              >
                <div className="flex justify-end">
                  <div className="flex max-w-[85%] items-center gap-1.5 rounded-[6px] border border-[#2E2E2E] bg-[#141414] px-3.5 py-2 text-xs text-[#FFFFFF]">
                    <span>{activeCalc.input}</span>
                    <span className="animate-pulse font-mono text-[#6B6B6B]">|</span>
                  </div>
                </div>

                <div className="max-w-[90%] pl-1 text-xs leading-relaxed text-[#A1A1A1]">
                  {activeCalc.result}
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-[6px] border border-[#2E2E2E] bg-[#141414] px-3.5 py-2 text-xs text-[#FFFFFF]">
                    {activeCalc.secondaryInput}
                  </div>
                </div>

                <div className="max-w-[90%] pl-1 text-xs leading-relaxed text-[#A1A1A1]">
                  {activeCalc.secondaryResult}
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] bg-[#0A0A0A] px-5 py-3.5 text-xs font-medium text-[#FFFFFF] transition-colors group-hover:text-[#FFFFFF]">
              <span>Calculator</span>
              <span className="flex items-center gap-1 text-[#A1A1A1] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FFFFFF]">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </a>

          {/* Card 2: Build / Terminal (Terminal & code editor in x.ai monochrome palette) */}
          <Link
            href="#standards"
            onMouseMove={handleMouseMove("build")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] font-mono transition-colors duration-200 hover:border-[#2E2E2E] hover:bg-[#141414]"
          >
            {/* Subtle mouse spotlight follow */}
            {mousePositions["build"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["build"].x}px ${mousePositions["build"].y}px, rgba(255,255,255,0.05), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5 text-xs">
              {/* Window header with macOS dots and progress bar */}
              <div className="flex items-center justify-between text-[11px] text-[#A1A1A1]">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#ef4444]" />
                  <span className="size-2 rounded-full bg-[#eab308]" />
                  <span className="size-2 rounded-full bg-[#22c55e]" />
                  <span className="ml-1 text-[#A1A1A1]">projects/main</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#A1A1A1]">
                  <span className="relative flex h-1.5 w-7 overflow-hidden rounded-full bg-[#1F1F1F]">
                    <span className="h-full w-full rounded-full bg-[#FFFFFF]" />
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Terminal command execution lines */}
              <div className="my-auto space-y-1 text-[11px] leading-tight">
                <div className="text-[#FFFFFF]">
                  <span className="text-[#A1A1A1]">▸</span> ./gradlew assembleRelease --offline
                </div>
                <div className="text-[#A1A1A1]">
                  <span className="text-[#6B6B6B]">|</span> Kotlin 2.1 &amp; Jetpack Compose{" "}
                  <span className="text-[#6B6B6B]">[ready]</span>
                </div>
                <div className="text-[#A1A1A1]">
                  <span className="text-[#6B6B6B]">|</span> ProGuard R8 code shrinking{" "}
                  <span className="text-[#6B6B6B]">[done]</span>
                </div>
                <div className="text-[#A1A1A1]">
                  <span className="text-[#6B6B6B]">|</span> Zero-telemetry APK audit{" "}
                  <span className="text-[#22c55e]">[passed]</span>
                </div>
                <div className="flex items-center gap-1 text-[#A1A1A1]">
                  <span className="text-[#6B6B6B]">•</span> Thought for 1.4s
                  <span className="inline-block animate-pulse text-[#FFFFFF]">_</span>
                </div>
              </div>

              {/* Code snippet with diff styling */}
              <div className="rounded-[4px] border border-[#1F1F1F] bg-[#000000] p-2.5 text-[10.5px] leading-snug">
                <div className="text-[#6B6B6B]">◆ Edit src/engine/CalculatorEngine.kt</div>
                <div className="text-[#A1A1A1]">
                  <span className="text-[#6B6B6B] select-none">42 </span>
                  <span className="text-[#FFFFFF]">val</span> result = evaluateExpression(mathInput)
                </div>
                <div className="text-[#22c55e]">
                  <span className="text-[#6B6B6B] select-none">43 </span>
                  cache.saveOfflineTape(result, encrypted ={" "}
                  <span className="text-[#FFFFFF]">true</span>)
                </div>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] bg-[#0A0A0A] px-5 py-3.5 font-sans text-xs font-medium text-[#FFFFFF] transition-colors group-hover:text-[#FFFFFF]">
              <span>Build</span>
              <span className="flex items-center gap-1 text-[#A1A1A1] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FFFFFF]">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 3: Bot / Tactical Assistant (x.ai monochrome alert & reasoning card) */}
          <Link
            href="/changelog"
            onMouseMove={handleMouseMove("bot")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] transition-colors duration-200 hover:border-[#2E2E2E] hover:bg-[#141414]"
          >
            {/* Subtle mouse spotlight follow */}
            {mousePositions["bot"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["bot"].x}px ${mousePositions["bot"].y}px, rgba(255,255,255,0.05), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Flagged status header matching screenshot */}
              <div className="flex items-center gap-2 rounded-[6px] border border-[#1F1F1F] bg-[#141414] px-3 py-1.5 text-xs text-[#FFFFFF]">
                <span className="text-[#A1A1A1]">✓</span>
                <span className="truncate">Chess Pocket → Tactical Mate in 2 (Rating 1850)</span>
              </div>

              {/* Puzzle context box */}
              <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0E0E0E] p-3 text-xs leading-relaxed text-[#A1A1A1]">
                Black king on f8 trapped behind doubled pawns. White to move — find the tactical
                queen deflection.
              </div>

              {/* Solution bubble */}
              <div className="flex justify-end">
                <div className="rounded-[6px] border border-[#2E2E2E] bg-[#181818] px-3.5 py-1.5 text-xs font-medium text-[#FFFFFF]">
                  1. Qh7+ Kf8 &nbsp; 2. Qh8#
                </div>
              </div>

              {/* Glowing engine status indicator matching x.ai orange "Exploring" */}
              <div className="flex items-center gap-2 text-xs text-[#ff7243]">
                <span className="relative flex size-2.5">
                  <span className="animate-hero-radar absolute inline-flex h-full w-full rounded-full bg-[#ff7243]" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[#ff7243]" />
                </span>
                <span className="font-mono text-[11px] font-medium">Stockfish 16 WASM • 0ms</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] bg-[#0A0A0A] px-5 py-3.5 text-xs font-medium text-[#FFFFFF] transition-colors group-hover:text-[#FFFFFF]">
              <span>Bot</span>
              <span className="flex items-center gap-1 text-[#A1A1A1] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FFFFFF]">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 4: Sudoku Daily (Strict Monochrome AMOLED palette) */}
          <Link
            href="/changelog"
            onMouseMove={handleMouseMove("sudoku")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] transition-colors duration-200 hover:border-[#2E2E2E] hover:bg-[#141414]"
          >
            {/* Subtle mouse spotlight follow */}
            {mousePositions["sudoku"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["sudoku"].x}px ${mousePositions["sudoku"].y}px, rgba(255,255,255,0.05), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Header with live ticking timer */}
              <div className="flex items-center justify-between text-[11px] text-[#A1A1A1]">
                <span className="font-mono tracking-[0.08em] text-[#6B6B6B] uppercase">
                  DAILY SUDOKU #412
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[#FFFFFF]">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#FFFFFF]" />
                  {formattedTime} • 0 MISTAKES
                </span>
              </div>

              {/* Strict Monochrome AMOLED Sudoku Grid */}
              <div className="mx-auto my-auto grid w-full max-w-[240px] grid-cols-4 gap-1.5 rounded-[6px] border border-[#1F1F1F] bg-[#000000] p-2.5 text-center font-mono">
                <div className="flex h-9 items-center justify-center rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] text-sm font-medium text-[#FFFFFF] transition-colors hover:border-[#2E2E2E]">
                  5
                </div>
                <div className="flex h-9 items-center justify-center rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] text-sm font-medium text-[#FFFFFF] transition-colors hover:border-[#2E2E2E]">
                  3
                </div>
                {/* Active focused cell with high-contrast white border */}
                <div className="relative flex h-9 animate-pulse items-center justify-center rounded-[4px] border border-[#FFFFFF] bg-[#1E1E1E] text-sm font-semibold text-[#FFFFFF]">
                  7
                </div>
                <div className="flex h-9 flex-col items-center justify-center rounded-[4px] border border-dashed border-[#1F1F1F] bg-[#080808] text-[9px] text-[#6B6B6B]">
                  <span>1 4</span>
                </div>

                <div className="flex h-9 items-center justify-center rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] text-sm font-medium text-[#FFFFFF] transition-colors hover:border-[#2E2E2E]">
                  6
                </div>
                <div className="flex h-9 flex-col items-center justify-center rounded-[4px] border border-dashed border-[#1F1F1F] bg-[#080808] text-[9px] text-[#6B6B6B]">
                  <span>2 8</span>
                </div>
                <div className="flex h-9 items-center justify-center rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] text-sm font-medium text-[#FFFFFF] transition-colors hover:border-[#2E2E2E]">
                  9
                </div>
                <div className="flex h-9 items-center justify-center rounded-[4px] border border-[#1F1F1F] bg-[#0E0E0E] text-sm font-medium text-[#FFFFFF] transition-colors hover:border-[#2E2E2E]">
                  1
                </div>
              </div>

              {/* Keypad indicator */}
              <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
                <span>AMOLED Monochrome</span>
                <span className="font-mono text-[#A1A1A1]">60 FPS Native</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] bg-[#0A0A0A] px-5 py-3.5 text-xs font-medium text-[#FFFFFF] transition-colors group-hover:text-[#FFFFFF]">
              <span>Sudoku Daily</span>
              <span className="flex items-center gap-1 text-[#A1A1A1] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FFFFFF]">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 5: Tactical Board / Chess Visual (Monochrome Obsidian board in x.ai palette) */}
          <Link
            href="/changelog"
            onMouseMove={handleMouseMove("studio")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] transition-colors duration-200 hover:border-[#2E2E2E] hover:bg-[#141414]"
          >
            {/* Subtle mouse spotlight follow */}
            {mousePositions["studio"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["studio"].x}px ${mousePositions["studio"].y}px, rgba(255,255,255,0.05), transparent 50%)`,
                }}
              />
            )}

            <div className="flex flex-1 flex-col justify-between p-5">
              {/* Header */}
              <div className="flex items-center justify-between text-[11px] text-[#A1A1A1]">
                <span className="font-mono tracking-[0.08em] text-[#6B6B6B] uppercase">
                  TACTICAL ANALYSIS
                </span>
                <span className="flex items-center gap-1 font-mono text-[#FFFFFF]">
                  <span className="size-1.5 rounded-full bg-[#FFFFFF]" />
                  +M2 (WHITE)
                </span>
              </div>

              {/* Minimalist Obsidian Chess Board Render */}
              <div className="mx-auto my-auto flex items-center justify-center">
                <div className="relative rounded-[6px] border border-[#1F1F1F] bg-[#000000] p-2">
                  <div className="grid grid-cols-4 gap-0.5 text-center text-lg leading-none">
                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#6B6B6B]">
                      ♜
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#6B6B6B]">
                      ♞
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#6B6B6B]">
                      ♚
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#333333]">
                      .
                    </div>

                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#6B6B6B]">
                      ♟
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#6B6B6B]">
                      ♟
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#333333]">
                      .
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#6B6B6B]">
                      ♟
                    </div>

                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#333333]">
                      .
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#333333]">
                      .
                    </div>
                    {/* High contrast Queen tactical square */}
                    <div className="flex size-9 items-center justify-center border border-[#FFFFFF] bg-[#222222] text-[#FFFFFF] transition-transform duration-300 group-hover:scale-105">
                      ♕
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#333333]">
                      .
                    </div>

                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#FFFFFF]">
                      ♖
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#333333]">
                      .
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#1C1C1C] text-[#FFFFFF]">
                      ♔
                    </div>
                    <div className="flex size-9 items-center justify-center bg-[#121212] text-[#FFFFFF]">
                      ♖
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between text-[11px] text-[#6B6B6B]">
                <span>10,000+ Curated Challenges</span>
                <span className="font-mono text-[#A1A1A1]">Offline ELO Sync</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] bg-[#0A0A0A] px-5 py-3.5 text-xs font-medium text-[#FFFFFF] transition-colors group-hover:text-[#FFFFFF]">
              <span>Game Studio</span>
              <span className="flex items-center gap-1 text-[#A1A1A1] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FFFFFF]">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>

          {/* Card 6: Privacy Core / Cosmic Starry Sphere (Dark crystal cosmic ball from screenshot) */}
          <Link
            href="#standards"
            onMouseMove={handleMouseMove("privacy")}
            className="group relative flex h-[320px] flex-col justify-between overflow-hidden rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] transition-colors duration-200 hover:border-[#2E2E2E] hover:bg-[#141414]"
          >
            {/* Subtle mouse spotlight follow */}
            {mousePositions["privacy"] && (
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(350px circle at ${mousePositions["privacy"].x}px ${mousePositions["privacy"].y}px, rgba(255,255,255,0.05), transparent 50%)`,
                }}
              />
            )}

            <div className="relative flex flex-1 flex-col items-center justify-between p-5">
              {/* Header */}
              <div className="flex w-full items-center justify-between text-[11px] text-[#A1A1A1]">
                <span className="font-mono tracking-[0.08em] text-[#6B6B6B] uppercase">
                  ZERO TELEMETRY
                </span>
                <span className="flex items-center gap-1 font-mono text-[#FFFFFF]">
                  <span className="size-1.5 rounded-full bg-[#FFFFFF]" />
                  AUDIT VERIFIED
                </span>
              </div>

              {/* Celestial Dark Glass Sphere matching screenshot Card 6 */}
              <div className="relative my-auto flex size-36 items-center justify-center">
                {/* Subtle monochrome ambient halo */}
                <div
                  className="absolute inset-0 rounded-full opacity-60 blur-xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(30,30,30,0.4) 50%, transparent 70%)",
                  }}
                />

                {/* The Celestial Crystal Orb Sphere */}
                <div
                  className="relative size-32 overflow-hidden rounded-full border border-[#2E2E2E] transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, #4a4a55 0%, #1c1c24 35%, #0d0d12 70%, #000000 100%)",
                    boxShadow:
                      "inset -12px -12px 28px rgba(0,0,0,0.98), inset 6px 6px 14px rgba(255,255,255,0.35)",
                  }}
                >
                  {/* Rotating celestial star layer inside orb */}
                  <div className="animate-hero-spin pointer-events-none absolute inset-0 opacity-90">
                    <span className="animate-hero-star-1 absolute top-4 left-7 size-1 rounded-full bg-white" />
                    <span className="animate-hero-star-2 absolute top-9 left-14 size-1.5 rounded-full bg-neutral-200" />
                    <span className="animate-hero-star-3 absolute top-16 left-8 size-0.5 rounded-full bg-white" />
                    <span className="animate-hero-star-1 absolute top-20 left-18 size-1 rounded-full bg-neutral-300" />
                    <span className="animate-hero-star-2 absolute top-7 left-20 size-0.5 rounded-full bg-white" />
                    <span className="animate-hero-star-3 absolute top-14 left-22 size-1 rounded-full bg-white" />
                    <span className="animate-hero-star-1 absolute top-22 left-11 size-1 rounded-full bg-neutral-200" />
                    <span className="animate-hero-star-2 absolute top-24 left-20 size-0.5 rounded-full bg-white" />
                  </div>

                  {/* Specular glare reflection highlight */}
                  <div className="absolute top-1.5 left-2.5 h-9 w-16 -rotate-45 rounded-full bg-gradient-to-b from-white/50 to-transparent blur-[1px]" />
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="flex w-full items-center justify-between text-[11px] text-[#6B6B6B]">
                <span>0 Trackers • 100% Offline</span>
                <span className="font-mono text-[#A1A1A1]">AES-256</span>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between border-t border-[#1F1F1F] bg-[#0A0A0A] px-5 py-3.5 text-xs font-medium text-[#FFFFFF] transition-colors group-hover:text-[#FFFFFF]">
              <span>Privacy Core</span>
              <span className="flex items-center gap-1 text-[#A1A1A1] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#FFFFFF]">
                Explore <span className="text-sm">→</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom Trust Indicators (x.ai style hairline divider, pure monochrome) */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#1F1F1F] pt-8 sm:grid-cols-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Resilience
            </div>
            <div className="mt-1 text-[14px] font-medium text-[#FFFFFF]">100% Offline</div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Telemetry
            </div>
            <div className="mt-1 text-[14px] font-medium text-[#FFFFFF]">0 Ad Trackers</div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Performance
            </div>
            <div className="mt-1 text-[14px] font-medium text-[#FFFFFF]">60 FPS Native</div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              Support SLA
            </div>
            <div className="mt-1 text-[14px] font-medium text-[#FFFFFF]">
              &lt; 48h Human Response
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
