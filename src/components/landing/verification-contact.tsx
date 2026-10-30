"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Trash2,
  Copy,
  Check,
  Send,
  Building,
  ArrowRight,
  FileText,
} from "lucide-react";

export function VerificationContact() {
  const [copied, setCopied] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "App Feedback / Support Inquiry",
    message: "",
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(siteConfig.company.registeredAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-semibold text-primary backdrop-blur-xs mb-3 shadow-2xs">
            <ShieldCheck className="size-3.5" />
            <span>Google Play Organization Compliance</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Legal &amp; Developer Contact
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Imperial Tech O.P.C. provides verified channels for user support, official developer
            inquiries, physical corporate correspondence, and Google Play Data Deletion requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Corporate Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Card 1: Physical Registered Office Address */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm transition-all hover:border-primary/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Physical Registered Corporate Address
                    </h3>
                    <p className="text-xs text-muted-foreground">Officially Incorporated in India</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyAddress}
                  className="size-8 rounded-lg"
                  title="Copy physical address"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4 text-muted-foreground" />
                  )}
                </Button>
              </div>

              <div className="mt-4 rounded-xl bg-muted/40 p-3.5 text-xs font-mono text-foreground leading-relaxed">
                {siteConfig.company.registeredAddress}
              </div>

              <p className="mt-3 text-[11px] text-muted-foreground">
                Official entity registered with the Ministry of Corporate Affairs (MCA), Government
                of India.
              </p>
            </div>

            {/* Card 2: Official Support Email & SLA */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm transition-all hover:border-primary/30">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Official Developer &amp; Customer Support
                  </h3>
                  <p className="text-xs text-muted-foreground">Guaranteed SLA response</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">General &amp; Technical Support:</span>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Developer Account Inquiries:</span>
                  <a
                    href={`mailto:${siteConfig.company.developerEmail}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {siteConfig.company.developerEmail}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Privacy &amp; Data Protection Officer:</span>
                  <a
                    href={`mailto:${siteConfig.company.privacyEmail}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {siteConfig.company.privacyEmail}
                  </a>
                </div>
                <div className="flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Clock className="size-3.5 text-emerald-500" /> Response Time Guarantee:
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {siteConfig.company.responseTimeSLA}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Mandated User Data Deletion Banner */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Trash2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    User Data Deletion Request (Google Play Policy)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Complete data control &amp; transparency
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                In strict compliance with Google Play Developer Data Safety requirements, all users
                have the legal right to request the permanent deletion of their account records,
                cloud saves, or associated identifiers.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full border-rose-500/30 text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 text-xs font-semibold"
                >
                  <Link href="/data-deletion" className="flex items-center gap-1.5">
                    <span>Visit Data Deletion Portal</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>

                <a
                  href={`mailto:${siteConfig.company.privacyEmail}?subject=User%20Data%20Deletion%20Request`}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Or Email Privacy Officer Directly
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Developer Support Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Building className="size-4 text-primary" />
                <h3 className="text-lg font-bold text-foreground">
                  Send a Message to Engineering Support
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the form below. Our development team in India will review and respond within
                24–48 business hours.
              </p>

              {formSubmitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-in fade-in duration-300">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500 text-white mb-3">
                    <Check className="size-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">
                    Support Inquiry Received
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground max-w-sm mx-auto">
                    Thank you for reaching out to <strong>Imperial Tech O.P.C.</strong> A support
                    engineer will reply to <strong>{formData.email}</strong> within 24–48 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        subject: "App Feedback / Support Inquiry",
                        message: "",
                      });
                    }}
                    className="mt-4 rounded-full text-xs"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-foreground">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-foreground">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-foreground">
                      Inquiry Category
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                    >
                      <option value="Universal Calculator World Support">
                        Universal Calculator World Support
                      </option>
                      <option value="Chess Pocket Early Access / Feedback">
                        Chess Pocket Early Access / Feedback
                      </option>
                      <option value="Sudoku - Daily Beta Testing">Sudoku - Daily Beta Testing</option>
                      <option value="Google Play Developer Verification Inquiry">
                        Google Play Developer Verification Inquiry
                      </option>
                      <option value="User Data Deletion Request">User Data Deletion Request</option>
                      <option value="General Studio Business Contact">
                        General Studio Business Contact
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your question, bug report, or verification request..."
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold text-xs py-2.5 shadow-sm"
                  >
                    <Send className="size-3.5 mr-2" />
                    <span>Submit Inquiry</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
