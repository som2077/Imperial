"use client";

import * as React from "react";
import { siteConfig } from "@/config/site";
import { Building2, ShieldCheck, HeartHandshake, Award, Globe, Sparkles } from "lucide-react";

export function AboutStudio() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Soft Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Corporate Identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-semibold text-primary backdrop-blur-xs shadow-2xs">
              <Building2 className="size-3.5" />
              <span>Corporate &amp; Studio Trust</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
              About Imperial Tech O.P.C.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Imperial Tech O.P.C.</strong> is a legally
                incorporated software development entity registered in India. Founded with a vision to
                create high-utility mobile tools and engaging tactical games, our studio operates on the
                fundamental belief that great software must be fast, reliable, and deeply respectful of
                user privacy.
              </p>

              <p>
                In an era where modern mobile applications are increasingly bloated with aggressive
                surveillance advertising, complex tracking SDKs, and artificial cloud dependencies,
                Imperial Tech O.P.C. takes a principled, privacy-first stand. We engineer lightweight,
                native experiences that respect your device resources, battery longevity, and personal
                boundaries.
              </p>
            </div>

            {/* 3 Core Values Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2.5">
                  <ShieldCheck className="size-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Privacy by Default</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Zero invasive tracking, no personal data sales, and strict offline storage.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
                <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-2.5">
                  <Award className="size-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Native Performance</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Sub-16ms frame times, 60 FPS animations, and instantaneous tactile touch feedback.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs">
                <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-2.5">
                  <HeartHandshake className="size-5" />
                </div>
                <h4 className="text-sm font-bold text-foreground">User-Centric Craft</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Minimalist interfaces designed for clarity, mindfulness, and practical utility.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Google Play Verification Credentials Box */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-primary/20 bg-linear-to-b from-primary/5 via-background to-background p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-3">
                <Sparkles className="size-4" />
                <span>Verified Legal Organization</span>
              </div>

              <h3 className="text-xl font-bold text-foreground">
                Google Play Console Developer Entity
              </h3>

              <div className="mt-6 space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground font-medium">Legal Entity Name</span>
                  <span className="font-semibold text-foreground">{siteConfig.company.legalName}</span>
                </div>

                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground font-medium">Corporate Structure</span>
                  <span className="font-semibold text-foreground">{siteConfig.company.legalType}</span>
                </div>

                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground font-medium">Jurisdiction</span>
                  <span className="font-semibold text-foreground">{siteConfig.company.country}</span>
                </div>

                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground font-medium">Official Support Email</span>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="font-semibold text-primary hover:underline"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </div>

                <div className="flex justify-between border-b border-border/60 pb-2.5">
                  <span className="text-muted-foreground font-medium">Support SLA</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {siteConfig.company.responseTimeSLA}
                  </span>
                </div>

                <div className="flex justify-between pt-1">
                  <span className="text-muted-foreground font-medium">Google Play Developer ID</span>
                  <span className="font-mono font-semibold text-foreground">
                    {siteConfig.company.googlePlayDeveloperId}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-card border border-border/60 p-3 text-[11px] text-muted-foreground leading-normal">
                <Globe className="size-3.5 inline-block text-primary mr-1" />
                Officially verified developer organization compliant with Google Play Console
                Developer Account registration and verification protocols.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
