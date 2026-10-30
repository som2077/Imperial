import Link from "next/link";
import { ArrowLeft, Smartphone, ShieldCheck, Mail, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy | Imperial Tech O.P.C.",
  description:
    "Privacy policy for Imperial Tech O.P.C. mobile applications and games on the Google Play Store, outlining data safety, zero-tracking principles, and user rights.",
};

export default function PrivacyPage() {
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
            <span>Google Play Developer Policy Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground mt-2 text-xs">
            Last Updated: October 30, 2026 • Effective Date: October 30, 2026
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-8 text-sm leading-relaxed">
          {/* Section 1: Overview */}
          <section className="rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="text-foreground text-lg font-bold mb-3">1. Introduction &amp; Scope</h2>
            <p>
              This Privacy Policy applies to the mobile applications, games, and web platforms
              developed, published, and maintained by <strong>Imperial Tech O.P.C.</strong> (“we”,
              “us”, or “our”), an officially incorporated One Person Company in India.
            </p>
            <p className="mt-2">
              Our products include, but are not limited to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>Universal Calculator World</strong> (Utility &amp; Scientific Calculation Suite)</li>
              <li><strong>Chess Pocket</strong> (Tactical Chess Puzzle Trainer &amp; Offline Play)</li>
              <li><strong>Sudoku - Daily Puzzle Game</strong> (Classic Brain Training &amp; Logic Puzzles)</li>
              <li>All associated digital services and developer web pages.</li>
            </ul>
          </section>

          {/* Section 2: Data Collection Principles */}
          <section>
            <h2 className="text-foreground text-base font-bold mb-2">
              2. Core Philosophy: Offline-First &amp; Zero Personal Data Tracking
            </h2>
            <p>
              Imperial Tech O.P.C. engineers applications with a privacy-by-default architecture:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>No mandatory account registration:</strong> Core features of our utilities and games can be used completely anonymously without requiring email addresses, phone numbers, or social media logins.</li>
              <li><strong>Local On-Device Storage:</strong> Calculations, unit conversion tapes, puzzle progress, chess move histories, and custom game settings are saved strictly within your device’s local sandboxed storage (Room / SQLite database).</li>
              <li><strong>Zero Data Selling:</strong> We do not sell, rent, monetize, or trade your personal information, device records, or gameplay telemetry to third-party data brokers.</li>
            </ul>
          </section>

          {/* Section 3: Information We May Collect */}
          <section>
            <h2 className="text-foreground text-base font-bold mb-2">
              3. Information We May Process
            </h2>
            <p>Depending on how you interact with our apps and website, minimal data may be processed:</p>
            <div className="mt-3 space-y-3">
              <div>
                <h3 className="text-foreground text-xs font-semibold">A. Support Communications:</h3>
                <p className="text-xs">If you contact us via support@imperialtech.com or our website contact forms, we collect your email address, name, and the contents of your message solely to resolve your technical inquiry.</p>
              </div>
              <div>
                <h3 className="text-foreground text-xs font-semibold">B. Anonymous Crash Diagnostics:</h3>
                <p className="text-xs">Via Google Play Console (Google Play Services), aggregated, non-personally identifiable crash stack traces (e.g., OS version, device model, stack dump) may be generated automatically to help our engineering team fix software bugs.</p>
              </div>
              <div>
                <h3 className="text-foreground text-xs font-semibold">C. Permissions:</h3>
                <p className="text-xs">Our applications do not request sensitive device permissions such as <code>READ_CONTACTS</code>, <code>ACCESS_FINE_LOCATION</code>, <code>CAMERA</code>, or <code>RECORD_AUDIO</code>.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Google Play Compliance & Data Safety */}
          <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="text-foreground text-base font-bold mb-2">
              4. Google Play Data Safety Disclosures
            </h2>
            <p className="text-xs leading-relaxed">
              In accordance with Google Play Developer Policy Data Safety requirements:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>Data Shared:</strong> No user data is shared with third parties.</li>
              <li><strong>Data Collected:</strong> Optional diagnostic crash logs through official Google Play APIs.</li>
              <li><strong>Security Practices:</strong> All network communication (e.g. support emails, website inquiries) utilizes standard Transport Layer Security (TLS 1.3) encryption.</li>
            </ul>
          </section>

          {/* Section 5: Children's Privacy (COPPA & Families Policy) */}
          <section>
            <h2 className="text-foreground text-base font-bold mb-2">
              5. Children’s Privacy &amp; Families Policy
            </h2>
            <p>
              Our applications are family-friendly and strictly comply with the Children’s Online
              Privacy Protection Act (COPPA) and Google Play Families Policy. We do not knowingly
              solicit or collect any personal information from children under the age of 13 (or under
              the relevant age of consent in applicable jurisdictions).
            </p>
          </section>

          {/* Section 6: Data Retention & User Deletion Rights */}
          <section className="rounded-2xl border border-rose-500/20 bg-card p-6">
            <h2 className="text-foreground text-base font-bold mb-2">
              6. Data Retention &amp; User Deletion Rights
            </h2>
            <p className="text-xs">
              Under Google Play guidelines and global privacy standards (GDPR, CCPA), you hold the
              absolute right to request complete deletion of any communications or records we hold.
            </p>
            <p className="mt-2 text-xs">
              To request permanent data deletion, visit our dedicated portal:
            </p>
            <div className="mt-3">
              <Link
                href="/data-deletion"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                <span>Go to User Data Deletion Request Page →</span>
              </Link>
            </div>
            <p className="mt-2 text-xs">
              Requests are processed within 24 to 48 business hours.
            </p>
          </section>

          {/* Section 7: Corporate Contact Information */}
          <section className="rounded-2xl border border-border/80 bg-muted/30 p-6">
            <h2 className="text-foreground text-base font-bold mb-2">
              7. Legal Entity &amp; Privacy Officer Contact
            </h2>
            <p className="text-xs">
              For any questions, legal notices, or privacy inquiries regarding Imperial Tech O.P.C.,
              please reach out to us at:
            </p>
            <div className="mt-3 text-xs space-y-1 font-mono text-foreground">
              <p><strong>Legal Entity:</strong> {siteConfig.company.legalName}</p>
              <p><strong>Entity Type:</strong> {siteConfig.company.legalType}</p>
              <p><strong>Registered Address:</strong> {siteConfig.company.registeredAddress}</p>
              <p><strong>Privacy Contact:</strong> {siteConfig.company.privacyEmail}</p>
              <p><strong>Support Contact:</strong> {siteConfig.company.supportEmail}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
