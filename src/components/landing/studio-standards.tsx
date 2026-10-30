"use client";

import * as React from "react";

export function StudioStandards() {
  const standards = [
    {
      index: "01",
      title: "100% Offline Resilience",
      description:
        "All application logic, calculations, game states, and databases operate independently of active network connectivity. Zero forced cloud synchronization or server outages.",
      spec: "Room / SQLite sandboxed on-device database",
    },
    {
      index: "02",
      title: "Zero Telemetry or Data Brokering",
      description:
        "Imperial Tech strictly rejects surveillance advertising. We never harvest Google Advertising IDs (GAID), device contacts, location records, or sell telemetry data to third parties.",
      spec: "Google Play Console Data Safety Certified",
    },
    {
      index: "03",
      title: "60 FPS Native Touch Physics",
      description:
        "Written in Kotlin Jetpack Compose, Flutter, and Skia Canvas for sub-16ms touch frame rates, zero scroll jitter, and optimal responsiveness across all Android screen densities.",
      spec: "Native 64-bit arm64-v8a compilation",
    },
    {
      index: "04",
      title: "Resource & Battery Longevity",
      description:
        "Architected without background wake-locks, silent push analytics, or redundant memory allocations to maximize device battery life during extended utility and game sessions.",
      spec: "Zero continuous background services",
    },
  ];

  return (
    <section id="standards" className="py-24 md:py-32 bg-black text-white border-t border-[#1F1F1F]">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="max-w-[640px] mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-3">
            Engineering Benchmarks
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Pure performance. Zero compromises.
          </h2>
          <p className="mt-4 text-base text-[#A1A1A1] leading-[1.6]">
            Architectural standards governing all software developed and published by Imperial Tech
            O.P.C.
          </p>
        </div>

        {/* 4-Item Grid with 1px border lines (design.md spec) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1F1F1F] border border-[#1F1F1F] rounded-[6px] overflow-hidden">
          {standards.map((s, idx) => (
            <div key={idx} className="bg-black p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-4">
                  {s.index} / SPECIFICATION
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">{s.title}</h3>
                <p className="text-sm text-[#A1A1A1] leading-[1.6]">{s.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1F1F1F] font-mono text-[11px] text-[#6B6B6B]">
                {s.spec}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Terminal Box (Clean Monochrome Code / Audit) */}
        <div className="mt-12 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 font-mono text-xs text-[#A1A1A1]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F] text-[#6B6B6B] mb-4">
            <span>APK MANIFEST SECURITY AUDIT</span>
            <span className="text-white">STATUS: 100% COMPLIANT</span>
          </div>
          <div className="space-y-1.5 leading-relaxed overflow-x-auto text-xs">
            <p className="text-[#6B6B6B]"># Verified Android Application Package Manifest Constraints</p>
            <p className="text-white">✔ Target SDK: Android 15 (API 35) &amp; Android 14 (API 34)</p>
            <p className="text-white">✔ Dangerous Permissions: NONE (No READ_CONTACTS, ACCESS_FINE_LOCATION)</p>
            <p className="text-white">✔ Play Console Families &amp; COPPA Policy: Verified Compliant</p>
            <p className="text-white">✔ Third-Party Ad Networks: NONE</p>
            <p className="text-[#6B6B6B]">
              ℹ Entity: Imperial Tech O.P.C. [Verified Organization Account • India]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
