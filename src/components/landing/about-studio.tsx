"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function AboutStudio() {
  return (
    <section id="about" className="border-t border-[#1F1F1F] bg-black py-24 text-white md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Mission & Identity */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Corporate Entity
              </div>
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
                About Imperial Tech O.P.C.
              </h2>
            </div>

            <div className="max-w-[640px] space-y-5 text-base leading-[1.6] text-[#A1A1A1]">
              <p>
                <strong className="font-medium text-white">Imperial Tech O.P.C.</strong> is a
                legally incorporated software and mobile game development entity registered in
                India. Founded with a mission to build thoughtful, durable consumer software, our
                studio develops high-performance Android utilities and engaging tactical games for
                users worldwide.
              </p>

              <p>
                We believe that modern mobile software should respect the person holding the device.
                Our applications are built offline-first without intrusive trackers, aggressive
                monetization models, or redundant cloud permissions. Every line of code is measured
                against battery longevity, sub-millisecond touch feedback, and absolute privacy.
              </p>
            </div>

            {/* 3 Core Values (Clean Monochrome Rows) */}
            <div className="grid grid-cols-1 gap-6 border-t border-[#1F1F1F] pt-4 sm:grid-cols-3">
              <div>
                <div className="mb-1 font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
                  Value 01
                </div>
                <h4 className="mb-1 text-sm font-medium text-white">Privacy by Default</h4>
                <p className="text-xs leading-[1.5] text-[#A1A1A1]">
                  Zero personal data selling, no third-party telemetry, strictly local storage.
                </p>
              </div>

              <div>
                <div className="mb-1 font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
                  Value 02
                </div>
                <h4 className="mb-1 text-sm font-medium text-white">Native Performance</h4>
                <p className="text-xs leading-[1.5] text-[#A1A1A1]">
                  Sub-16ms frame times, 60 FPS animations, and instantaneous touch responsiveness.
                </p>
              </div>

              <div>
                <div className="mb-1 font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
                  Value 03
                </div>
                <h4 className="mb-1 text-sm font-medium text-white">User-Centric Craft</h4>
                <p className="text-xs leading-[1.5] text-[#A1A1A1]">
                  Minimalist interfaces designed for clarity, daily utility, and mindful logic.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Corporate Verification Card */}
          <div className="lg:col-span-5">
            <div className="space-y-6 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
              <div className="border-b border-[#1F1F1F] pb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Google Play Verified Entity
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">LEGAL NAME</span>
                  <span className="font-medium text-white">{siteConfig.company.legalName}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">STRUCTURE</span>
                  <span className="font-medium text-white">{siteConfig.company.legalType}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">JURISDICTION</span>
                  <span className="font-medium text-white">{siteConfig.company.country}</span>
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
