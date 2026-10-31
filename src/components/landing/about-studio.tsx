"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function AboutStudio() {
  const principles = [
    {
      num: "01",
      title: "Offline-first, always.",
      desc: "Core features run entirely on your device. Calculations, puzzles, and chess games do not require an account, a server, or a network connection.",
    },
    {
      num: "02",
      title: "Zero surveillance advertising.",
      desc: "We do not sell personal data or build advertising profiles. Ads are limited to non-personalized formats and disclosed in Google Play Data Safety.",
    },
    {
      num: "03",
      title: "Sub-16ms responsiveness.",
      desc: "Every interaction is engineered to complete within a single 60 fps frame (16 milliseconds) on budget and older Android devices as well as flagships.",
    },
    {
      num: "04",
      title: "Privacy by default.",
      desc: "Progress, settings, and history are stored locally in an on-device SQLite database that you control and can erase at any time.",
    },
    {
      num: "05",
      title: "Small and lightweight.",
      desc: "Compact install sizes, minimal permissions, zero battery wake-locks, and no unnecessary background services.",
    },
  ];

  return (
    <section id="about" className="border-t border-[#1F1F1F] bg-black py-24 text-white md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Mission & Identity */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Company &amp; About Us
              </div>
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
                Software built to respect your time, your device, and your privacy.
              </h2>
            </div>

            <div className="max-w-[640px] space-y-4 text-base leading-[1.65] text-[#A1A1A1]">
              <p>
                <strong className="font-medium text-white">Imperial Tech O.P.C.</strong> is an
                India-based software studio that designs and publishes fast, offline-first mobile
                applications for Android. We build utilities and games that open instantly, work
                without an internet connection, and never treat our users as a data source.
              </p>

              <p className="text-sm">
                Incorporated under the Companies Act, 2013, India, we publish our applications on
                Google Play under an <strong>Organization Developer Account</strong>, and we are
                accountable for every product we release. Our work is led directly by the
                company&apos;s founder, which means every design, engineering, and privacy decision
                is made by the same people who answer your support emails.
              </p>
            </div>

            {/* 5 Engineering Principles Grid */}
            <div className="border-t border-[#1F1F1F] pt-6">
              <div className="mb-4 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Our Engineering Principles
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {principles.map((p) => (
                  <div
                    key={p.num}
                    className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-4.5"
                  >
                    <div className="mb-1 font-mono text-[10px] tracking-wider text-[#6B6B6B]">
                      {p.num} / PRINCIPLE
                    </div>
                    <h4 className="mb-1.5 text-sm font-medium text-white">{p.title}</h4>
                    <p className="text-xs leading-[1.5] text-[#A1A1A1]">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Play Verification Matrix */}
          <div className="lg:col-span-5">
            <div className="space-y-6 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
              <div className="border-b border-[#1F1F1F] pb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Google Play Developer Verification
              </div>

              <div className="space-y-3.5 font-mono text-xs">
                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">LEGAL ENTITY</span>
                  <span className="font-medium text-white">{siteConfig.company.legalName}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">ENTITY TYPE</span>
                  <span className="font-medium text-white">One Person Company (O.P.C.)</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">INCORPORATION</span>
                  <span className="text-right text-white">Companies Act, 2013</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">JURISDICTION</span>
                  <span className="font-medium text-white">{siteConfig.company.country}</span>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">OFFICIAL EMAIL</span>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="text-white underline hover:opacity-80"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2.5">
                  <span className="text-[#6B6B6B]">SUPPORT SLA</span>
                  <span className="text-white">Within 24–48 Business Hours</span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-[#6B6B6B]">ACCOUNT TYPE</span>
                  <span className="text-white">Organization (D-U-N-S Verified)</span>
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
