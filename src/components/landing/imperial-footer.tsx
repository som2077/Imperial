"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sun } from "lucide-react";

export function ImperialFooter() {
  return (
    <footer className="bg-black text-white border-t border-[#1F1F1F] font-sans antialiased">
      <div className="container mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* ============================================================== */}
          {/* LEFT SECTION: Logo, Copyright, Divider & Bottom Pills          */}
          {/* ============================================================== */}
          <div className="lg:col-span-3 lg:border-r lg:border-[#1F1F1F] lg:pr-8 flex flex-col justify-between h-full min-h-[340px]">
            <div>
              {/* Stylized Modern Tech Logo Wordmark (SPACEX style) */}
              <Link
                href="/"
                className="inline-block tracking-[0.2em] font-extrabold text-white text-lg sm:text-xl font-mono uppercase hover:opacity-80 transition-opacity"
              >
                IMPERIAL<span className="text-[#6B6B6B]">TECH</span>
              </Link>

              {/* Exact Copyright line */}
              <p className="mt-4 text-[13px] text-[#6B6B6B] leading-relaxed">
                &copy; {new Date().getFullYear()} {siteConfig.company.legalName}
              </p>
              <p className="text-[12px] text-[#525252] mt-0.5">
                Legally Incorporated in India
              </p>
            </div>

            {/* Bottom Left: Theme Toggle & Verified Pill Badge */}
            <div className="mt-12 lg:mt-auto pt-6 flex items-center gap-3">
              <ThemeToggle />
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2E2E2E] bg-[#0A0A0A] px-3 py-1 text-[11px] text-[#A1A1A1]">
                <ShieldCheck className="size-3.5 text-white" />
                <span>Google Play Verified</span>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT SECTION: 5-Column Grid with 2-tier stacked link groups   */}
          {/* ============================================================== */}
          <div className="lg:col-span-9 lg:pl-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 sm:gap-x-8 text-[13px]">
              {/* COLUMN 1: Products & Download */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Products</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <Link href="#portfolio" className="hover:text-white transition-colors block">
                        Calculator World
                      </Link>
                    </li>
                    <li>
                      <Link href="#portfolio" className="hover:text-white transition-colors block">
                        Chess Pocket
                      </Link>
                    </li>
                    <li>
                      <Link href="#portfolio" className="hover:text-white transition-colors block">
                        Sudoku - Daily
                      </Link>
                    </li>
                    <li>
                      <Link href="#portfolio" className="hover:text-white transition-colors block">
                        All Applications
                      </Link>
                    </li>
                    <li>
                      <Link href="/changelog" className="hover:text-white transition-colors block">
                        Beta Releases
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Download</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <a
                        href={siteConfig.company.googlePlayStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block"
                      >
                        Google Play Store
                      </a>
                    </li>
                    <li>
                      <Link href="#portfolio" className="hover:text-white transition-colors block">
                        APK Releases
                      </Link>
                    </li>
                    <li>
                      <Link href="#contact" className="hover:text-white transition-colors block">
                        Early Access
                      </Link>
                    </li>
                    <li>
                      <span className="text-[#6B6B6B] block">Android 15 SDK</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COLUMN 2: Engineering & Security */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Engineering</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        Studio Standards
                      </Link>
                    </li>
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        Offline Architecture
                      </Link>
                    </li>
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        Stockfish 17 Engine
                      </Link>
                    </li>
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        Kotlin Compose
                      </Link>
                    </li>
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        60 FPS Touch Physics
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Security</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        Manifest Audit
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Zero Telemetry A+
                      </Link>
                    </li>
                    <li>
                      <Link href="#standards" className="hover:text-white transition-colors block">
                        Zero Ad SDKs
                      </Link>
                    </li>
                    <li>
                      <span className="text-[#6B6B6B] block">Local Storage Only</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COLUMN 3: Developers & Support */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Developers</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <a
                        href={siteConfig.company.googlePlayStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block"
                      >
                        Play Console Profile
                      </a>
                    </li>
                    <li>
                      <Link href="#portfolio" className="hover:text-white transition-colors block">
                        API &amp; Tools
                      </Link>
                    </li>
                    <li>
                      <Link href="/docs" className="hover:text-white transition-colors block">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <a
                        href={siteConfig.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block"
                      >
                        Source Code
                      </a>
                    </li>
                    <li>
                      <Link href="/changelog" className="hover:text-white transition-colors block">
                        Status
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Support</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <a
                        href={`mailto:${siteConfig.company.supportEmail}`}
                        className="hover:text-white transition-colors block truncate"
                      >
                        {siteConfig.company.supportEmail}
                      </a>
                    </li>
                    <li>
                      <Link href="#contact" className="hover:text-white transition-colors block">
                        Contact Support
                      </Link>
                    </li>
                    <li>
                      <span className="text-[#6B6B6B] block">24–48h SLA</span>
                    </li>
                    <li>
                      <span className="text-[#6B6B6B] block">IST Business Hours</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COLUMN 4: Company & Trust */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Company</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <Link href="#about" className="hover:text-white transition-colors block">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#about" className="hover:text-white transition-colors block">
                        Legal Entity (India)
                      </Link>
                    </li>
                    <li>
                      <Link href="/changelog" className="hover:text-white transition-colors block">
                        News &amp; Releases
                      </Link>
                    </li>
                    <li>
                      <Link href="#contact" className="hover:text-white transition-colors block">
                        Contact Desk
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Trust</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Safety Standards
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Privacy Portal
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        COPPA &amp; Families
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Subprocessors
                      </Link>
                    </li>
                    <li>
                      <Link href="#contact" className="hover:text-white transition-colors block">
                        Help Center
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* COLUMN 5: Legal & Social */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-3">Legal</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <Link href="/terms" className="hover:text-white transition-colors block">
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/data-deletion"
                        className="hover:text-white transition-colors block text-white font-medium"
                      >
                        Data Deletion
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Cookies
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-white transition-colors block">
                        Brand
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="hover:text-white transition-colors block">
                        Privacy choices
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Social</h4>
                  <ul className="space-y-2 text-[#A1A1A1]">
                    <li>
                      <a
                        href={siteConfig.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block"
                      >
                        @ImperialTech
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteConfig.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteConfig.socials.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block"
                      >
                        Discord
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteConfig.company.googlePlayStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors block text-white"
                      >
                        Play Store
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
