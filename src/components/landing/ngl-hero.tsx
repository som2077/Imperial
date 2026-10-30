"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const NGL_TICKER_ITEMS = [
  "your crush is",
  "send me your confessions",
  "ask me anything",
  "not gonna lie",
  "send me a never have I ever",
  "describe me in 3 words",
  "share an opinion that'll get you cancelled",
  "tell me who your crush is",
  "send me your confessions",
  "ask me anything",
  "not gonna lie",
];

export function NglHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white selection:bg-[#ED1980]/30">
      {/* 1. NGL Top Ticker Tape (Exact black marquee with white text & white bullets from ngl.link) */}
      <div className="relative w-full overflow-hidden border-b border-white/10 bg-black h-10 sm:h-11 flex items-center text-xs sm:text-sm font-bold tracking-wider text-white select-none">
        <div className="animate-ngl-marquee flex items-center gap-6">
          {[...NGL_TICKER_ITEMS, ...NGL_TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="flex items-center gap-6 shrink-0">
              <span className="text-white hover:text-[#FE831B] transition-colors">{item}</span>
              <span className="text-white text-xs select-none">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Main NGL Hero Card Container (Full bleed width with 16px edge margin, exact sunset gradient) */}
      <div className="px-3 sm:px-4 md:px-5 pt-2 sm:pt-3">
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#ED1980] via-[#F44158] to-[#FE831B] pt-4 sm:pt-6 pb-20 sm:pb-24 md:pb-28 shadow-2xl">
          {/* Subtle Ambient Radial Gloss Light */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_65%)]" />

          {/* Internal Header Navigation Bar (Inside the Card, exactly like NGL) */}
          <div className="relative z-30 flex items-center justify-between px-6 sm:px-12 mb-4 sm:mb-8">
            {/* Exact NGL Bubble Logo */}
            <Link href="/" className="group flex items-center select-none">
              <div className="relative w-20 sm:w-24 h-11 sm:h-12 transition-transform hover:scale-105">
                <Image
                  src="/images/ngl/ngl-logo.png"
                  alt="NGL"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* In-Card Clean Navigation Links (About, Safety, Blog, Contact us) */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm sm:text-base font-bold text-white">
              <a
                href="#templates"
                className="hover:text-white/80 transition-colors drop-shadow-sm"
              >
                About
              </a>
              <a
                href="#features"
                className="hover:text-white/80 transition-colors drop-shadow-sm"
              >
                Safety
              </a>
              <a
                href="#pricing"
                className="hover:text-white/80 transition-colors drop-shadow-sm"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="hover:text-white/80 transition-colors drop-shadow-sm"
              >
                Contact us
              </a>
            </nav>

            {/* Right Pill Button (Apple & Android Icons Pill:  | 🤖) */}
            <div className="flex items-center">
              <a
                href="#templates"
                className="flex items-center gap-3 rounded-full bg-black px-4 sm:px-5 py-2 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                title="Available on iOS and Android"
              >
                {/* Apple Icon */}
                <svg
                  className="w-4 h-4 fill-white"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 15.967 9.072 C 15.967 9.072 15.608 7.492 17.011 5.644 C 18.587 3.567 20.778 3.555 20.778 3.555 C 20.778 3.555 21.105 5.51 19.536 7.389 C 17.866 9.403 15.967 9.072 15.967 9.072 Z M 22.543 16.271 C 22.543 13.052 25.136 11.728 25.136 11.728 C 25.136 11.728 23.808 9.328 20.439 9.328 C 18.48 9.328 16.975 10.443 16.164 10.443 C 15.218 10.443 13.811 9.395 11.991 9.395 C 9.201 9.395 6.222 11.897 6.222 16.665 C 6.222 21.511 9.741 27.544 12.527 27.544 C 13.5 27.544 14.993 26.563 16.499 26.563 C 17.976 26.563 19.064 27.508 20.466 27.508 C 23.516 27.508 25.778 21.149 25.778 21.149 C 25.778 21.149 22.543 19.9 22.543 16.271 Z" />
                </svg>
                <span className="text-white/40 font-light text-xs">|</span>
                {/* Android Icon */}
                <svg
                  className="w-4 h-4 fill-white"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 9.723 12.93 L 7.437 8.83 C 7.308 8.599 7.388 8.307 7.605 8.173 C 7.823 8.039 8.11 8.116 8.234 8.347 L 10.55 12.502 C 12.318 11.665 14.306 11.2 16.446 11.2 C 18.586 11.2 20.574 11.665 22.341 12.502 L 24.658 8.347 C 24.787 8.116 25.069 8.039 25.292 8.173 C 25.515 8.307 25.59 8.599 25.46 8.83 L 23.174 12.93 C 27.112 15.14 29.781 19.271 30.222 24.107 L 2.667 24.107 C 3.108 19.271 5.777 15.14 9.723 12.93 Z M 22.771 20.102 C 23.411 20.102 23.927 19.565 23.927 18.906 C 23.927 18.243 23.408 17.709 22.771 17.709 C 22.132 17.709 21.616 18.246 21.616 18.906 C 21.613 19.562 22.132 20.102 22.771 20.102 Z M 10.12 20.102 C 10.76 20.102 11.276 19.565 11.276 18.906 C 11.276 18.243 10.757 17.709 10.12 17.709 C 9.481 17.709 8.965 18.246 8.965 18.906 C 8.962 19.562 9.483 20.102 10.12 20.102 Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Floating Left Elements: 3D Waving Hand, Guy Basketball Polaroid, and Boba Drink */}
          <div className="pointer-events-none absolute left-4 lg:left-8 xl:left-14 top-1/2 -translate-y-1/2 hidden xl:block z-20">
            {/* 3D Clay Hand Waving (Top Left, peeking over Polaroid) */}
            <div className="relative -mb-16 -ml-4 w-40 lg:w-48 h-48 lg:h-56 z-30 animate-ngl-float-badge select-none">
              <Image
                src="/images/ngl/clay-hand.png"
                alt="Waving Hand"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Left Tilted Polaroid Card (Guy in White Outfit with Basketball) */}
            <div className="pointer-events-auto relative w-64 lg:w-72 xl:w-80 aspect-[1/1.18] -rotate-[8deg] hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-2xl rounded-[38px] lg:rounded-[44px] overflow-hidden border-[3.5px] border-[#FE831B] bg-neutral-900 animate-ngl-float-left">
              <Image
                src="/images/ngl/guy-basketball.jpg"
                alt="Real friends"
                fill
                sizes="(max-width: 1440px) 300px, 320px"
                className="object-cover"
                priority
              />
            </div>

            {/* 3D Boba Drink Cup (Bottom Left, overlapping bottom arch) */}
            <div className="relative -mt-20 ml-36 lg:ml-44 w-24 sm:w-28 lg:w-32 h-40 sm:h-44 lg:h-48 z-30 animate-ngl-float-badge select-none">
              <Image
                src="/images/ngl/boba-drink.png"
                alt="Boba Drink"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Floating Right Elements: Pink Fluffy Paw with Chain & Girl Polaroid */}
          <div className="pointer-events-none absolute right-4 lg:right-8 xl:right-14 top-1/2 -translate-y-1/2 hidden xl:block z-20">
            {/* 3D Pink Paw with Chain (Top Right, above Polaroid) */}
            <div className="relative -mb-20 -mr-6 w-44 lg:w-52 h-48 lg:h-56 z-30 animate-ngl-float-badge select-none">
              <Image
                src="/images/ngl/pink-paw.png"
                alt="Cat Paw with Chain"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right Tilted Polaroid Card (Girl with Beanie sticking tongue out) */}
            <div className="pointer-events-auto relative w-64 lg:w-72 xl:w-80 aspect-[1/1.18] rotate-[8deg] hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-2xl rounded-[38px] lg:rounded-[44px] overflow-hidden border-[3.5px] border-[#FE831B] bg-neutral-900 animate-ngl-float-right">
              <Image
                src="/images/ngl/girl-beanie.jpg"
                alt="Real fun"
                fill
                sizes="(max-width: 1440px) 300px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Center Content: Giant Chunky 3-Line Typography (Exact ES Rebond Grotesque Extrabold) */}
          <div className="relative z-20 mx-auto max-w-3xl text-center px-4 my-2 sm:my-6">
            <h1 className="font-ngl-headline text-[76px] sm:text-[100px] md:text-[124px] lg:text-[144px] xl:text-[152px] font-black text-white tracking-[-0.035em] leading-[0.84] lowercase select-none drop-shadow-sm mb-8 sm:mb-10">
              <div className="block">real</div>
              <div className="block">friends</div>
              <div className="block">real fun</div>
            </h1>

            {/* NGL Signature White Pill Button with Vibrant Orange Text */}
            <div className="flex justify-center">
              <a href="#templates" className="group">
                <div className="inline-flex items-center justify-center rounded-[104px] bg-white px-10 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl font-bold tracking-tight text-[#FE831B] shadow-[0_12px_36px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                  <span>Download the app!</span>
                </div>
              </a>
            </div>
          </div>

          {/* 3. The Iconic Concave Smile Oval Arch Cutout (Reverse engineered from ngl.link: 2400px w, rounded 100% in bg-black) */}
          <div className="pointer-events-none absolute -bottom-20 sm:-bottom-24 md:-bottom-28 left-1/2 -translate-x-1/2 w-[2400px] h-44 sm:h-52 bg-black rounded-[100%]" />
        </div>
      </div>

      {/* 4. Bottom Scroll Indicator (Centered on pure black background, exactly below the curved card) */}
      <div className="relative z-30 pt-2 pb-8 text-center bg-black">
        <a
          href="#templates"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-white hover:text-white/80 uppercase transition-colors animate-bounce select-none"
        >
          <span className="text-base font-black">↓</span>
          <span>Scroll for more</span>
        </a>
      </div>
    </section>
  );
}
