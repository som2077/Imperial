"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft } from "lucide-react";

export default function DataDeletionPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [ticketId, setTicketId] = React.useState("");
  const [formData, setFormData] = React.useState({
    appName: "Universal Calculator World",
    userIdentifier: "",
    email: "",
    deletionScope: "all",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(String(Math.floor(100000 + Math.random() * 900000)));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
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

      {/* Main Container */}
      <main className="container mx-auto max-w-[800px] px-6 py-16 sm:py-24">
        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Google Play Data Safety &amp; Deletion Compliance
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            User Data Deletion Request
          </h1>
          <p className="mt-4 text-base leading-[1.6] text-[#A1A1A1]">
            In accordance with Google Play Developer Policy,{" "}
            <strong className="font-medium text-white">{siteConfig.company.legalName}</strong>{" "}
            provides this official portal allowing users of any of our mobile applications to
            request the permanent deletion of their account records, analytics logs, or customer
            support data.
          </p>
        </div>

        {/* 3 Columns Policy Info */}
        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
            <div className="mb-2 font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              SLA TIMELINE
            </div>
            <div className="mb-1 text-sm font-medium text-white">24–48 Business Hours</div>
            <p className="text-xs leading-[1.5] text-[#A1A1A1]">
              Requests are logged and permanently purged within 48 business hours.
            </p>
          </div>

          <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
            <div className="mb-2 font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              DELETION SCOPE
            </div>
            <div className="mb-1 text-sm font-medium text-white">Irreversible Purge</div>
            <p className="text-xs leading-[1.5] text-[#A1A1A1]">
              Associated cloud logs, identifiers, and tickets are permanently erased.
            </p>
          </div>

          <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
            <div className="mb-2 font-mono text-[11px] tracking-[0.08em] text-[#6B6B6B] uppercase">
              PRIVACY DESK
            </div>
            <div className="mb-1 text-sm font-medium text-white">Direct Support</div>
            <p className="text-xs leading-[1.5] text-[#A1A1A1]">
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
          <div className="mb-2 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Formal Deletion Form
          </div>
          <h2 className="mb-6 text-xl font-medium text-white">
            Submit an account or data deletion request
          </h2>

          {submitted ? (
            <div className="space-y-4 py-8 text-center">
              <div className="font-mono text-xs tracking-[0.08em] text-white uppercase">
                ✔ Deletion Request Successfully Logged
              </div>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-[#A1A1A1]">
                Your request to purge records for <strong>{formData.appName}</strong> linked to{" "}
                <strong>{formData.email}</strong> has been logged (Ticket #DEL-
                {ticketId}). Our Privacy Officer will confirm the completed purge via email within
                48 business hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 font-mono text-xs text-white underline hover:opacity-80"
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
                  className="w-full px-3.5 py-2.5 text-xs text-white transition-colors focus:border-white focus:outline-none"
                >
                  <option value="Universal Calculator World">Universal Calculator World</option>
                  <option value="Chess Pocket">Chess Pocket</option>
                  <option value="Sudoku - Daily Puzzle Game">Sudoku - Daily Puzzle Game</option>
                  <option value="All Imperial Tech O.P.C. Apps">
                    All Imperial Tech O.P.C. Apps
                  </option>
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
                  className="w-full px-3.5 py-2.5 text-xs text-white transition-colors placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
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
                  className="w-full px-3.5 py-2.5 text-xs text-white transition-colors placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
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
                  className="w-full px-3.5 py-2.5 text-xs text-white transition-colors focus:border-white focus:outline-none"
                >
                  <option value="all">
                    Complete Deletion (All account data, logs, and cloud records)
                  </option>
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
                  className="w-full px-3.5 py-2.5 text-xs text-white transition-colors placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                style={{
                  background: "#FFFFFF",
                  color: "#000000",
                  borderRadius: "6px",
                }}
                className="w-full py-3 text-xs font-medium transition-opacity hover:opacity-85"
              >
                Submit Permanent Deletion Request
              </button>
            </form>
          )}
        </div>

        {/* Manual Device Clear Guide */}
        <div className="mt-12 space-y-3 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 font-mono text-xs text-[#A1A1A1]">
          <div className="font-medium tracking-[0.08em] text-white uppercase">
            Immediate On-Device Cache &amp; Storage Clearance
          </div>
          <p className="leading-relaxed">
            Because Imperial Tech applications store states locally on your device, you can
            immediately erase all data directly on Android without waiting:
          </p>
          <ol className="list-inside list-decimal space-y-1 pl-1 text-[#6B6B6B]">
            <li>
              Open Android <strong>Settings → Apps → Manage Apps</strong>.
            </li>
            <li>
              Select <strong>Universal Calculator World</strong>, <strong>Chess Pocket</strong>, or{" "}
              <strong>Sudoku</strong>.
            </li>
            <li>
              Tap <strong>Storage &amp; Cache</strong>.
            </li>
            <li>
              Tap <strong>Clear Storage / Clear Data</strong> to immediately wipe 100% of stored
              records.
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
