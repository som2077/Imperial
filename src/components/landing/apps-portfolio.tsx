"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Crown,
  Gamepad2,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  DownloadCloud,
  ChevronRight,
  Star,
  Cpu,
  Lock,
} from "lucide-react";

export function AppsPortfolio() {
  return (
    <section id="portfolio" className="relative py-20 md:py-28 bg-muted/20">
      {/* Background Subtle Mesh Blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-purple-500/10 blur-[130px]"
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-1 text-xs font-semibold text-primary backdrop-blur-xs mb-3 shadow-2xs">
            <Sparkles className="size-3.5" />
            <span>Our Mobile Ecosystem</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Featured Studio Portfolio
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Engineered with native platform technologies, instant responsiveness, and zero privacy
            trade-offs. Explore the apps developed and maintained by{" "}
            <strong className="text-foreground">Imperial Tech O.P.C.</strong>
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="space-y-12">
          {siteConfig.apps.map((app, index) => {
            const isLive = app.badgeVariant === "live";
            const isComingSoon = app.badgeVariant === "coming_soon";
            const isTesting = app.badgeVariant === "testing";

            return (
              <div
                key={app.id}
                className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 sm:p-8 lg:p-10 shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-xl"
              >
                {/* Accent Top Border Gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${app.gradient}`}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Metadata & Features */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Badge & Category */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {isLive && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="size-3.5" />
                          <span>{app.badge}</span>
                        </span>
                      )}
                      {isComingSoon && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-500/20">
                          <Sparkles className="size-3.5" />
                          <span>{app.badge}</span>
                        </span>
                      )}
                      {isTesting && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Zap className="size-3.5" />
                          <span>{app.badge}</span>
                        </span>
                      )}
                      <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                        {app.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{app.version}</span>
                    </div>

                    {/* App Title & Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {app.name}
                      </h3>
                      <p className="text-sm sm:text-base font-medium text-foreground/80 mt-1">
                        {app.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {app.description}
                    </p>

                    {/* Key Feature Bullets */}
                    <div className="space-y-2 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Core Capabilities
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground/90">
                        {app.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-4 shrink-0 text-primary mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Privacy & Tech Tags */}
                    <div className="pt-2 flex flex-wrap gap-2 items-center">
                      <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                        <Lock className="size-3" /> Privacy:
                      </span>
                      {app.privacyHighlights.map((priv, pIdx) => (
                        <span
                          key={pIdx}
                          className="rounded-md bg-muted/60 border border-border/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {priv}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      {app.playStoreUrl && (
                        <Button
                          asChild
                          className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium px-5 text-xs shadow-sm"
                        >
                          <a
                            href={app.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <span>View on Google Play</span>
                            <ExternalLink className="size-3.5" />
                          </a>
                        </Button>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full text-xs font-medium"
                      >
                        <Link href="#contact" className="flex items-center gap-1.5">
                          <span>Developer Support</span>
                          <ChevronRight className="size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Visual Tech Showcase Card */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-2xl border border-border/80 bg-background/90 p-6 shadow-md backdrop-blur-sm">
                      <div className="flex items-center justify-between pb-4 border-b border-border/50">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex size-12 items-center justify-center rounded-2xl ${app.iconBg} shadow-xs`}
                          >
                            {app.id === "universal-calculator" && (
                              <Calculator className="size-6 text-blue-600 dark:text-blue-400" />
                            )}
                            {app.id === "chess-pocket" && (
                              <Crown className="size-6 text-purple-600 dark:text-purple-400" />
                            )}
                            {app.id === "sudoku-puzzle" && (
                              <Gamepad2 className="size-6 text-amber-600 dark:text-amber-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-foreground">{app.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <span className="flex size-1.5 rounded-full bg-emerald-500" />
                              <span>{app.downloads}</span>
                              {app.rating && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center text-amber-500 font-semibold">
                                    <Star className="size-3 fill-amber-500 mr-0.5" /> {app.rating}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technical Architecture Specs */}
                      <div className="mt-4 space-y-3">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu className="size-3.5" />
                          <span>Engineering Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {app.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded-lg bg-accent/60 border border-border/60 px-2.5 py-1 text-xs font-mono font-medium text-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Google Play Policy Check */}
                      <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                        <div className="flex items-center gap-1.5 font-bold">
                          <ShieldCheck className="size-4" />
                          <span>Google Play Verified Data Safety</span>
                        </div>
                        <p className="mt-1 text-[11px] text-muted-foreground leading-normal">
                          Strictly adheres to Google Play developer standards. Zero background location,
                          no contact book access, and offline data isolation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
