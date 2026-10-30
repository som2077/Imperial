"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Check, Copy, ArrowRight, ArrowUpRight } from "lucide-react";

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
    <section id="contact" className="py-24 md:py-32 bg-black text-white border-t border-[#1F1F1F]">
      <div className="container mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="max-w-[640px] mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-3">
            Google Play Organization Verification
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Legal &amp; Developer Contact
          </h2>
          <p className="mt-4 text-base text-[#A1A1A1] leading-[1.6]">
            Official channels for Google Play Console verification, physical correspondence, developer
            inquiries, and user data deletion requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Information Blocks */}
          <div className="lg:col-span-6 space-y-6">
            {/* Card 1: Registered Address */}
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B]">
                  Physical Registered Address
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="font-mono text-[11px] text-[#A1A1A1] hover:text-white inline-flex items-center gap-1"
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

              <div className="text-sm font-mono text-white leading-relaxed pt-1">
                {siteConfig.company.registeredAddress}
              </div>

              <p className="text-xs text-[#6B6B6B] pt-1">
                Incorporated under the Companies Act, Ministry of Corporate Affairs, India.
              </p>
            </div>

            {/* Card 2: Official Communication & Support SLA */}
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] block">
                Official Support Channels
              </span>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-[#6B6B6B]">General &amp; Technical Support:</span>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="text-white hover:underline"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </div>

                <div className="flex justify-between border-b border-[#1F1F1F] pb-2">
                  <span className="text-[#6B6B6B]">Privacy &amp; Data Protection:</span>
                  <a
                    href={`mailto:${siteConfig.company.privacyEmail}`}
                    className="text-white hover:underline"
                  >
                    {siteConfig.company.privacyEmail}
                  </a>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-[#6B6B6B]">Guaranteed SLA:</span>
                  <span className="text-white font-medium">{siteConfig.company.responseTimeSLA}</span>
                </div>
              </div>
            </div>

            {/* Card 3: Mandated User Data Deletion Request (Google Play Policy) */}
            <div className="rounded-[6px] border border-[#2E2E2E] bg-[#0A0A0A] p-6 space-y-3">
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B]">
                Mandated User Data Deletion (Google Play Compliance)
              </div>

              <p className="text-xs text-[#A1A1A1] leading-[1.6]">
                Google Play policy mandates that users have the right to request permanent deletion
                of all data associated with their usage. Imperial Tech O.P.C. provides a dedicated
                deletion request portal processed within 48 hours.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/data-deletion"
                  className="group inline-flex items-center gap-1.5 text-xs font-medium text-white hover:underline"
                >
                  <span>User Data Deletion Portal</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>

                <a
                  href={`mailto:${siteConfig.company.privacyEmail}?subject=User%20Data%20Deletion%20Request`}
                  className="text-xs font-mono text-[#6B6B6B] hover:text-[#A1A1A1]"
                >
                  Direct Email Request →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Support Form (design.md input specs) */}
          <div className="lg:col-span-6">
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-8">
              <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-2">
                Engineering Desk
              </div>
              <h3 className="text-xl font-medium text-white mb-6">
                Send a message to developer support
              </h3>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="font-mono text-xs uppercase tracking-[0.08em] text-white">
                    ✔ Message Received
                  </div>
                  <p className="text-xs text-[#A1A1A1] max-w-sm mx-auto leading-relaxed">
                    Thank you for contacting Imperial Tech O.P.C. An engineer will respond to{" "}
                    <strong>{formData.email}</strong> within 24–48 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "Universal Calculator World Support",
                        message: "",
                      });
                    }}
                    className="mt-4 text-xs font-mono text-white underline hover:opacity-80"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-[#A1A1A1]">
                      Name
                    </label>
                    <input
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
                      className="w-full px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-[#A1A1A1]">
                      Email
                    </label>
                    <input
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
                      className="w-full px-3.5 py-2.5 text-xs text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-[#A1A1A1]">
                      Category
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      style={{
                        background: "#0A0A0A",
                        border: "1px solid #2E2E2E",
                        borderRadius: "6px",
                      }}
                      className="w-full px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Universal Calculator World Support">
                        Universal Calculator World Support
                      </option>
                      <option value="Chess Pocket Early Access / Feedback">
                        Chess Pocket Early Access / Feedback
                      </option>
                      <option value="Sudoku - Daily Puzzle Beta Testing">
                        Sudoku - Daily Puzzle Beta Testing
                      </option>
                      <option value="Google Play Developer Verification Inquiry">
                        Google Play Developer Verification Inquiry
                      </option>
                      <option value="User Data Deletion Request">
                        User Data Deletion Request
                      </option>
                      <option value="General Corporate Inquiry">
                        General Corporate Inquiry
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-[#A1A1A1]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Enter details of your inquiry or feedback..."
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
