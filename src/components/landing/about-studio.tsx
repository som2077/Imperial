"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function AboutStudio() {
  return (
    <section id="about" className="py-24 md:py-32 bg-black text-white border-t border-[#1F1F1F]">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Mission & Identity */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-3">
                Corporate Entity
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
                About Imperial Tech O.P.C.
              </h2>
            </div>

            <div className="space-y-5 text-base text-[#A1A1A1] leading-[1.6] max-w-[640px]">
              <p>
                <strong className="text-white font-medium">Imperial Tech O.P.C.</strong> is a legally
                incorporated software and mobile game development entity registered in India.
                Founded with a mission to build thoughtful, durable consumer software, our studio
                develops high-performance Android utilities and engaging tactical games for users
                worldwide.
              </p>

              <p>
                We believe that modern mobile software should respect the person holding the device.
                Our applications are built offline-first without intrusive trackers, aggressive
                monetization models, or redundant cloud permissions. Every line of code is measured
                against battery longevity, sub-millisecond touch feedback, and absolute privacy.
              </p>
            </div>

            {/* 3 Core Values (Clean Monochrome Rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#1F1F1F]">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-1">
                  Value 01
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Privacy by Default</h4>
                <p className="text-xs text-[#A1A1A1] leading-[1.5]">
                  Zero personal data selling, no third-party telemetry, strictly local storage.
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-1">
                  Value 02
                </div>
                <h4 className="text-sm font-medium text-white mb-1">Native Performance</h4>
                <p className="text-xs text-[#A1A1A1] leading-[1.5]">
                  Sub-16ms frame times, 60 FPS animations, and instantaneous touch responsiveness.
                </p>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-1">
                  Value 03
                </div>
                <h4 className="text-sm font-medium text-white mb-1">User-Centric Craft</h4>
                <p className="text-xs text-[#A1A1A1] leading-[1.5]">
                  Minimalist interfaces designed for clarity, daily utility, and mindful logic.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Verification Card */}
          <div className="lg:col-span-5">
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8 space-y-6">
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] border-b border-[#1F1F1F] pb-3">
                Google Play Verified Entity
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">LEGAL NAME</span>
                  <span className="text-white font-medium">{siteConfig.company.legalName}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">STRUCTURE</span>
                  <span className="text-white font-medium">{siteConfig.company.legalType}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">JURISDICTION</span>
                  <span className="text-white font-medium">{siteConfig.company.country}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">OFFICIAL SUPPORT</span>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="text-white underline hover:opacity-80"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">SUPPORT SLA</span>
                  <span className="text-white">{siteConfig.company.responseTimeSLA}</span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-[#6B6B6B]">PLAY STORE DEV ID</span>
                  <span className="text-white">{siteConfig.company.googlePlayDeveloperId}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:underline"
                >
                  <span>Verify Google Play Organization Account</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
