"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Check } from "lucide-react";

export function ImperialFooter() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mt-28 w-full bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
      {/* Top Section (Backbone container-v2: Help + Wordmark + Grid all in ONE seamless flow, NO dividing lines) */}
      <div className="container mx-auto max-w-[1440px] px-6 pt-12 pb-16 sm:px-10 lg:px-12">
        {/* 1. Help Support Top Bar (No bottom border, seamless flow directly into wordmark) */}
        <div className="flex items-center justify-between pb-8 sm:pb-10">
          <Link
            href={`mailto:${siteConfig.company.supportEmail}`}
            className="text-lg font-medium text-white transition-opacity hover:opacity-80 sm:text-xl"
          >
            Need help?
          </Link>
          <Link
            href={`mailto:${siteConfig.company.supportEmail}`}
            className="group inline-flex items-center gap-3 text-sm font-medium text-white transition-opacity hover:opacity-80 sm:text-base"
          >
            <span>Get Support</span>
            {/* Authentic Backbone 51px Elongated Arrow */}
            <svg
              width="51"
              height="16"
              viewBox="0 0 51 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-auto w-10 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5 sm:w-12"
            >
              <path
                d="M50.7071 8.70711C51.0976 8.31659 51.0976 7.68342 50.7071 7.2929L44.3431 0.928936C43.9526 0.538412 43.3195 0.538412 42.9289 0.928936C42.5384 1.31946 42.5384 1.95263 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 8L-8.74228e-08 9L50 9L50 8L50 7L8.74228e-08 7L0 8Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

        {/* 2. Massive Brand Wordmark (Seamlessly sits between help bar and content, zero cutoff) */}
        <div className="w-full overflow-hidden pb-12 select-none sm:pb-16">
          <svg
            viewBox="0 0 1393 185"
            className="block h-auto w-full select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="IMPERIAL TECH"
          >
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
              fontWeight="900"
              fontSize="162"
              letterSpacing="-0.04em"
            >
              IMPERIAL TECH
            </text>
          </svg>
        </div>

        {/* 3. Main Grid: Newsletter (Left) + Multi-column Links (Right) */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Stay Connected Newsletter (Exact Backbone Sparkle & Layout) */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <svg
                width="28"
                height="20"
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
              <h3 className="text-xl font-bold tracking-tight text-white">Stay connected</h3>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#A1A1A1]">
              Unlock access to product news, feature drops, and exclusive updates.
            </p>

            <form onSubmit={handleSubscribe} className="mt-2 flex max-w-sm items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#2E2E2E] bg-[#0A0A0A] px-4 py-3 text-sm text-white transition-colors outline-none placeholder:text-[#6B6B6B] focus:border-[#787878]"
                />
              </div>

              <button
                type="submit"
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md bg-white text-black transition-opacity hover:opacity-90 active:scale-95"
                title="Subscribe"
              >
                {subscribed ? (
                  <Check className="size-4 text-emerald-600" />
                ) : (
                  <svg
                    width="12"
                    height="12"
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
                )}
              </button>
            </form>

            <p className="text-[12px] leading-normal text-[#787878]">
              Information collected will be used as described in our{" "}
              <Link href="/privacy" className="text-[#A1A1A1] underline hover:text-white">
                Privacy Policy.
              </Link>
            </p>
          </div>

          {/* Right Columns: Backbone 4-Column Navigation */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {/* Column 1: Products */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold tracking-wide text-white">Products</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#A1A1A1]">
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Calculator World
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Chess Pocket
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Sudoku - Daily
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="transition-colors hover:text-white">
                    Beta Releases
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    All Android Apps
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Featured Platforms */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold tracking-wide text-white">Featured Platforms</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#A1A1A1]">
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    All Platforms
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    Android 15 (API 35)
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    Offline Engine
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    Zero Telemetry
                  </Link>
                </li>
                <li>
                  <Link href="#standards" className="transition-colors hover:text-white">
                    60 FPS Touch
                  </Link>
                </li>
                <li>
                  <Link href="#portfolio" className="transition-colors hover:text-white">
                    Sudoku &amp; Puzzles
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Games (by Platform) */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold tracking-wide text-white">
                Games (by Platform)
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#A1A1A1]">
                <li>
                  <a
                    href={siteConfig.company.googlePlayStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-emerald-400 transition-colors hover:underline"
                  >
                    Google Play Store
                  </a>
                </li>
                <li>
                  <span className="text-[#A1A1A1]">Verified Organization</span>
                </li>
                <li>
                  <span className="text-[#A1A1A1]">Ads.txt Verified</span>
                </li>
                <li>
                  <span className="text-[#A1A1A1]">Clean APK Manifest</span>
                </li>
                <li>
                  <span className="text-[#A1A1A1]">Direct APK Distribution</span>
                </li>
                <li>
                  <span className="text-[#6B6B6B]">sudokuking</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-sm font-semibold tracking-wide text-white">Company</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#A1A1A1]">
                <li>
                  <Link href="#about" className="transition-colors hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link href="#about" className="transition-colors hover:text-white">
                    About Studio
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/data-deletion" className="transition-colors hover:text-white">
                    User Data Deletion
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="transition-colors hover:text-white">
                    Blog &amp; Updates
                  </Link>
                </li>
                <li>
                  <Link href="/privacy#security" className="transition-colors hover:text-white">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap.xml" className="transition-colors hover:text-white">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Divided by subtle hairline border) */}
      <div className="border-t border-[#1F1F1F]">
        <div className="container mx-auto max-w-[1440px] px-6 py-8 sm:px-10 lg:px-12">
          {/* Region & Language Selectors + Authentic Backbone Social Media Row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Region & Language Disclosure Pills */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#2E2E2E] bg-[#0A0A0A] px-3.5 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-[#787878] hover:text-white"
              >
                <span>United States (USD)</span>
                <svg className="size-2.5 text-[#787878]" viewBox="0 0 10 6" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#2E2E2E] bg-[#0A0A0A] px-3.5 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-[#787878] hover:text-white"
              >
                <span>English</span>
                <svg className="size-2.5 text-[#787878]" viewBox="0 0 10 6" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Right: Authentic Backbone Social Media SVG Icons */}
            <div className="flex items-center gap-5 text-[#787878]">
              {/* Discord */}
              <a
                href={siteConfig.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="transition-colors hover:text-white"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 512 512">
                  <path d="M433.713 90.1932C400.57 74.6866 365.132 63.417 328.083 57C323.533 65.2264 318.217 76.291 314.552 85.0929C275.168 79.17 236.146 79.17 197.486 85.0929C193.822 76.291 188.385 65.2264 183.794 57C146.705 63.417 111.227 74.728 78.0841 90.2753C11.235 191.293 -6.88664 289.802 2.17422 386.911C46.512 420.022 89.4807 440.135 131.724 453.297C142.154 438.942 151.457 423.683 159.47 407.601C144.208 401.801 129.59 394.644 115.778 386.336C119.442 383.621 123.026 380.783 126.489 377.863C210.735 417.266 302.27 417.266 385.509 377.863C389.013 380.783 392.596 383.621 396.221 386.336C382.368 394.685 367.709 401.842 352.447 407.642C360.461 423.683 369.723 438.984 380.193 453.338C422.477 440.176 465.486 420.063 509.824 386.911C520.456 274.336 491.662 176.732 433.713 90.1932ZM170.948 327.19C145.658 327.19 124.918 303.58 124.918 274.83C124.918 246.079 145.215 222.429 170.948 222.429C196.681 222.429 217.42 246.038 216.977 274.83C217.017 303.58 196.681 327.19 170.948 327.19ZM341.05 327.19C315.761 327.19 295.021 303.58 295.021 274.83C295.021 246.079 315.317 222.429 341.05 222.429C366.783 222.429 387.523 246.038 387.08 274.83C387.08 303.58 366.783 327.19 341.05 327.19Z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-colors hover:text-white"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 512 512">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M449.446 0C483.971 0 512 28.03 512 62.554V449.446C512 483.97 483.97 512 449.446 512H342.978V319.085H409.578L422.25 236.464H342.978V182.847C342.978 160.244 354.051 138.211 389.558 138.211H425.6V67.871C425.6 67.871 392.89 62.289 361.618 62.289C296.33 62.289 253.658 101.858 253.658 173.493V236.464H181.085V319.085H253.658V512H62.554C28.03 512 0 483.97 0 449.446V62.554C0 28.03 28.029 0 62.554 0L449.446 0Z"
                  />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-colors hover:text-white"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 512 512">
                  <path d="M255.999 46.1271C324.355 46.1271 332.451 46.3872 359.445 47.6188C384.405 48.758 397.96 52.9284 406.981 56.4333C418.93 61.0773 427.459 66.6257 436.417 75.5835C445.374 84.5412 450.923 93.0701 455.566 105.019C459.072 114.04 463.242 127.595 464.381 152.554C465.613 179.549 465.873 187.645 465.873 256.001C465.873 324.356 465.613 332.452 464.381 359.446C463.242 384.406 459.072 397.961 455.566 406.982C450.923 418.931 445.374 427.46 436.417 436.418C427.459 445.375 418.93 450.924 406.981 455.567C397.96 459.073 384.405 463.243 359.445 464.382C332.455 465.614 324.359 465.874 255.999 465.874C187.64 465.874 179.544 465.614 152.554 464.382C127.594 463.243 114.039 459.073 105.019 455.567C93.0691 450.924 84.5402 445.375 75.5825 436.418C66.6247 427.46 61.0763 418.931 56.4333 406.982C52.9274 397.961 48.757 384.406 47.6178 359.447C46.3862 332.452 46.126 324.356 46.126 256.001C46.126 187.645 46.3862 179.549 47.6178 152.555C48.757 127.595 52.9274 114.04 56.4333 105.019C61.0763 93.0701 66.6247 84.5412 75.5825 75.5835C84.5402 66.6257 93.0691 61.0773 105.019 56.4333C114.039 52.9284 127.594 48.758 152.553 47.6188C179.548 46.3872 187.644 46.1271 255.999 46.1271ZM255.999 0C186.474 0 177.757 0.294696 150.452 1.54055C123.202 2.78437 104.594 7.11132 88.3093 13.4402C71.475 19.9824 57.1985 28.7359 42.9667 42.9677C28.7349 57.1995 19.9814 71.476 13.4392 88.3103C7.11031 104.595 2.78335 123.203 1.53954 150.453C0.294696 177.758 0 186.475 0 256.001C0 325.526 0.294696 334.243 1.53954 361.548C2.78335 388.798 7.11031 407.406 13.4392 423.691C19.9814 440.525 28.7349 454.802 42.9667 469.034C57.1985 483.265 71.475 492.019 88.3093 498.561C104.594 504.89 123.202 509.217 150.452 510.461C177.757 511.706 186.474 512.001 255.999 512.001C325.524 512.001 334.241 511.706 361.546 510.461C388.796 509.217 407.404 504.89 423.689 498.561C440.523 492.019 454.8 483.265 469.031 469.034C483.263 454.802 492.017 440.525 498.559 423.691C504.888 407.406 509.215 388.798 510.459 361.548C511.703 334.243 511.998 325.526 511.998 256.001C511.998 186.475 511.703 177.758 510.459 150.453C509.215 123.203 504.888 104.595 498.559 88.3103C492.017 71.476 483.263 57.1995 469.031 42.9677C454.8 28.7359 440.523 19.9824 423.689 13.4402C407.404 7.11132 388.796 2.78437 361.546 1.54055C334.241 0.294696 325.524 0 255.999 0ZM255.999 124.636C183.454 124.636 124.634 183.455 124.634 256.001C124.634 328.546 183.454 387.365 255.999 387.365C328.544 387.365 387.364 328.546 387.364 256.001C387.364 183.455 328.544 124.636 255.999 124.636ZM255.999 341.238C208.924 341.238 170.761 303.076 170.761 256.001C170.761 208.925 208.924 170.763 255.999 170.763C303.074 170.763 341.237 208.925 341.237 256.001C341.237 303.076 303.074 341.238 255.999 341.238ZM422.378 120.316C422.378 137.279 408.628 151.029 391.666 151.029C374.703 151.029 360.953 137.279 360.953 120.316C360.953 103.353 374.703 89.6033 391.666 89.6033C408.628 89.6033 422.378 103.353 422.378 120.316Z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="transition-colors hover:text-white"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 512 512">
                  <path d="M412.19 118.66C399.78 112.47 389.28 103.09 382.16 91.58C375.05 80.08 371.61 66.86 372.24 53.33H290.78V356.55C290.15 369.34 284.61 381.44 275.42 390.17C266.24 398.9 254.08 403.62 241.69 403.26C214.39 403.26 192.17 381.04 192.17 353.74C192.17 322.95 220.08 299.75 250.88 304.75V221.75C178.69 217.47 110.12 274.65 110.12 353.74C110.12 433.82 173.34 496.04 253.42 496.04C333.5 496.04 398.72 430.82 398.72 350.74V204.66C433.72 229.66 476.72 235.66 512 235.66V154.66C474.72 154.66 438.72 141.66 412.19 118.66Z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="transition-colors hover:text-white"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.273 2.8 10.8 7.822 15.218 2.8h1.768l-5.4 6.139 5.799 8.254h-4.658l-3.73-5.31-4.671 5.31H2.558l5.654-6.427L2.615 2.8zm6.242 13.125L5.07 4.109h1.405l8.446 11.816z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition-colors hover:text-white"
              >
                <svg className="size-4.5 fill-current" viewBox="0 0 512 512">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M456.035 87.502C478.065 93.389 495.411 110.736 501.299 132.766C512 172.694 512 256.002 512 256.002C512 256.002 512 339.31 501.299 379.234C495.411 401.264 478.065 418.615 456.035 424.502C416.103 435.199 255.998 435.199 255.998 435.199C255.998 435.199 95.893 435.199 55.96 424.502C33.935 418.615 16.584 401.264 10.696 379.234C0 339.31 0 256.002 0 256.002C0 256.002 0 172.694 10.696 132.766C16.584 110.736 33.935 93.389 55.96 87.502C95.893 76.801 255.998 76.801 255.998 76.801C255.998 76.801 416.103 76.801 456.035 87.502ZM337.814 256.002L204.796 332.803V179.201L337.814 256.002Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Legal Disclaimer & Bottom Legal Links (Backbone Numbered Clauses) */}
          <div className="mt-8 flex flex-col gap-6 pt-6 text-[11px] leading-relaxed text-[#787878] lg:flex-row lg:items-start lg:justify-between">
            <p className="max-w-3xl">
              1. All mobile applications developed and published by Imperial Tech O.P.C. are
              distributed via official Google Play channels. 2. Legally incorporated entity in India
              under the Companies Act. Verified Google Play Organization Account. 3. Zero compulsory
              cloud telemetry, 100% offline-first execution. 4. Android is a trademark of Google
              LLC. All other trademarks belong to their respective owners. &copy;{" "}
              {new Date().getFullYear()} {siteConfig.company.legalName}. All rights reserved.
            </p>

            <nav aria-label="Footer legal links">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-[#A1A1A1]">
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
                  <Link href="/privacy#california" className="transition-colors hover:text-white">
                    California Privacy Notice
                  </Link>
                </li>
                <li>
                  <Link href="/data-deletion" className="transition-colors hover:text-white">
                    User Data Deletion
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 transition-colors hover:text-white"
                  >
                    <span>Your Privacy Choices</span>
                    <span className="inline-flex items-center rounded-xs bg-[#0070F3] px-1 py-0.5 text-[9px] leading-none font-black text-white">
                      &#10003;&#215;
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
