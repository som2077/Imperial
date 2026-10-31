import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Shield, Zap, Database, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "App Portfolio | Imperial Tech O.P.C.",
  description:
    "Explore offline-first Android utilities and games published by Imperial Tech O.P.C. on Google Play — Universal Calculator World, Chess Pocket, and Sudoku Daily Puzzle.",
};

export default function AppsPage() {
  const commitments = [
    {
      title: "No sale of personal data",
      desc: "We never sell or rent your personal information.",
      icon: Shield,
    },
    {
      title: "Local-first storage",
      desc: "Your data lives strictly on your device in SQLite.",
      icon: Database,
    },
    {
      title: "Minimal permissions",
      desc: "We request only what a feature genuinely needs.",
      icon: Lock,
    },
    {
      title: "Transparent disclosure",
      desc: "Privacy Policy and Google Play Data Safety match what apps actually do.",
      icon: CheckCircle2,
    },
    {
      title: "Easy deletion",
      desc: "Uninstall to erase local data, or contact us to delete anything we hold.",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#1F1F1F] bg-black/85 py-4 backdrop-blur-md">
        <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium">
            <span>Imperial Tech</span>
            <span className="py-0.2 rounded-[3px] border border-[#2E2E2E] px-1 font-mono text-[10px] text-[#6B6B6B] uppercase">
              O.P.C.
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1A1] transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-[960px] px-6 py-16 sm:py-24">
        {/* Title Block */}
        <div className="mb-14 max-w-[700px]">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Google Play Developer Portfolio
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Three apps. No accounts. No tracking. Just work that works.
          </h1>
          <p className="mt-4 text-base leading-[1.65] text-[#A1A1A1]">
            Every Imperial Tech app is built to run offline, respect your privacy, and meet Google
            Play&apos;s policies on data safety, permissions, and user protection.
          </p>
        </div>

        {/* 3 Apps Showcase */}
        <div className="space-y-8">
          {/* App 1: Universal Calculator World */}
          <div className="rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="mb-2 flex items-center gap-2 text-2xl">
                  <span>🧮</span>
                  <h2 className="text-xl font-medium text-white sm:text-2xl">
                    Universal Calculator World
                  </h2>
                </div>
                <p className="font-mono text-xs text-[#10b981]">
                  Every conversion you need. Even with no signal.
                </p>
              </div>

              <span className="self-start rounded-[4px] border border-[#2E2E2E] bg-black px-2.5 py-1 font-mono text-[11px] text-[#CCCCCC]">
                Google Play Live
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
              A fast, offline-first calculator and unit converter with 150+ converters covering
              length, weight, temperature, currency-style ratios, area, volume, speed, time, data,
              energy, pressure, and more.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 text-xs text-[#CCCCCC] sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>150+ unit converters in a single clean app</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>100% offline: works in airplane mode &amp; remote areas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Instant results with sub-16ms response on every keypress</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>History stored only on your device</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>No account, no sign-up, no personal data required</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-[#1F1F1F] pt-6">
              <a
                href={siteConfig.apps[0].playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[6px] bg-white px-5 py-2.5 text-xs font-medium text-black transition-opacity hover:opacity-85"
              >
                <span>Download on Google Play</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* App 2: Chess Pocket */}
          <div className="rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="mb-2 flex items-center gap-2 text-2xl">
                  <span>♟️</span>
                  <h2 className="text-xl font-medium text-white sm:text-2xl">Chess Pocket</h2>
                </div>
                <p className="font-mono text-xs text-[#10b981]">
                  A serious chess opponent that fits in your pocket.
                </p>
              </div>

              <span className="self-start rounded-[4px] border border-[#2E2E2E] bg-black px-2.5 py-1 font-mono text-[11px] text-[#CCCCCC]">
                Early Access / RC
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
              A lightweight tactical chess game powered by an on-device engine. Play, practice, and
              improve without a connection or a subscription.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 text-xs text-[#CCCCCC] sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>On-device chess engine: no servers, no waiting, no lag</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Multiple difficulty levels from beginner to demanding tactician</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Play anywhere: flights, commutes, offline</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Small install size, smooth on older phones</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Your games stay strictly on your device</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-[#1F1F1F] pt-6">
              <a
                href={siteConfig.apps[1].playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[6px] bg-white px-5 py-2.5 text-xs font-medium text-black transition-opacity hover:opacity-85"
              >
                <span>Get Chess Pocket on Google Play</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* App 3: Sudoku Daily Puzzle */}
          <div className="rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="mb-2 flex items-center gap-2 text-2xl">
                  <span>🔢</span>
                  <h2 className="text-xl font-medium text-white sm:text-2xl">
                    Sudoku Daily Puzzle
                  </h2>
                </div>
                <p className="font-mono text-xs text-[#10b981]">
                  One puzzle a day. Sharper mind every day.
                </p>
              </div>

              <span className="self-start rounded-[4px] border border-[#2E2E2E] bg-black px-2.5 py-1 font-mono text-[11px] text-[#CCCCCC]">
                Closed Beta Testing
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
              An offline brain-training Sudoku with fresh daily puzzles and a clean,
              distraction-free board.
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 text-xs text-[#CCCCCC] sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Daily puzzle to build a consistent habit</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Fully offline gameplay</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Multiple difficulty levels for every skill level</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Progress and streaks saved locally on your device</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-white" />
                <span>Calm, clutter-free AMOLED design</span>
              </li>
            </ul>

            <div className="mt-6 border-t border-[#1F1F1F] pt-6">
              <a
                href={siteConfig.apps[2].playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[6px] bg-white px-5 py-2.5 text-xs font-medium text-black transition-opacity hover:opacity-85"
              >
                <span>Play Sudoku on Google Play</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Our Promise Across All Apps */}
        <div className="mt-14 rounded-[8px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
          <h3 className="mb-4 text-base font-medium text-white">Our Promise Across All Apps</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className="rounded-[4px] border border-[#1F1F1F] bg-black p-4">
                  <Icon className="mb-2 size-4 text-white" />
                  <div className="text-xs font-medium text-white">{c.title}</div>
                  <div className="mt-1 text-[11px] leading-relaxed text-[#A1A1A1]">{c.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
