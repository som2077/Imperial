"use client";

import * as React from "react";
import {
  ShieldCheck,
  Zap,
  WifiOff,
  BatteryCharging,
  Code2,
  Lock,
  Layers,
  Terminal,
  CheckCircle2,
} from "lucide-react";

export function StudioStandards() {
  return (
    <section id="standards" className="relative py-24 bg-neutral-950 text-white overflow-hidden">
      {/* Dark Section Ambient Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[140px]"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold text-indigo-400 backdrop-blur-xs mb-3">
            <Terminal className="size-3.5" />
            <span>Studio Quality Benchmarks</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
            High-Performance Engineering.{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Zero Privacy Compromises.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 leading-relaxed">
            Unlike mass-produced mobile apps cluttered with monetization bloat and tracking scripts,
            every product from <strong className="text-white">Imperial Tech O.P.C.</strong> is built
            for speed, battery longevity, and complete user privacy.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-indigo-500/40 hover:bg-white/[0.05]">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">
              <WifiOff className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white">100% Offline Resilience</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Core calculations, game logic, and database schemas function seamlessly without an
              active internet connection. Zero forced cloud dependencies.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              <span>Offline First Architecture</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-purple-500/40 hover:bg-white/[0.05]">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4">
              <Lock className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Zero Invasive Tracking</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              We never collect or sell your device advertising identifiers (GAID), contact books, or
              precise GPS coordinates. Your activity stays entirely private.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-purple-400">
              <CheckCircle2 className="size-3.5" />
              <span>Google Play Data Safety A+</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-amber-500/40 hover:bg-white/[0.05]">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-4">
              <Zap className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white">60 FPS Native Touch</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Engineered with Kotlin Jetpack Compose, Flutter, and Skia canvas rendering to guarantee
              sub-millisecond input response and zero interface jitter.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
              <CheckCircle2 className="size-3.5" />
              <span>Sub-16ms Frame Times</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-emerald-500/40 hover:bg-white/[0.05]">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
              <BatteryCharging className="size-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Battery &amp; RAM Efficient</h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              No continuous background wake-locks, silent push analytics, or memory leaks. Play logic
              games and calculate formulas without draining battery life.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              <span>Low Resource Consumption</span>
            </div>
          </div>
        </div>

        {/* Technical Architecture Terminal Box */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-neutral-900/90 p-5 sm:p-6 font-mono text-xs text-neutral-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-neutral-400">
            <div className="flex items-center gap-2">
              <Code2 className="size-4 text-indigo-400" />
              <span className="font-semibold text-white">studio-audit --manifest-security-report</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-bold">100% AUDIT PASS</span>
          </div>

          <div className="space-y-1.5 leading-relaxed overflow-x-auto text-xs">
            <p className="text-neutral-500"># Imperial Tech O.P.C. Mobile APK &amp; AAB Verification Specs</p>
            <p className="text-emerald-400">✔ Android Target SDK: Android 15 (API 35) &amp; Android 14 (API 34)</p>
            <p className="text-emerald-400">✔ Dangerous Permissions: NONE (No READ_CONTACTS, ACCESS_FINE_LOCATION)</p>
            <p className="text-emerald-400">✔ Play Console Families &amp; COPPA Policy: Verified Compliant</p>
            <p className="text-emerald-400">✔ Native Architecture: 64-bit arm64-v8a and x86_64 Optimized</p>
            <p className="text-indigo-400">ℹ Developer Entity: Imperial Tech O.P.C. [Verified Organization Account]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
