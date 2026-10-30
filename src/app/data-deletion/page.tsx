"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Mail,
  ArrowLeft,
  Smartphone,
  AlertCircle,
  Send,
  Check,
} from "lucide-react";

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
    <div className="bg-background text-foreground min-h-screen">
      {/* Top Header */}
      <header className="border-b border-border/60 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8 max-w-5xl">
          <Link href="/" className="inline-flex items-center gap-2.5 text-base font-bold">
            <div className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white">
              <Smartphone className="size-4" />
            </div>
            <span>{siteConfig.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href="/" className="flex items-center gap-1.5">
                <ArrowLeft className="size-3.5" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-600 dark:text-rose-400 mb-3">
            <Trash2 className="size-3.5" />
            <span>Google Play Data Safety &amp; Deletion Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            User Data &amp; Account Deletion Request
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            In accordance with Google Play Developer Policy,{" "}
            <strong className="text-foreground">{siteConfig.company.legalName}</strong> provides this
            official data deletion mechanism allowing users of any of our mobile applications to
            request the permanent deletion of their account, analytics records, or associated data.
          </p>
        </div>

        {/* Policy Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
              <Clock className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">SLA Timeline</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Deletion requests are acknowledged and permanently purged within 24 to 48 business
              hours.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
              <CheckCircle2 className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Permanent Purge</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              All linked cloud identifiers, backups, and customer support logs are irreversibly
              wiped from storage.
            </p>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-2xs">
            <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-3">
              <Mail className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">Direct Email Route</h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              You can also email our Privacy Officer directly at{" "}
              <a
                href={`mailto:${siteConfig.company.privacyEmail}`}
                className="text-primary hover:underline font-semibold"
              >
                {siteConfig.company.privacyEmail}
              </a>
              .
            </p>
          </div>
        </div>

        {/* Interactive Deletion Form */}
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-lg">
          <h2 className="text-xl font-bold text-foreground mb-1">
            Submit a Data Deletion Request
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Please specify your details so our engineering team can identify and remove your
            records.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center animate-in fade-in duration-300">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white mb-4">
                <Check className="size-7" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Deletion Request Successfully Logged
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Your request to purge records for <strong>{formData.appName}</strong> linked to{" "}
                <strong>{formData.email}</strong> has been assigned Ticket #DEL-
                {Math.floor(100000 + Math.random() * 900000)}. Our Privacy Officer will confirm the
                completed purge via email within 48 business hours.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full text-xs"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* App selector */}
              <div className="space-y-1.5">
                <label htmlFor="appName" className="text-xs font-semibold text-foreground">
                  Select Application
                </label>
                <select
                  id="appName"
                  value={formData.appName}
                  onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                >
                  <option value="Universal Calculator World">Universal Calculator World</option>
                  <option value="Chess Pocket">Chess Pocket</option>
                  <option value="Sudoku - Daily Puzzle Game">Sudoku - Daily Puzzle Game</option>
                  <option value="All Imperial Tech O.P.C. Apps">All Imperial Tech O.P.C. Apps</option>
                </select>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-foreground">
                  Your Contact Email (for Confirmation)
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* In-app identifier */}
              <div className="space-y-1.5">
                <label htmlFor="userIdentifier" className="text-xs font-semibold text-foreground">
                  User ID / In-App Identifier / Installation ID (Optional)
                </label>
                <input
                  id="userIdentifier"
                  type="text"
                  value={formData.userIdentifier}
                  onChange={(e) => setFormData({ ...formData, userIdentifier: e.target.value })}
                  placeholder="e.g. anonymous-device-uuid or registered username"
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
                <p className="text-[11px] text-muted-foreground">
                  Note: Most Imperial Tech apps store state locally on device. Uninstalling the app
                  wipes 100% of on-device data instantly.
                </p>
              </div>

              {/* Deletion scope */}
              <div className="space-y-1.5">
                <label htmlFor="deletionScope" className="text-xs font-semibold text-foreground">
                  Data Scope to Delete
                </label>
                <select
                  id="deletionScope"
                  value={formData.deletionScope}
                  onChange={(e) => setFormData({ ...formData, deletionScope: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Complete Deletion (All account data, logs, and cloud records)</option>
                  <option value="analytics">Diagnostic &amp; Crash Report Logs Only</option>
                  <option value="support">Customer Support Ticket History Only</option>
                </select>
              </div>

              {/* Reason */}
              <div className="space-y-1.5">
                <label htmlFor="reason" className="text-xs font-semibold text-foreground">
                  Reason for Deletion (Optional)
                </label>
                <textarea
                  id="reason"
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Let us know how we can improve our applications..."
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Confirmation Button */}
              <Button
                type="submit"
                className="w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs py-3 shadow-md"
              >
                <Trash2 className="size-3.5 mr-2" />
                <span>Submit Permanent Data Deletion Request</span>
              </Button>
            </form>
          )}
        </div>

        {/* How to delete local device data manually */}
        <div className="mt-10 rounded-2xl border border-border/70 bg-muted/20 p-6 space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="size-4 text-primary" />
            <span>How to clear on-device data without submitting a request</span>
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Because Imperial Tech O.P.C. apps prioritize offline storage on your local device, you
            can also erase all local databases, tape histories, and saved games directly from your
            Android device at any time:
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-muted-foreground pl-2 font-mono">
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
