"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function ImperialFooter() {
  return (
    <footer className="bg-black text-white border-t border-[#1F1F1F]">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12 py-16">
        {/* Multi-column link lists (design.md spec) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Column 1: Studio Apps */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-white font-medium">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1A1]">
              <li>
                <Link href="#portfolio" className="hover:text-white transition-colors">
                  Universal Calculator World
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-white transition-colors">
                  Chess Pocket
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-white transition-colors">
                  Sudoku - Daily Puzzle
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Google Play Catalog</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Engineering */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-white font-medium">
              Engineering
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1A1]">
              <li>
                <Link href="#standards" className="hover:text-white transition-colors">
                  Studio Standards
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-white transition-colors">
                  Offline-First Architecture
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-white transition-colors">
                  Zero Telemetry Audit
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-white transition-colors">
                  Stockfish 17 Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Studio */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-white font-medium">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1A1]">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  Legal Entity (India)
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Developer Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Google Play Legal */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-white font-medium">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1A1]">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="hover:text-white transition-colors">
                  User Data Deletion
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.company.googlePlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Developer Profile</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Support Desk */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-white font-medium">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A1A1A1]">
              <li>
                <a
                  href={`mailto:${siteConfig.company.supportEmail}`}
                  className="hover:text-white transition-colors font-mono"
                >
                  {siteConfig.company.supportEmail}
                </a>
              </li>
              <li className="font-mono text-[11px] text-[#6B6B6B]">
                SLA: {siteConfig.company.responseTimeSLA}
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Submit Support Ticket →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright in --text-subtle (#6B6B6B) */}
        <div className="mt-16 pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B6B6B]">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.company.legalName}. All rights reserved.
            Legally incorporated in India.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#A1A1A1] transition-colors">
              Privacy
            </Link>
            <span>/</span>
            <Link href="/terms" className="hover:text-[#A1A1A1] transition-colors">
              Terms
            </Link>
            <span>/</span>
            <Link href="/data-deletion" className="hover:text-[#A1A1A1] transition-colors">
              Data Deletion
            </Link>
            <span>/</span>
            <a
              href={siteConfig.company.googlePlayStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A1A1A1] transition-colors"
            >
              Google Play Console
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
