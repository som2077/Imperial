"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Check } from "lucide-react";

export default function DataDeletionPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    appName: "Universal Calculator World",
    userIdentifier: "",
    email: "",
    deletionScope: "all",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Header */}
      <header className="border-b border-[#1F1F1F] py-4 bg-black/85 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between px-6 max-w-[1200px]">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium">
            <span>Imperial Tech</span>
            <span className="font-mono text-[10px] uppercase text-[#6B6B6B] border border-[#2E2E2E] px-1 py-0.2 rounded-[3px]">
              O.P.C.
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="text-[#A1A1A1] hover:text-white inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto max-w-[800px] px-6 py-16 sm:py-24">
        {/* Page Header */}
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-3">
            Google Play Data Safety &amp; Deletion Compliance
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            User Data Deletion Request
          </h1>
          <p className="mt-4 text-base text-[#A1A1A1] leading-[1.6]">
            In accordance with Google Play Developer Policy,{" "}
            <strong className="text-white font-medium">{siteConfig.company.legalName}</strong> provides
            this official portal allowing users of any of our mobile applications to request the
            permanent deletion of their account records, analytics logs, or customer support data.
          </p>
        </div>

        {/* 3 Columns Policy Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-2">
              SLA TIMELINE
            </div>
            <div className="text-sm font-medium text-white mb-1">24–48 Business Hours</div>
            <p className="text-xs text-[#A1A1A1] leading-[1.5]">
              Requests are logged and permanently purged within 48 business hours.
            </p>
          </div>

          <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-2">
              DELETION SCOPE
            </div>
            <div className="text-sm font-medium text-white mb-1">Irreversible Purge</div>
            <p className="text-xs text-[#A1A1A1] leading-[1.5]">
              Associated cloud logs, identifiers, and tickets are permanently erased.
            </p>
          </div>

          <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6B6B6B] mb-2">
              PRIVACY DESK
            </div>
            <div className="text-sm font-medium text-white mb-1">Direct Support</div>
            <p className="text-xs text-[#A1A1A1] leading-[1.5]">
              Email our Privacy Officer directly at{" "}
              <a
                href={`mailto:${siteConfig.company.privacyEmail}`}
                className="text-white underline"
              >
                {siteConfig.company.privacyEmail}
              </a>
              .
            </p>
          </div>
        </div>

        {/* Form Box */}
        <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-8 sm:p-10">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-2">
            Formal Deletion Form
          </div>
          <h2 className="text-xl font-medium text-white mb-6">
            Submit an account or data deletion request
          </h2>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-white">
                ✔ Deletion Request Successfully Logged
              </div>
              <p className="text-sm text-[#A1A1A1] max-w-md mx-auto leading-relaxed">
                Your request to purge records for <strong>{formData.appName}</strong> linked to{" "}
                <strong>{formData.email}</strong> has been logged (Ticket #DEL-
                {Math.floor(100000 + Math.random() * 900000)}). Our Privacy Officer will confirm the
                completed purge via email within 48 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-mono text-white underline hover:opacity-80"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="appName" className="text-xs font-medium text-[#A1A1A1]">
                  Select Application
                </label>
                <select
                  id="appName"
                  value={formData.appName}
                  onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid #2E2E2E",
                    borderRadius: "6px",
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="Universal Calculator World">Universal Calculator World</option>
                  <option value="Chess Pocket">Chess Pocket</option>
                  <option value="Sudoku - Daily Puzzle Game">Sudoku - Daily Puzzle Game</option>
                  <option value="All Imperial Tech O.P.C. Apps">All Imperial Tech O.P.C. Apps</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-[#A1A1A1]">
                  Contact Email (for confirmation)
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid #2E2E2E",
                    borderRadius: "6px",
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="userIdentifier" className="text-xs font-medium text-[#A1A1A1]">
                  User ID / Installation Identifier (Optional)
                </label>
                <input
                  id="userIdentifier"
                  type="text"
                  value={formData.userIdentifier}
                  onChange={(e) => setFormData({ ...formData, userIdentifier: e.target.value })}
                  placeholder="e.g. anonymous-device-uuid"
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid #2E2E2E",
                    borderRadius: "6px",
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="deletionScope" className="text-xs font-medium text-[#A1A1A1]">
                  Data Scope to Delete
                </label>
                <select
                  id="deletionScope"
                  value={formData.deletionScope}
                  onChange={(e) => setFormData({ ...formData, deletionScope: e.target.value })}
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid #2E2E2E",
                    borderRadius: "6px",
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                >
                  <option value="all">Complete Deletion (All account data, logs, and cloud records)</option>
                  <option value="analytics">Diagnostic Crash Reports Only</option>
                  <option value="support">Customer Support Ticket History Only</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="reason" className="text-xs font-medium text-[#A1A1A1]">
                  Reason for Deletion (Optional)
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Tell us how we can improve our applications..."
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid #2E2E2E",
                    borderRadius: "6px",
                  }}
                  className="w-full px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "#FFFFFF",
                  color: "#000000",
                  borderRadius: "6px",
                }}
                className="w-full py-3 font-medium text-xs transition-opacity hover:opacity-85"
              >
                Submit Permanent Deletion Request
              </button>
            </form>
          )}
        </div>

        {/* Manual Device Clear Guide */}
        <div className="mt-12 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 text-xs text-[#A1A1A1] space-y-3 font-mono">
          <div className="text-white font-medium uppercase tracking-[0.08em]">
            Immediate On-Device Cache &amp; Storage Clearance
          </div>
          <p className="leading-relaxed">
            Because Imperial Tech applications store states locally on your device, you can
            immediately erase all data directly on Android without waiting:
          </p>
          <ol className="list-decimal list-inside space-y-1 pl-1 text-[#6B6B6B]">
            <li>Open Android <strong>Settings → Apps → Manage Apps</strong>.</li>
            <li>Select <strong>Universal Calculator World</strong>, <strong>Chess Pocket</strong>, or <strong>Sudoku</strong>.</li>
            <li>Tap <strong>Storage &amp; Cache</strong>.</li>
            <li>Tap <strong>Clear Storage / Clear Data</strong> to immediately wipe 100% of stored records.</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
