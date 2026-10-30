import Link from "next/link";
import { ArrowLeft, Smartphone, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service | Imperial Tech O.P.C.",
  description:
    "Terms of service governing the usage of mobile apps and services published by Imperial Tech O.P.C. on Google Play.",
};

export default function TermsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-b border-border/60 py-4 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8 max-w-5xl">
          <Link href="/" className="inline-flex items-center gap-2.5 text-base font-bold">
            <div className="flex size-8 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white">
              <Smartphone className="size-4" />
            </div>
            <span>{siteConfig.name}</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12 sm:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <ShieldCheck className="size-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-muted-foreground mt-2 text-xs">
            Last Updated: October 30, 2026 • Effective Date: October 30, 2026
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-8 text-sm leading-relaxed">
          <section className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="text-foreground text-lg font-bold mb-3">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement between you and{" "}
              <strong>Imperial Tech O.P.C.</strong> (“Imperial Tech”, “we”, “us”, or “our”), a company
              incorporated under the laws of India.
            </p>
            <p className="mt-2 text-xs">
              By downloading, installing, accessing, or using our mobile applications (including
              Universal Calculator World, Chess Pocket, and Sudoku - Daily Puzzle Game) distributed
              through the Google Play Store, or visiting our website, you agree to be bound by these
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-base font-bold mb-2">2. License Grant &amp; Usage</h2>
            <p className="text-xs">
              Subject to your compliance with these Terms, Imperial Tech O.P.C. grants you a personal,
              revocable, non-exclusive, non-transferable, limited license to download, install, and use
              our applications strictly for your personal, non-commercial purposes on compatible
              Android devices that you own or control.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-base font-bold mb-2">3. Intellectual Property Rights</h2>
            <p className="text-xs">
              All source code, software architecture, game designs, UI graphics, trademarks, logos,
              algorithms, and content within our applications are the exclusive intellectual property
              of Imperial Tech O.P.C. and are protected by applicable intellectual property laws in
              India and international copyright treaties.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-base font-bold mb-2">4. Disclaimers &amp; Limitation of Liability</h2>
            <p className="text-xs">
              Our mobile applications and services are provided on an “AS IS” and “AS AVAILABLE” basis.
              Imperial Tech O.P.C. makes no warranties, express or implied, regarding the mathematical
              absolute precision of conversions or uninterrupted uptime of offline services, though we
              commit to best-effort software engineering and bug fixing.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-base font-bold mb-2">5. Governing Law &amp; Dispute Resolution</h2>
            <p className="text-xs">
              These Terms shall be governed by and construed in accordance with the laws of the Republic
              of India. Any legal dispute or proceeding arising from these terms shall be subject to the
              exclusive jurisdiction of the competent courts in Uttar Pradesh / New Delhi, India.
            </p>
          </section>

          <section className="rounded-2xl border border-border/80 bg-muted/30 p-6">
            <h2 className="text-foreground text-base font-bold mb-2">6. Contact Information</h2>
            <p className="text-xs">
              For any inquiries or notices regarding these Terms, contact us:
            </p>
            <div className="mt-2 text-xs font-mono text-foreground space-y-1">
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
