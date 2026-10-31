"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Check, Copy } from "lucide-react";

export function VerificationContact() {
  const [copied, setCopied] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "Universal Calculator World Support",
    message: "",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.company.registeredAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="border-t border-[#1F1F1F] bg-black py-24 text-white md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-16 max-w-[700px]">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Contact &amp; Developer Support Desk
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            We&apos;re a small studio. You&apos;ll always talk to a real person.
          </h2>
          <p className="mt-4 text-base leading-[1.65] text-[#A1A1A1]">
            Official communication channels for Google Play Console organization verification,
            technical bug reports, user data deletion, grievance redressal, and developer licensing.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left Column: Official Support Channels & SLA */}
          <div className="space-y-6 lg:col-span-6">
            {/* Card 1: Registered Office Address */}
            <div className="space-y-3 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                  Physical Registered Address
                </span>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-[#A1A1A1] hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="size-3 text-white" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1 font-mono text-sm leading-relaxed text-white">
                {siteConfig.company.registeredAddress}
              </div>

              <p className="pt-1 text-xs text-[#6B6B6B]">
                Incorporated under the Companies Act, 2013, Ministry of Corporate Affairs, India.
              </p>
            </div>

            {/* Card 2: Support Service Levels (SLA) */}
            <div className="space-y-3 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
                <span className="font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                  Support Service Levels (SLA)
                </span>
                <span className="font-mono text-[10px] text-[#10b981]">MON–SAT 10AM–6PM IST</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#2E2E2E] text-[#8E8E8E]">
                      <th className="pb-2 font-medium">Request Type</th>
                      <th className="pb-2 font-medium">First Response</th>
                      <th className="pb-2 font-medium">Resolution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F] text-[#CCCCCC]">
                    <tr>
                      <td className="py-2 pr-2 text-white">Critical issues (crash/data loss)</td>
                      <td className="py-2 pr-2 font-mono text-[11px]">&lt; 24 hours</td>
                      <td className="py-2 font-mono text-[11px]">&le; 3 business days</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-2 text-white">General support &amp; bugs</td>
                      <td className="py-2 pr-2 font-mono text-[11px]">&lt; 48 hours</td>
                      <td className="py-2 font-mono text-[11px]">&le; 7 business days</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-2 text-white">Privacy &amp; data deletion</td>
                      <td className="py-2 pr-2 font-mono text-[11px]">&lt; 72 hours</td>
                      <td className="py-2 font-mono text-[11px]">&le; 30 days</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-2 text-white">Business &amp; licensing</td>
                      <td className="py-2 pr-2 font-mono text-[11px]">&le; 5 business days</td>
                      <td className="py-2 font-mono text-[11px]">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 3: Grievance Officer & Statutory Compliance */}
            <div className="space-y-3 rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <span className="block font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Grievance Officer (IT Act, 2000 &amp; DPDP Act, 2023)
              </span>

              <p className="text-xs leading-relaxed text-[#A1A1A1]">
                In accordance with the Information Technology Act, 2000 and the Digital Personal
                Data Protection Act, 2023, complaints about our Apps, Website, or data practices can
                be sent to our Grievance Officer:
              </p>

              <div className="space-y-1.5 font-mono text-xs text-white">
                <div>Designation: Grievance Officer, Imperial Tech O.P.C.</div>
                <div>
                  Email:{" "}
                  <a href={`mailto:${siteConfig.company.supportEmail}`} className="underline">
                    {siteConfig.company.supportEmail}
                  </a>
                </div>
                <div>Subject line format: Grievance – [App Name] – [Short Summary]</div>
                <div className="text-[#8E8E8E]">
                  Acknowledgement: &le; 48 hours • Resolution: &le; 15 days
                </div>
              </div>
            </div>

            {/* Card 4: Google Play Mandated Data Deletion */}
            <div className="space-y-3 rounded-[6px] border border-[#2E2E2E] bg-[#0A0A0A] p-6">
              <div className="font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Mandated User Data Deletion
              </div>

              <p className="text-xs leading-[1.6] text-[#A1A1A1]">
                Google Play policy mandates that users have the right to request permanent deletion
                of all data associated with their usage. Imperial Tech O.P.C. provides a dedicated
                deletion request portal processed within 30 days.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/delete-data"
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-white hover:underline"
                >
                  <span>User Data Deletion Portal</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                <a
                  href={`mailto:${siteConfig.company.supportEmail}?subject=Data%20Deletion%20Request`}
                  className="font-mono text-xs text-[#6B6B6B] hover:text-[#A1A1A1]"
                >
                  Direct Email Request →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Developer Support Desk Form */}
          <div className="lg:col-span-6">
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-8">
              <div className="mb-2 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
                Developer Desk
              </div>
              <h3 className="mb-6 text-xl font-medium text-white">
                Send a message to developer support
              </h3>

              {formSubmitted ? (
                <div className="space-y-3 py-8 text-center">
                  <div className="font-mono text-xs tracking-[0.08em] text-white uppercase">
                    ✔ Message Received
                  </div>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-[#A1A1A1]">
                    Thank you for contacting Imperial Tech O.P.C. An engineer will respond to{" "}
                    <strong>{formData.email}</strong> within 24–48 business hours.
                  </p>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "Universal Calculator World Support",
                        message: "",
                      });
                    }}
                    className="mt-4 font-mono text-xs text-white underline hover:opacity-80"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form suppressHydrationWarning onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-[#A1A1A1]">
                      Name
                    </label>
                    <input
                      suppressHydrationWarning
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Morgan"
                      style={{
                        background: "#0A0A0A",
                        border: "1px solid #2E2E2E",
                        borderRadius: "6px",
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-white transition-colors placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-[#A1A1A1]">
                      Email
                    </label>
                    <input
                      suppressHydrationWarning
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      style={{
                        background: "#0A0A0A",
                        border: "1px solid #2E2E2E",
                        borderRadius: "6px",
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-white transition-colors placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-[#A1A1A1]">
                      Category
                    </label>
                    <select
                      suppressHydrationWarning
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        background: "#0A0A0A",
                        border: "1px solid #2E2E2E",
                        borderRadius: "6px",
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-white transition-colors focus:border-white focus:outline-none"
                    >
                      <option value="Universal Calculator World Support">
                        Universal Calculator World Support
                      </option>
                      <option value="Chess Pocket Early Access / Feedback">
                        Chess Pocket Early Access / Feedback
                      </option>
                      <option value="Sudoku Daily Puzzle Feedback">
                        Sudoku Daily Puzzle Feedback
                      </option>
                      <option value="Google Play Developer Verification Inquiry">
                        Google Play Developer Verification Inquiry
                      </option>
                      <option value="Grievance Redressal Request">
                        Grievance Redressal Request
                      </option>
                      <option value="Business &amp; Partnership Inquiry">
                        Business &amp; Partnership Inquiry
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-[#A1A1A1]">
                      Message
                    </label>
                    <textarea
                      suppressHydrationWarning
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please include: app name, Android version &amp; device model, steps to reproduce, or details of your inquiry..."
                      style={{
                        background: "#0A0A0A",
                        border: "1px solid #2E2E2E",
                        borderRadius: "6px",
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-white transition-colors placeholder:text-[#6B6B6B] focus:border-white focus:outline-none"
                    />
                  </div>

                  <button
                    suppressHydrationWarning
                    type="submit"
                    style={{
                      background: "#FFFFFF",
                      color: "#000000",
                      borderRadius: "6px",
                    }}
                    className="w-full py-3 text-xs font-medium transition-opacity hover:opacity-85"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
