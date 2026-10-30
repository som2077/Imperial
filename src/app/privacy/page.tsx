import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy | Imperial Tech O.P.C.",
  description:
    "Privacy policy for Imperial Tech O.P.C. mobile applications and games on the Google Play Store, outlining data safety, zero-tracking principles, and user rights.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      {/* Header */}
      <header className="border-b border-[#1F1F1F] py-4 bg-black/85 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between px-6 max-w-[1200px]">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium">
            <span>Imperial Tech</span>
            <span className="font-mono text-[10px] uppercase text-[#6B6B6B] border border-[#2E2E2E] px-1 py-0.2 rounded-[3px]">
              O.P.C.
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="text-[#A1A1A1] hover:text-white inline-flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-[800px] px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-[#6B6B6B] mb-3">
            Google Play Developer Policy Compliant
          </div>
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs font-mono text-[#6B6B6B]">
            Effective Date: October 30, 2026 • Last Updated: October 30, 2026
          </p>
        </div>

        <div className="space-y-10 text-sm leading-[1.6] text-[#A1A1A1]">
          {/* Section 1 */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="text-white text-base font-medium mb-3">1. Introduction &amp; Scope</h2>
            <p>
              This Privacy Policy applies to all mobile applications, games, and web services published
              by <strong>Imperial Tech O.P.C.</strong> (“we”, “us”, or “our”), a legally incorporated One
              Person Company in India.
            </p>
            <p className="mt-2">Products covered under this policy include:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs font-mono text-white">
              <li>Universal Calculator World (Tools &amp; Utilities)</li>
              <li>Chess Pocket (Board &amp; Tactical Strategy)</li>
              <li>Sudoku - Daily Puzzle Game (Brain Training)</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-white text-base font-medium mb-3">
              2. Core Philosophy: Offline-First &amp; Zero Personal Data Tracking
            </h2>
            <p>
              Imperial Tech O.P.C. prioritizes local processing and absolute data isolation:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-xs">
              <li>
                <strong className="text-white">No mandatory account creation:</strong> All utilities and
                puzzle games can be used entirely anonymously without signing in.
              </li>
              <li>
                <strong className="text-white">Local Sandboxed Storage:</strong> Calculation histories,
                tapes, and puzzle save states remain 100% on your device (Room / SQLite DB).
              </li>
              <li>
                <strong className="text-white">Zero Data Selling:</strong> We never sell, rent, or broker
                user information, device identifiers, or usage telemetry to third parties.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="text-white text-base font-medium mb-3">
              3. Google Play Data Safety Disclosures
            </h2>
            <p className="text-xs leading-relaxed">
              In strict accordance with Google Play Console Data Safety requirements:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
              <li><strong>Data Shared:</strong> No user data is shared with third parties.</li>
              <li><strong>Data Collected:</strong> Optional diagnostic crash reports through official Google Play APIs.</li>
              <li><strong>Sensitive Permissions:</strong> None requested (No Location, Contacts, Camera, or Mic).</li>
              <li><strong>Security:</strong> All external web communications use TLS 1.3 encryption.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-white text-base font-medium mb-3">
              4. Children’s Privacy (COPPA &amp; Families Policy)
            </h2>
            <p className="text-xs">
              Our mobile applications comply with the Children’s Online Privacy Protection Act (COPPA)
              and Google Play Families Policy. We do not knowingly solicit or collect personal
              information from children under the age of 13.
            </p>
          </section>

          {/* Section 5 */}
          <section className="rounded-[6px] border border-[#2E2E2E] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="text-white text-base font-medium mb-3">
              5. User Data Deletion Rights
            </h2>
            <p className="text-xs">
              In accordance with Google Play Developer Policy, you have the right to request permanent
              erasure of any customer support correspondence or diagnostic records.
            </p>
            <div className="mt-4">
              <Link
                href="/data-deletion"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white underline hover:opacity-85"
              >
                <span>Visit User Data Deletion Portal →</span>
              </Link>
            </div>
          </section>

          {/* Section 6 */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="text-white text-base font-medium mb-3">
              6. Corporate &amp; Legal Contact
            </h2>
            <div className="space-y-1.5 text-xs font-mono text-white">
              <p>Legal Entity: {siteConfig.company.legalName}</p>
              <p>Structure: {siteConfig.company.legalType}</p>
              <p>Registered Address: {siteConfig.company.registeredAddress}</p>
              <p>Support Email: {siteConfig.company.supportEmail}</p>
              <p>Privacy Desk: {siteConfig.company.privacyEmail}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
