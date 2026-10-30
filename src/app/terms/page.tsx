import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service | Imperial Tech O.P.C.",
  description:
    "Terms of service governing the usage of mobile apps and services published by Imperial Tech O.P.C. on Google Play.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#1F1F1F] bg-black/85 py-4 backdrop-blur-md">
        <div className="container mx-auto flex max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium">
            <span>Imperial Tech</span>
            <span className="py-0.2 rounded-[3px] border border-[#2E2E2E] px-1 font-mono text-[10px] text-[#6B6B6B] uppercase">
              O.P.C.
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1A1] transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-[800px] px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Legal Agreement
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono text-xs text-[#6B6B6B]">
            Effective Date: October 30, 2026 • Last Updated: October 30, 2026
          </p>
        </div>

        <div className="space-y-10 text-sm leading-[1.6] text-[#A1A1A1]">
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-base font-medium text-white">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement between you and{" "}
              <strong>Imperial Tech O.P.C.</strong> (“Imperial Tech”, “we”, “us”, or “our”), a
              company incorporated under the laws of India.
            </p>
            <p className="mt-2 text-xs">
              By downloading, installing, or using our mobile applications distributed through the
              Google Play Store (including Universal Calculator World, Chess Pocket, and Sudoku -
              Daily Puzzle Game), you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-white">2. License Grant</h2>
            <p className="text-xs">
              Subject to your compliance with these Terms, Imperial Tech O.P.C. grants you a
              personal, revocable, non-exclusive, non-transferable, limited license to download and
              use our applications on compatible Android devices for personal, non-commercial
              purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-white">3. Intellectual Property</h2>
            <p className="text-xs">
              All source code, software architecture, game algorithms, graphics, and trademarks are
              the exclusive intellectual property of Imperial Tech O.P.C. and are protected by
              applicable laws in India and international copyright treaties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-white">
              4. Disclaimers &amp; Limitation of Liability
            </h2>
            <p className="text-xs">
              Our mobile applications and services are provided on an “AS IS” and “AS AVAILABLE”
              basis. Imperial Tech O.P.C. commits to best-effort software engineering and bug fixing
              across all supported Android versions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-medium text-white">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-xs">
              These Terms shall be governed by and construed in accordance with the laws of the
              Republic of India. Any dispute arising from these terms shall be subject to the
              exclusive jurisdiction of the competent courts in Uttar Pradesh / New Delhi, India.
            </p>
          </section>

          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-base font-medium text-white">6. Contact Information</h2>
            <div className="space-y-1 font-mono text-xs text-white">
              <p>Imperial Tech O.P.C.</p>
              <p>Email: support@imperialtech.com</p>
              <p>Registered Address: {siteConfig.company.registeredAddress}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
