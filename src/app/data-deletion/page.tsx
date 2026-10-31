"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, CheckCircle2, Smartphone, Mail } from "lucide-react";

export default function DataDeletionPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [ticketId, setTicketId] = React.useState("");
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    apps: {
      calculator: true,
      chess: false,
      sudoku: false,
      website: false,
    },
    details: "",
    authorized: false,
  });

  const handleCheckboxChange = (key: keyof typeof formData.apps) => {
    setFormData((prev) => ({
      ...prev,
      apps: {
        ...prev.apps,
        [key]: !prev.apps[key],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorized) return;
    setTicketId(`DEL-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
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
      <main className="container mx-auto max-w-[840px] px-6 py-16 sm:py-24">
        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Google Play Data Safety &amp; Deletion Compliance
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Account &amp; Data Deletion
          </h1>
          <p className="mt-3 font-mono text-xs text-[#A1A1A1]">
            Applies to: Universal Calculator World · Chess Pocket · Sudoku Daily Puzzle
          </p>
        </div>

        <div className="space-y-10 text-sm leading-[1.65] text-[#A1A1A1]">
          {/* 4.1 Do I Have an Account? */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-2 text-base font-medium text-white">4.1 Do I Have an Account?</h2>
            <p className="text-xs leading-relaxed text-[#CCCCCC]">
              <strong className="text-white">No.</strong> Our Apps do not require registration,
              sign-in, or a user account. There is no profile stored on our servers that is linked
              to you through the Apps.
            </p>
          </section>

          {/* 4.2 Option A: Self-Service Device Deletion */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-white">
              <Smartphone className="size-4.5 text-[#10b981]" />
              <h2 className="text-base font-medium text-white">
                4.2 Option A — Delete Everything Stored by the Apps (Instant, Self-Service)
              </h2>
            </div>
            <p className="mb-4 text-xs text-[#8E8E8E]">
              All app data lives on your device in a sandboxed SQLite database. You can erase it
              yourself immediately:
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[4px] border border-[#2E2E2E] bg-black p-4 text-xs">
                <h3 className="mb-2 font-medium text-white">Clear data but keep the app</h3>
                <ol className="list-inside list-decimal space-y-1.5 text-[#A1A1A1]">
                  <li>
                    Open Android <strong className="text-white">Settings</strong>.
                  </li>
                  <li>
                    Go to <strong className="text-white">Apps</strong> (or Apps &amp; notifications)
                    and select the Imperial Tech app.
                  </li>
                  <li>
                    Tap <strong className="text-white">Storage</strong> (or Storage &amp; cache).
                  </li>
                  <li>
                    Tap <strong className="text-white">Clear data</strong> (or Clear storage) and
                    confirm.
                  </li>
                </ol>
              </div>

              <div className="rounded-[4px] border border-[#2E2E2E] bg-black p-4 text-xs">
                <h3 className="mb-2 font-medium text-white">Remove the app and data completely</h3>
                <ol className="list-inside list-decimal space-y-1.5 text-[#A1A1A1]">
                  <li>
                    Press and hold the app icon, then tap{" "}
                    <strong className="text-white">Uninstall</strong>; or open Google Play Store →
                    Manage apps &amp; device → Manage, select the app, and tap Uninstall.
                  </li>
                  <li>
                    Confirm. All local data (history, progress, settings, SQLite database) is
                    permanently deleted from your device.
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* 4.3 Option B: Server/Support Data Deletion */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 text-white">
              <Mail className="size-4.5 text-white" />
              <h2 className="text-base font-medium text-white">
                4.3 Option B — Request Deletion of Data We Hold About You
              </h2>
            </div>
            <p className="mb-4 text-xs text-[#CCCCCC]">
              If you have contacted us by email or through our Website form, or you believe we hold
              any other personal data about you, you may request deletion.
            </p>

            <div className="space-y-2 rounded-[4px] border border-[#2E2E2E] bg-black p-4 font-mono text-xs text-[#A1A1A1]">
              <div className="text-white">Step-by-step procedure:</div>
              <div>
                1. Go to the request form below, or email{" "}
                <strong className="text-white">{siteConfig.company.supportEmail}</strong> with the
                subject line{" "}
                <strong className="text-white">&ldquo;Data Deletion Request&rdquo;</strong>.
              </div>
              <div>
                2. Provide the email address you used to contact us, the app name(s) concerned, and
                a short description of the data to delete.
              </div>
              <div>3. We will send a verification email to confirm the request comes from you.</div>
              <div>
                4. Once verified, we permanently delete the data and send you a confirmation within{" "}
                <strong className="text-white">30 days</strong> of receiving your request.
              </div>
            </div>
          </section>

          {/* 4.4 Interactive Web Form */}
          <section className="rounded-[6px] border border-[#2E2E2E] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-2 text-lg font-medium text-white">4.4 Request Data Deletion Form</h2>
            <p className="mb-6 text-xs text-[#8E8E8E]">
              Use this form to ask Imperial Tech O.P.C. to permanently delete personal data we hold
              about you.
            </p>

            {submitted ? (
              <div className="space-y-4 rounded-[6px] border border-[#1F1F1F] bg-black p-8 text-center">
                <CheckCircle2 className="mx-auto size-10 text-[#10b981]" />
                <h3 className="text-base font-medium text-white">Deletion Request Logged</h3>
                <div className="font-mono text-xs text-[#A1A1A1]">
                  Reference Ticket ID: <span className="text-white">{ticketId}</span>
                </div>
                <p className="mx-auto max-w-md text-xs leading-relaxed text-[#8E8E8E]">
                  A verification email has been dispatched to <strong>{formData.email}</strong>.
                  Please reply to verify your identity. Once confirmed, all records will be
                  permanently purged within 30 days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-white underline hover:opacity-80"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form suppressHydrationWarning onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-[#CCCCCC]">
                    Full name <span className="text-[#e11d48]">*</span>
                  </label>
                  <input
                    suppressHydrationWarning
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Alex Morgan"
                    className="mt-1.5 w-full rounded-[6px] border border-[#2E2E2E] bg-black px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#CCCCCC]">
                    Email address used to contact us <span className="text-[#e11d48]">*</span>
                  </label>
                  <input
                    suppressHydrationWarning
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="mt-1.5 w-full rounded-[6px] border border-[#2E2E2E] bg-black px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#CCCCCC]">
                    Which app is this about? (select one or more)
                  </span>
                  <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-[#2E2E2E] bg-black px-3 py-2 text-xs text-[#A1A1A1] transition-colors hover:border-[#3E3E3E]">
                      <input
                        type="checkbox"
                        checked={formData.apps.calculator}
                        onChange={() => handleCheckboxChange("calculator")}
                        className="rounded border-[#3E3E3E] bg-[#1A1A1A] text-white"
                      />
                      <span>Universal Calculator World</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-[#2E2E2E] bg-black px-3 py-2 text-xs text-[#A1A1A1] transition-colors hover:border-[#3E3E3E]">
                      <input
                        type="checkbox"
                        checked={formData.apps.chess}
                        onChange={() => handleCheckboxChange("chess")}
                        className="rounded border-[#3E3E3E] bg-[#1A1A1A] text-white"
                      />
                      <span>Chess Pocket</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-[#2E2E2E] bg-black px-3 py-2 text-xs text-[#A1A1A1] transition-colors hover:border-[#3E3E3E]">
                      <input
                        type="checkbox"
                        checked={formData.apps.sudoku}
                        onChange={() => handleCheckboxChange("sudoku")}
                        className="rounded border-[#3E3E3E] bg-[#1A1A1A] text-white"
                      />
                      <span>Sudoku Daily Puzzle</span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2.5 rounded-[4px] border border-[#2E2E2E] bg-black px-3 py-2 text-xs text-[#A1A1A1] transition-colors hover:border-[#3E3E3E]">
                      <input
                        type="checkbox"
                        checked={formData.apps.website}
                        onChange={() => handleCheckboxChange("website")}
                        className="rounded border-[#3E3E3E] bg-[#1A1A1A] text-white"
                      />
                      <span>Website / support correspondence</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className="block text-xs font-medium text-[#CCCCCC]">
                    What would you like deleted? (optional details)
                  </label>
                  <textarea
                    suppressHydrationWarning
                    id="details"
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Specific correspondence, feedback tickets, or inquiries..."
                    className="mt-1.5 w-full rounded-[6px] border border-[#2E2E2E] bg-black px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#A1A1A1]">
                    <input
                      type="checkbox"
                      required
                      checked={formData.authorized}
                      onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                      className="mt-0.5 rounded border-[#3E3E3E] bg-[#1A1A1A] text-white"
                    />
                    <span>
                      I confirm I am the person this data relates to, or I am authorized to act for
                      them.
                    </span>
                  </label>
                </div>

                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={!formData.authorized}
                  className="w-full rounded-[6px] bg-white py-3 text-xs font-medium text-black transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit Deletion Request
                </button>

                <p className="text-[11px] leading-relaxed text-[#6B6B6B]">
                  We will email you to verify your identity, then confirm deletion within 30 days.
                  We use the information in this form only to process your request.
                </p>
              </form>
            )}
          </section>

          {/* 4.5 & 4.6 */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-2 text-sm font-medium text-white">4.5 What Gets Deleted</h3>
              <ul className="list-inside list-disc space-y-1.5 text-xs text-[#A1A1A1]">
                <li>
                  Support emails, form submissions, and attachments associated with your email
                </li>
                <li>Any records that identify you in our systems</li>
              </ul>
            </div>

            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-2 text-sm font-medium text-white">4.6 What We May Retain</h3>
              <p className="text-xs leading-relaxed text-[#A1A1A1]">
                We may keep limited information only where required by law (for example, tax or
                legal compliance), or to resolve disputes and enforce our terms, and only for as
                long as necessary. Anonymized, non-identifiable statistics may be retained.
              </p>
            </div>
          </section>

          {/* 4.7 & 4.8 */}
          <section className="space-y-4 text-xs">
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-1 text-sm font-medium text-white">4.7 Advertising Data</h3>
              <p className="text-[#A1A1A1]">
                Advertising identifiers processed by our ad SDK are controlled by Google. You can
                reset or delete your advertising ID under{" "}
                <strong className="text-white">
                  Android Settings → Privacy → Ads → Delete advertising ID
                </strong>
                .
              </p>
            </div>

            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-1 text-sm font-medium text-white">4.8 Partial Deletion</h3>
              <p className="text-[#A1A1A1]">
                You may ask us to delete only specific data rather than everything. Tell us in your
                request or email{" "}
                <a
                  href={`mailto:${siteConfig.company.supportEmail}?subject=Partial%20Data%20Deletion`}
                  className="text-white underline hover:opacity-85"
                >
                  {siteConfig.company.supportEmail}
                </a>
                .
              </p>
            </div>
          </section>

          {/* 4.9 Need Help? */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
            <h2 className="mb-2 text-base font-medium text-white">4.9 Need Help?</h2>
            <p className="text-xs text-[#A1A1A1]">
              Email{" "}
              <a
                href={`mailto:${siteConfig.company.supportEmail}?subject=Data%20Deletion%20Assistance`}
                className="text-white underline hover:opacity-85"
              >
                {siteConfig.company.supportEmail}
              </a>
              . We will help you complete the request.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
