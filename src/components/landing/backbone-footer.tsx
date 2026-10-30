"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function BackboneFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer
      className="relative w-full bg-black text-white"
      style={{ backgroundColor: "#000000", color: "#ffffff", padding: "70px 0 24px" }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. Top Help & Support Bar (Backbone style & layout) */}
        <div className="mb-[70px] flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:support@imperialtech.me"
            className="text-2xl font-normal tracking-tight text-white transition-colors hover:text-white/80"
          >
            Need help choosing the right template?
          </a>
          <a
            href="mailto:support@imperialtech.me"
            className="group flex items-center gap-4 text-2xl font-normal tracking-tight text-white transition-colors hover:text-white/80"
          >
            <span>Get Support</span>
            {/* Backbone Signature 51px Horizontal Arrow */}
            <svg
              width="51"
              height="16"
              viewBox="0 0 51 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M50.7071 8.70711C51.0976 8.31659 51.0976 7.68342 50.7071 7.2929L44.3431 0.928936C43.9526 0.538412 43.3195 0.538412 42.9289 0.928936C42.5384 1.31946 42.5384 1.95263 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 8L-8.74228e-08 9L50 9L50 8L50 7L8.74228e-08 7L0 8Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        {/* 2. Giant Edge-to-Edge Imperial Tech Vector Wordmark */}
        <div className="mb-[66px] w-full overflow-hidden select-none">
          <svg
            viewBox="0 0 1393 195"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            aria-label="Imperial Tech wordmark"
            className="block h-auto w-full"
          >
            <text
              x="50%"
              y="152"
              textAnchor="middle"
              fill="white"
              fontSize="158"
              fontWeight="900"
              letterSpacing="-0.035em"
              style={{
                fontFamily:
                  "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Roboto, sans-serif",
                textTransform: "uppercase",
              }}
            >
              IMPERIAL TECH
            </text>
          </svg>
        </div>

        {/* 3. Middle Section: Newsletter on Left, 4 Menu Columns on Right */}
        <div className="mb-20 flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-8">
          {/* Left Column: Stay connected (Backbone Newsletter) */}
          <div className="w-full shrink-0 lg:max-w-[420px]">
            <div className="mb-2 flex items-center gap-2.5">
              {/* Backbone signature orange starburst SVG */}
              <svg
                width="24"
                height="18"
                viewBox="0 0 28 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="presentation"
                className="shrink-0"
              >
                <path
                  d="M28 10L26.0598 9.1886C21.6724 7.34649 17.748 4.45175 14.6835 0.811404L14 0L13.3165 0.811404C10.252 4.45175 6.32756 7.34649 1.94016 9.1886L0 10L1.94016 10.8114C6.32756 12.6535 10.252 15.5482 13.3165 19.1886L14 20L14.6835 19.1886C17.748 15.5482 21.6724 12.6535 26.0598 10.8114L28 10Z"
                  fill="#F15623"
                />
              </svg>
              <h3 className="text-[22px] font-medium tracking-tight text-white">Stay connected</h3>
            </div>
            <p className="mb-5 max-w-[340px] text-[16px] leading-snug font-normal text-white">
              Unlock access to template updates, feature drops, and exclusive founder discounts.
            </p>

            {subscribed ? (
              <div className="rounded-[3px] border border-white/20 bg-white/10 px-4 py-3 text-sm text-white">
                Thank you for subscribing! Check your inbox for updates.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-[380px]">
                <div className="flex items-center gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="h-[48px] flex-1 rounded-[3px] border border-white bg-black px-4 text-[15px] text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-[48px] w-[48px] shrink-0 cursor-pointer items-center justify-center rounded-[3px] bg-white text-black transition-colors hover:bg-neutral-200"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                    >
                      <path
                        d="M9.5 6.00048L3.82588 12L2.50092 10.599L6.84915 6.00048L2.5 1.40192L3.82497 0L9.5 6.00048Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            )}

            <p className="mt-2.5 text-[11px] text-white/70">
              Information collected will be used as described in our{" "}
              <Link
                href="/privacy"
                className="font-medium text-white underline hover:text-white/80"
              >
                Privacy Policy.
              </Link>
            </p>
          </div>

          {/* Right Columns: 4-Column Navigation Grid Tailored to Imperial Tech & Templates */}
          <div className="ml-auto flex flex-wrap gap-8 sm:flex-nowrap sm:gap-10 lg:gap-14 xl:gap-16">
            {/* Column 1: Products */}
            <div className="min-w-[110px]">
              <div className="mb-3 text-[13px] font-medium text-white">Products</div>
              <ul className="space-y-1.5 text-[13px] text-white/70">
                <li>
                  <a href="#pricing" className="block transition-colors hover:text-white">
                    All Templates
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="block transition-colors hover:text-white">
                    Web SaaS Kit ($50)
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="block transition-colors hover:text-white">
                    Mobile App Kit ($50)
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="block transition-colors hover:text-white">
                    All-in-One Bundle ($80)
                  </a>
                </li>
                <li>
                  <Link href="/claim" className="block transition-colors hover:text-white">
                    Claim License Key
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="block transition-colors hover:text-white">
                    Live Demo App
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/ai-studio"
                    className="block transition-colors hover:text-white"
                  >
                    AI Studio Copilot
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Supported Stacks */}
            <div className="min-w-[130px]">
              <div className="mb-3 text-[13px] font-medium text-white">Supported Stacks</div>
              <ul className="space-y-1.5 text-[13px] text-white/70">
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    Next.js 16 (App Router)
                  </span>
                </li>
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    Expo SDK 57 (Hermes)
                  </span>
                </li>
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    React Native 0.86
                  </span>
                </li>
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    Supabase SSR Auth
                  </span>
                </li>
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    Drizzle ORM &amp; Postgres
                  </span>
                </li>
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    Lemon Squeezy (Web MoR)
                  </span>
                </li>
                <li>
                  <span className="block cursor-default transition-colors hover:text-white">
                    RevenueCat v10 (In-App)
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Documentation */}
            <div className="min-w-[140px]">
              <div className="mb-3 text-[13px] font-medium text-white">Documentation</div>
              <ul className="space-y-1.5 text-[13px] text-white/70">
                <li>
                  <Link href="/docs" className="block transition-colors hover:text-white">
                    Documentation Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs/getting-started"
                    className="block transition-colors hover:text-white"
                  >
                    Quick Start Guide
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="block transition-colors hover:text-white">
                    Release Changelog
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="block transition-colors hover:text-white">
                    Upstream Sync Guide
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/som2077/saas-kit-website/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-white"
                  >
                    GitHub Discussions
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/som2077/saas-kit-website/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-white"
                  >
                    GitHub Issue Tracker
                  </a>
                </li>
                <li>
                  <Link
                    href="/api/v1/license/verify"
                    className="block transition-colors hover:text-white"
                  >
                    License Verification API
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Imperial Tech */}
            <div className="min-w-[140px]">
              <div className="mb-3 text-[13px] font-medium text-white">Imperial Tech</div>
              <ul className="space-y-1.5 text-[13px] text-white/70">
                <li>
                  <a
                    href="https://imperialtech.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-white"
                  >
                    About Imperial Tech
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@imperialtech.me"
                    className="block transition-colors hover:text-white"
                  >
                    Contact &amp; Support
                  </a>
                </li>
                <li>
                  <Link href="/claim" className="block transition-colors hover:text-white">
                    Order &amp; License Claim
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="block transition-colors hover:text-white">
                    Engineering Blog
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="block transition-colors hover:text-white">
                    Commercial License Agreement
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="block transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="block transition-colors hover:text-white">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="block transition-colors hover:text-white">
                    Security &amp; Compliance
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/som2077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-white"
                  >
                    GitHub Profile
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-colors hover:text-white"
                  >
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a href="/sitemap.xml" className="block transition-colors hover:text-white">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Country/Region Selector & Imperial Tech Social Icons */}
        <div className="flex flex-col items-start justify-between gap-6 pb-8 sm:flex-row sm:items-center">
          {/* Country/Region Button (#1a1a1a rounded-[4px] 236px) */}
          <div className="inline-flex h-[40px] w-[236px] items-center justify-between rounded-[4px] bg-[#1a1a1a] px-4 text-[14px] text-white select-none">
            <span>United States (USD)</span>
            <svg
              className="size-2.5 -rotate-90 fill-current text-neutral-400"
              viewBox="0 0 10 6"
              role="presentation"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Social Media Links (Exact Backbone SVG paths & #787878 palette) */}
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-5" role="list">
              {/* Discord */}
              <li>
                <a
                  href={siteConfig.socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord"
                  className="block text-[#787878] transition-colors hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="presentation"
                  >
                    <path
                      d="M433.713 90.1932C400.57 74.6866 365.132 63.417 328.083 57C323.533 65.2264 318.217 76.291 314.552 85.0929C275.168 79.17 236.146 79.17 197.486 85.0929C193.822 76.291 188.385 65.2264 183.794 57C146.705 63.417 111.227 74.728 78.0841 90.2753C11.235 191.293 -6.88664 289.802 2.17422 386.911C46.512 420.022 89.4807 440.135 131.724 453.297C142.154 438.942 151.457 423.683 159.47 407.601C144.208 401.801 129.59 394.644 115.778 386.336C119.442 383.621 123.026 380.783 126.489 377.863C210.735 417.266 302.27 417.266 385.509 377.863C389.013 380.783 392.596 383.621 396.221 386.336C382.368 394.685 367.709 401.842 352.447 407.642C360.461 423.683 369.723 438.984 380.193 453.338C422.477 440.176 465.486 420.063 509.824 386.911C520.456 274.336 491.662 176.732 433.713 90.1932ZM170.948 327.19C145.658 327.19 124.918 303.58 124.918 274.83C124.918 246.079 145.215 222.429 170.948 222.429C196.681 222.429 217.42 246.038 216.977 274.83C217.017 303.58 196.681 327.19 170.948 327.19ZM341.05 327.19C315.761 327.19 295.021 303.58 295.021 274.83C295.021 246.079 315.317 222.429 341.05 222.429C366.783 222.429 387.523 246.038 387.08 274.83C387.08 303.58 366.783 327.19 341.05 327.19Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>

              {/* GitHub */}
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="block text-[#787878] transition-colors hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="block text-[#787878] transition-colors hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path d="M256 46.13c68.36 0 76.45.26 103.45 1.49 24.96 1.14 38.51 5.31 47.53 8.81 11.95 4.64 20.48 10.19 29.44 19.15 8.96 8.96 14.51 17.49 19.15 29.44 3.51 9.02 7.68 22.57 8.81 47.53 1.23 27 1.49 35.09 1.49 103.45s-.26 76.45-1.49 103.45c-1.14 24.96-5.31 38.51-8.81 47.53-4.64 11.95-10.19 20.48-19.15 29.44-8.96 8.96-17.49 14.51-29.44 19.15-9.02 3.51-22.57 7.68-47.53 8.81-27 1.23-35.09 1.49-103.45 1.49s-76.45-.26-103.45-1.49c-24.96-1.14-38.51-5.31-47.53-8.81-11.95-4.64-20.48-10.19-29.44-19.15-8.96-8.96-14.51-17.49-19.15-29.44-3.51-9.02-7.68-22.57-8.81-47.53-1.23-27-1.49-35.09-1.49-103.45s.26-76.45 1.49-103.45c1.14-24.96 5.31-38.51 8.81-47.53 4.64-11.95 10.19-20.48 19.15-29.44 8.96-8.96 17.49-14.51 29.44-19.15 9.02-3.51 22.57-7.68 47.53-8.81 27-1.23 35.09-1.49 103.45-1.49M256 0c-69.53 0-78.24.29-105.55 1.54-27.25 1.24-45.86 5.57-62.14 11.9-16.83 6.54-31.11 15.3-45.34 29.53S19.98 71.48 13.44 88.31C7.11 104.59 2.78 123.2 1.54 150.45.29 177.76 0 186.47 0 256s.29 78.24 1.54 105.55c1.24 27.25 5.57 45.86 11.9 62.14 6.54 16.83 15.3 31.11 29.53 45.34s28.51 23 45.34 29.53c16.28 6.33 34.89 10.66 62.14 11.9 27.31 1.25 36.02 1.54 105.55 1.54s78.24-.29 105.55-1.54c27.25-1.24 45.86-5.57 62.14-11.9 16.83-6.54 31.11-15.3 45.34-29.53s23-28.51 29.53-45.34c6.33-16.28 10.66-34.89 11.9-62.14 1.25-27.31 1.54-36.02 1.54-105.55s-.29-78.24-1.54-105.55c-1.24-27.25-5.57-45.86-11.9-62.14-6.54-16.83-15.3-31.11-29.53-45.34s-28.51-23-45.34-29.53c-16.28-6.33-34.89-10.66-62.14-11.9C334.24.29 325.53 0 256 0zm0 124.54a131.46 131.46 0 1 0 131.46 131.46A131.46 131.46 0 0 0 256 124.54zm0 216.79a85.33 85.33 0 1 1 85.33-85.33A85.33 85.33 0 0 1 256 341.33zm167.37-222a30.72 30.72 0 1 0-30.72 30.72 30.72 30.72 0 0 0 30.72-30.72z" />
                  </svg>
                </a>
              </li>

              {/* Reddit */}
              <li>
                <a
                  href="https://reddit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Reddit"
                  className="block text-[#787878] transition-colors hover:text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path d="M449.45 0C483.97 0 512 28.03 512 62.55v386.9C512 483.97 483.97 512 449.45 512H62.55C28.03 512 0 483.97 0 449.45V62.55C0 28.03 28.03 0 62.55 0zM446 265.64c0-22.96-18.62-41.58-41.58-41.58a41.3 41.3 0 0 0-28.84 11.67c-28.42-20.51-67.59-33.76-111.2-35.28l18.94-89.12 61.88 13.16a41.58 41.58 0 1 0 26.52-29.41l-69.1-14.69a10.6 10.6 0 0 0-12.78 7.37L249.18 200.4c-44.26 1.23-84.05 14.5-112.84 35.23a41.56 41.56 0 0 0-28.76-11.59C84.62 224.06 66 242.67 66 265.64a41.4 41.4 0 0 0 24.57 37.92c-.64 4.13-.99 8.33-.99 12.57 0 63.98 74.47 115.84 166.33 115.84s166.33-51.86 166.33-115.84c0-4.22-.35-8.39-.98-12.5a41.4 41.4 0 0 0 24.74-38.01zm-119.47 108.2c-20.27 20.24-59.12 21.82-70.54 21.82-11.43 0-50.28-1.58-70.52-21.82a10.6 10.6 0 1 1 15-15c12.78 12.78 40.11 17.32 55.64 17.32 15.52 0 42.86-4.54 55.66-17.32a10.6 10.6 0 1 1 14.76 15.02zm-5.23-48.79a29.7 29.7 0 1 1 29.71-29.7 29.7 29.7 0 0 1-29.71 29.7zm-160.39 0a29.7 29.7 0 1 1 29.71-29.7 29.7 29.7 0 0 1-29.71 29.7z" />
                  </svg>
                </a>
              </li>

              {/* X (Twitter) */}
              <li>
                <a
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="block text-[#787878] transition-colors hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.273 2.8 10.8 7.822 15.218 2.8h1.768l-5.4 6.139 5.799 8.254h-4.658l-3.73-5.31-4.671 5.31H2.558l5.654-6.427L2.615 2.8zm6.242 13.125L5.07 4.109h1.405l8.446 11.816z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              {/* YouTube */}
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="block text-[#787878] transition-colors hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path
                      fillRule="evenodd"
                      d="M456.035 87.502C478.065 93.389 495.411 110.736 501.299 132.766C512 172.694 512 256.002 512 256.002C512 256.002 512 339.31 501.299 379.234C495.411 401.264 478.065 418.615 456.035 424.502C416.103 435.199 255.998 435.199 255.998 435.199C255.998 435.199 95.893 435.199 55.96 424.502C33.935 418.615 16.584 401.264 10.696 379.234C0 339.31 0 256.002 0 256.002C0 256.002 0 172.694 10.696 132.766C16.584 110.736 33.935 93.389 55.96 87.502C95.893 76.801 255.998 76.801 255.998 76.801C255.998 76.801 416.103 76.801 456.035 87.502ZM337.814 256.002L204.796 332.803V179.201L337.814 256.002Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* 5. Detailed Backbone Numbered Legal Disclaimers & Privacy Choices */}
        <div className="border-t border-neutral-900 pt-6">
          <div className="flex flex-col items-start justify-between gap-8 xl:flex-row xl:gap-16">
            <div className="max-w-4xl space-y-2 text-[12px] leading-relaxed text-[#f2f2f299]">
              <p>
                1. Single one-time purchase grants perpetual, royalty-free commercial rights to
                build and deploy applications with full source code ownership. 2. Apple, iPhone, and
                App Store are registered trademarks of Apple Inc. Android and Google Play are
                trademarks of Google LLC. 3. Lemon Squeezy serves as the official Merchant of Record
                (MoR) handling sales tax, VAT compliance, and secure checkout processing. 4.
                Upstream updates and GitHub repository collaborator provisioning are subject to
                active license key verification. All other trademarks belong to their respective
                owners.
              </p>
              <p className="pt-1 text-[14px] text-white/60">
                &copy; {new Date().getFullYear()} {siteConfig.name} by Imperial Tech. Built with
                Next.js 16, Expo SDK 57 &amp; Supabase.
              </p>
            </div>

            {/* Legal Links with Privacy Choices Icon */}
            <nav aria-label="Footer legal links" className="shrink-0">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-white/60">
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    License Agreement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <span>Your Privacy Choices</span>
                    {/* Official California / US Opt-Out Toggle Glyph */}
                    <svg
                      width="26"
                      height="13"
                      viewBox="0 0 26 13"
                      fill="none"
                      className="inline-block shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M19.5 0H6.5C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13H19.5C23.09 13 26 10.09 26 6.5C26 2.91 23.09 0 19.5 0Z"
                        fill="#005ea6"
                      />
                      <path
                        d="M6.5 1.5C3.74 1.5 1.5 3.74 1.5 6.5C1.5 9.26 3.74 11.5 6.5 11.5C9.26 11.5 11.5 9.26 11.5 6.5C11.5 3.74 9.26 1.5 6.5 1.5Z"
                        fill="white"
                      />
                      <path
                        d="M5.2 6.5L6.1 7.4L8.1 5.4"
                        stroke="#005ea6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="19.5" cy="6.5" r="5" fill="white" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
