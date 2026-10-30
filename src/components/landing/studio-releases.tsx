"use client";

import * as React from "react";
import Link from "next/link";

interface NewsItem {
  category?: string;
  date: string;
  title: string;
  href: string;
  renderThumbnail: () => React.ReactNode;
}

export function StudioReleases() {
  const news: NewsItem[] = [
    {
      date: "Oct 14, 2026",
      title: "Introducing Grok Voice 3.0",
      href: "/changelog",
      renderThumbnail: () => (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#07070A]">
          {/* Neon fluid wave graphic matching reference */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 300 160"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grokVoiceGradient" x1="10%" y1="20%" x2="90%" y2="80%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="30%" stopColor="#7C3AED" />
                <stop offset="55%" stopColor="#9333EA" />
                <stop offset="80%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
              <filter id="waveGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient diffuse colored halos */}
            <ellipse
              cx="65"
              cy="50"
              rx="85"
              ry="60"
              fill="#6366F1"
              opacity="0.4"
              filter="url(#waveGlow)"
            />
            <ellipse
              cx="235"
              cy="90"
              rx="90"
              ry="70"
              fill="#EC4899"
              opacity="0.5"
              filter="url(#waveGlow)"
            />

            {/* Glowing S-curve fluid ribbon */}
            <path
              d="M -30 25 C 50 145, 105 145, 145 95 C 185 45, 235 45, 330 65"
              stroke="url(#grokVoiceGradient)"
              strokeWidth="34"
              strokeLinecap="round"
              filter="url(#waveGlow)"
              opacity="0.95"
            />
            {/* Soft inner highlight */}
            <path
              d="M -30 25 C 50 145, 105 145, 145 95 C 185 45, 235 45, 330 65"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>

          {/* Centered bold label */}
          <span className="relative z-10 text-[20px] font-medium tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-[21px]">
            Grok Voice 3.0
          </span>
        </div>
      ),
    },
    {
      category: "Product",
      date: "Oct 27, 2026",
      title: "Your next sales teammate should be a Grok Bot",
      href: "/changelog",
      renderThumbnail: () => (
        <div className="flex h-full w-full">
          {/* Left: Electric orange block with 2 vertical white capsule pills */}
          <div className="flex w-[39%] shrink-0 items-center justify-center gap-2.5 bg-[#FA6601]">
            <div className="h-[44px] w-[15px] rounded-full bg-white shadow-xs" />
            <div className="h-[44px] w-[15px] rounded-full bg-white shadow-xs" />
          </div>
          {/* Right: Dark warm chocolate brown with Grok Bot for Sales */}
          <div className="flex flex-1 flex-col justify-center bg-[#4D2203] px-4.5">
            <span className="text-[17px] leading-[1.2] font-medium text-white">Grok Bot</span>
            <span className="text-[17px] leading-[1.2] font-medium text-white">for Sales</span>
          </div>
        </div>
      ),
    },
    {
      category: "Company",
      date: "Oct 22, 2026",
      title: "Introducing the SpaceX Super Intelligence Partner Network",
      href: "/about",
      renderThumbnail: () => (
        <div className="flex h-full w-full items-center justify-center bg-[#070707] px-4">
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* SpaceX stylized "X" swoosh logo */}
            <svg viewBox="0 0 95 32" className="h-6 w-auto shrink-0 fill-white" aria-label="SpaceX">
              <path d="M24.7 0C21.8 3.5 17.5 9 12.8 15.1L0 31.8h8.5l9.2-12.1c5.1-6.7 9.8-12.7 13.9-17.7 20.3-3.6 44.5 1.5 61.4 12.2-16.7-8.4-38.3-11.7-57.7-7.8l-1.6 2.2 12.1 15.9h8.5l-16-20.9z M6.4 0L0 8.3l17.7 23.5h8.5L6.4 0z" />
            </svg>

            {/* Super Intelligence */}
            <div className="flex flex-col text-[11px] leading-[1.2] font-normal text-white">
              <span>Super</span>
              <span>Intelligence</span>
            </div>

            {/* Hairline vertical divider */}
            <div className="h-6 w-[1px] bg-[#333333]" />

            {/* Partner Network */}
            <div className="flex flex-col text-[11px] leading-[1.2] font-normal text-white">
              <span>Partner</span>
              <span>Network</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      category: "Product",
      date: "Oct 20, 2026",
      title: "Using Grok Bot to detect and respond to incidents",
      href: "/blog",
      renderThumbnail: () => (
        <div className="flex h-full w-full">
          {/* Left: Electric emerald green with 2 slanted quotation pills */}
          <div className="relative flex w-[39%] shrink-0 items-center justify-center gap-2 bg-[#00C872]">
            <div className="h-[40px] w-[14px] -rotate-[28deg] rounded-full bg-white shadow-xs" />
            <div className="h-[40px] w-[14px] translate-y-2.5 -rotate-[28deg] rounded-full bg-white shadow-xs" />
          </div>
          {/* Right: Dark forest green with Grok Bot for Customer Support */}
          <div className="flex flex-1 flex-col justify-center bg-[#023B20] px-4.5">
            <span className="text-[17px] leading-[1.2] font-medium text-white">Grok Bot</span>
            <span className="text-[17px] leading-[1.2] font-medium text-white">for Customer</span>
            <span className="text-[17px] leading-[1.2] font-medium text-white">Support</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-black py-14 text-white sm:py-20">
      <div className="container mx-auto max-w-[1260px] px-6 lg:px-8">
        {/* Header row: "Latest news" on left, "All posts ›" on right */}
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Latest news
          </h2>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm text-[#A1A1A1] transition-colors hover:text-white"
          >
            <span>All posts</span>
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">›</span>
          </Link>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((item, idx) => (
            <Link key={idx} href={item.href} className="group flex flex-col focus:outline-hidden">
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/9.5] w-full overflow-hidden rounded-2xl border border-[#1A1A1A] transition-transform duration-200 group-hover:scale-[1.015] group-hover:border-[#2E2E2E]">
                {item.renderThumbnail()}
              </div>

              {/* Meta row */}
              <div className="mt-3.5 text-[13px] font-normal text-[#A1A1A1]">
                {item.category ? `${item.category} · ${item.date}` : item.date}
              </div>

              {/* Title row with chevron */}
              <h3 className="mt-1.5 text-[15px] leading-[1.35] font-medium text-white transition-colors group-hover:text-white">
                <span>{item.title}</span>
                <span className="inline-block pl-1 transition-transform duration-150 group-hover:translate-x-1">
                  ›
                </span>
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
