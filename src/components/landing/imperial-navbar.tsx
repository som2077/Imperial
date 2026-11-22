"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  Film,
  Subtitles,
  Crop,
  Video,
  Calendar,
  FileCode2,
  Bot,
  Zap,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Users,
  Radio,
  Megaphone,
  Building2,
  BookOpen,
  FileText,
  Layers,
  CheckCircle2,
} from "lucide-react";

export function ImperialNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<Record<string, boolean>>({
    product: false,
    solutions: false,
    resources: false,
  });

  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSection = (key: string) => {
    setMobileExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* 1. Top Announcement Bar (Opus.pro 4.0 Style) */}
      <div className="relative z-50 bg-[#0B0B12] border-b border-white/[0.06] text-xs text-zinc-300">
        <div className="container mx-auto flex items-center justify-center px-4 py-2 sm:px-6">
          <Link
            href="#features"
            className="group flex items-center gap-2 text-center transition-colors hover:text-white"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-2 py-0.5 text-[11px] font-medium text-violet-300 border border-violet-500/30">
              <Sparkles className="size-3 text-violet-400" />
              <span>Imperial 4.0</span>
            </span>
            <span className="font-medium text-zinc-200">
              Turn any footage into viral clips 10x faster.
            </span>
            <span className="hidden sm:inline-flex items-center text-violet-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              See what&apos;s new
              <ArrowRight className="size-3 ml-1" />
            </span>
          </Link>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#08080C]/85 backdrop-blur-xl shadow-2xl shadow-black/60"
            : "border-b border-white/[0.04] bg-[#08080C]/60 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo (Opus-style Icon + Wordmark) */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="relative flex size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-purple-500 p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-transform duration-300 group-hover:scale-105">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-black/40 backdrop-blur-xs">
                <Sparkles className="size-4 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-base font-bold tracking-tight text-white">
                Imperial<span className="text-violet-400">.pro</span>
              </span>
              <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-violet-400 border border-violet-500/20">
                PRO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex text-sm font-medium">
            {/* Dropdown: Product / Features */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("product")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "product"
                    ? "text-white bg-white/[0.06]"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                }`}
                aria-expanded={activeDropdown === "product"}
              >
                <span>Product</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === "product" ? "rotate-180 text-violet-400" : "text-zinc-400"
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {activeDropdown === "product" && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[720px] rounded-2xl border border-white/[0.08] bg-[#0E0E14]/95 p-6 shadow-2xl backdrop-blur-2xl ring-1 ring-black/50"
                  onMouseEnter={() => handleMouseEnter("product")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {/* Column 1: AI Creation */}
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-2 flex items-center justify-between">
                        <span>AI Video Creation</span>
                        <span className="text-[10px] text-violet-400 font-mono">v4.0 Engine</span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:bg-violet-500/20">
                            <Film className="size-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white group-hover:text-violet-300">
                                AI Clipping
                              </span>
                              <span className="rounded bg-violet-500/20 px-1.5 py-0.2 text-[9px] font-medium text-violet-300">
                                Popular
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Extract viral hooks & score footage automatically.
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-500/20">
                            <Subtitles className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-pink-300">
                              Animated Captions
                            </span>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Word-by-word dynamic subtitles, custom fonts & emojis.
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20">
                            <Crop className="size-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white group-hover:text-blue-300">
                                AI Auto-Reframe
                              </span>
                              <span className="rounded bg-blue-500/20 px-1.5 py-0.2 text-[9px] font-medium text-blue-300">
                                Updated
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Auto speaker tracking to 9:16 vertical in 1 click.
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500/20">
                            <Layers className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-amber-300">
                              AI B-Roll Generator
                            </span>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Context-aware cinematic b-roll overlays generated instantly.
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Workflows & Studio */}
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-3 mb-2 flex items-center justify-between">
                        <span>Workflow & Integration</span>
                        <span className="text-[10px] text-zinc-500 font-mono">Pro Studio</span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                            <Video className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-emerald-300">
                              Smart Video Editor
                            </span>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Timeline trimmer with auto silence & filler removal.
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-500/20">
                            <Calendar className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-purple-300">
                              Social Scheduler
                            </span>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Schedule and auto-post to TikTok, YouTube & Reels.
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20">
                            <FileCode2 className="size-4" />
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-cyan-300">
                              Export to XML
                            </span>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Direct export to Adobe Premiere Pro & DaVinci Resolve.
                            </p>
                          </div>
                        </Link>

                        <Link
                          href="/docs"
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                        >
                          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500/20">
                            <Bot className="size-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white group-hover:text-indigo-300">
                                Video API & MCP
                              </span>
                              <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-medium text-indigo-300">
                                New
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-zinc-400 leading-snug">
                              Video tools any AI agent workflow can call.
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Bottom Banner */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between px-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="size-3.5 text-violet-400" />
                      <span>Over 1,000,000+ viral clips generated worldwide</span>
                    </div>
                    <Link
                      href="#features"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 inline-flex items-center gap-1"
                    >
                      <span>Explore all capabilities</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown: Solutions */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "solutions"
                    ? "text-white bg-white/[0.06]"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                }`}
                aria-expanded={activeDropdown === "solutions"}
              >
                <span>Solutions</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === "solutions" ? "rotate-180 text-violet-400" : "text-zinc-400"
                  }`}
                />
              </button>

              {activeDropdown === "solutions" && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[340px] rounded-2xl border border-white/[0.08] bg-[#0E0E14]/95 p-3 shadow-2xl backdrop-blur-2xl"
                  onMouseEnter={() => handleMouseEnter("solutions")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="space-y-1">
                    <Link
                      href="#about"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        <Radio className="size-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-violet-300">
                          For Podcasters & Shows
                        </span>
                        <p className="text-xs text-zinc-400">
                          Turn 1-hour recordings into 10 viral clips.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#about"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
                        <Users className="size-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-pink-300">
                          For Content Creators
                        </span>
                        <p className="text-xs text-zinc-400">
                          Grow YouTube Shorts, TikTok & Reels.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#about"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Megaphone className="size-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-blue-300">
                          For Marketing Teams
                        </span>
                        <p className="text-xs text-zinc-400">
                          10x your brand presence across all channels.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="#about"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Building2 className="size-4" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white group-hover:text-emerald-300">
                          For Enterprise & Agencies
                        </span>
                        <p className="text-xs text-zinc-400">
                          Custom volume, SSO & dedicated security.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Link: Pricing */}
            <Link
              href="#pricing"
              className="px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              Pricing
            </Link>

            {/* Dropdown: Resources */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("resources")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "resources"
                    ? "text-white bg-white/[0.06]"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                }`}
                aria-expanded={activeDropdown === "resources"}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${
                    activeDropdown === "resources" ? "rotate-180 text-violet-400" : "text-zinc-400"
                  }`}
                />
              </button>

              {activeDropdown === "resources" && (
                <div
                  className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[280px] rounded-2xl border border-white/[0.08] bg-[#0E0E14]/95 p-3 shadow-2xl backdrop-blur-2xl"
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="space-y-1">
                    <Link
                      href="/docs"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <BookOpen className="size-4 text-violet-400" />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-violet-300">
                          Documentation
                        </div>
                        <div className="text-xs text-zinc-400">API guides & architecture</div>
                      </div>
                    </Link>

                    <Link
                      href="/blog"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <FileText className="size-4 text-pink-400" />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-pink-300">
                          Blog & Insights
                        </div>
                        <div className="text-xs text-zinc-400">Growth guides & tutorials</div>
                      </div>
                    </Link>

                    <Link
                      href="/changelog"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <Zap className="size-4 text-amber-400" />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-amber-300">
                          Changelog
                        </div>
                        <div className="text-xs text-zinc-400">What&apos;s new in v4.0</div>
                      </div>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <ExternalLink className="size-4 text-emerald-400" />
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-emerald-300">
                          Support & Contact
                        </div>
                        <div className="text-xs text-zinc-400">Talk to our engineering team</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons (Opus.pro Style) */}
          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-2 py-1"
            >
              Sign In
            </Link>

            {/* Signature Opus-style Glowing Gradient Pill Button */}
            <Link
              href="#pricing"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] active:scale-[0.98]"
            >
              <span>Try for Free</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              {/* Subtle inner light reflection */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="#pricing"
              className="inline-flex sm:hidden items-center rounded-full bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]"
            >
              Try Free
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] p-1.5 text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-white/[0.08] bg-[#0A0A0E]/98 px-6 py-6 backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col space-y-4">
              {/* Mobile Accordion: Product */}
              <div className="border-b border-white/[0.06] pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("product")}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="size-4 text-violet-400" />
                    <span>Product & Features</span>
                  </span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 transition-transform ${
                      mobileExpanded.product ? "rotate-180 text-violet-400" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.product && (
                  <div className="mt-3 space-y-2.5 pl-6">
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      AI Clipping & Hooks
                    </Link>
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      Animated Captions
                    </Link>
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      AI Auto-Reframe (9:16)
                    </Link>
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      AI B-Roll Generator
                    </Link>
                    <Link
                      href="#features"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      Social Scheduler
                    </Link>
                    <Link
                      href="/docs"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      Video API & MCP
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Solutions */}
              <div className="border-b border-white/[0.06] pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("solutions")}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-white"
                >
                  <span className="flex items-center gap-2">
                    <Users className="size-4 text-pink-400" />
                    <span>Solutions & Use Cases</span>
                  </span>
                  <ChevronDown
                    className={`size-4 text-zinc-400 transition-transform ${
                      mobileExpanded.solutions ? "rotate-180 text-violet-400" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.solutions && (
                  <div className="mt-3 space-y-2.5 pl-6">
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      For Podcasters & Shows
                    </Link>
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      For Content Creators
                    </Link>
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      For Marketing Teams
                    </Link>
                    <Link
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-zinc-300 hover:text-white"
                    >
                      For Enterprise & Agencies
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Links */}
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-white hover:text-violet-300 transition-colors"
              >
                Pricing
              </Link>

              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-white hover:text-violet-300 transition-colors"
              >
                Documentation
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-white hover:text-violet-300 transition-colors"
              >
                Blog & Changelog
              </Link>

              {/* Mobile CTA and Auth */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-full items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] text-xs font-semibold text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-xs font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
