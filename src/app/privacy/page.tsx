import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy | Imperial Tech O.P.C.",
  description:
    "Official Privacy Policy for Imperial Tech O.P.C. Android applications (Universal Calculator World, Chess Pocket, Sudoku Daily Puzzle) and website.",
};

export default function PrivacyPage() {
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
      <main className="container mx-auto max-w-[840px] px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Google Play Developer Policy Compliant
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-xs text-[#6B6B6B]">
            Effective Date: 30 October 2026 • Last Updated: 30 October 2026
          </p>
        </div>

        <div className="space-y-10 text-sm leading-[1.65] text-[#A1A1A1]">
          {/* Introductory Preamble */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <p>
              This Privacy Policy explains how <strong>Imperial Tech O.P.C.</strong> (&ldquo;
              <strong>Imperial Tech</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;
              <strong>us</strong>&rdquo;, &ldquo;<strong>our</strong>&rdquo;) handles information in
              our Android applications <strong>Universal Calculator World</strong>,{" "}
              <strong>Chess Pocket</strong>, and <strong>Sudoku Daily Puzzle</strong> (together, the
              &ldquo;<strong>Apps</strong>&rdquo;) and on our website{" "}
              <a
                href={siteConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:opacity-80"
              >
                {siteConfig.url}
              </a>{" "}
              (the &ldquo;<strong>Website</strong>&rdquo;).
            </p>
            <p className="mt-3 text-xs text-[#8E8E8E]">
              By using our Apps or Website, you acknowledge this Policy. If you do not agree, please
              do not use them.
            </p>
          </section>

          {/* 1. Introduction & Summary */}
          <section>
            <h2 className="mb-3 text-lg font-medium text-white">
              1. Introduction &amp; Core Summary
            </h2>
            <ul className="list-inside list-disc space-y-2 text-xs">
              <li>
                Our Apps are designed to work <strong>offline</strong> and do{" "}
                <strong>not require an account</strong>.
              </li>
              <li>
                App data (settings, history, progress) is stored <strong>on your device</strong> in
                a local SQLite database.
              </li>
              <li>
                We <strong>do not sell</strong> your personal data.
              </li>
              <li>
                We do <strong>not</strong> collect your name, email, phone number, contacts, precise
                location, photos, or files through the Apps.
              </li>
              <li>
                We do not knowingly collect personal information from children for advertising or
                profiling.
              </li>
            </ul>
          </section>

          {/* 2. Core Philosophy & Information We Handle */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium text-white">
              2. Core Philosophy &amp; Information We Handle
            </h2>

            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-3 font-mono text-xs tracking-wider text-white uppercase">
                a) Data stored on your device (not sent to us)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#2E2E2E] text-[#8E8E8E]">
                      <th className="pb-2 font-medium">Data</th>
                      <th className="pb-2 font-medium">App</th>
                      <th className="pb-2 font-medium">Purpose</th>
                      <th className="pb-2 font-medium">Where Stored</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F] text-[#CCCCCC]">
                    <tr>
                      <td className="py-2.5 pr-2">
                        Calculation &amp; conversion history, favorites, settings
                      </td>
                      <td className="py-2.5 pr-2 font-mono text-[11px] text-white">
                        Universal Calculator World
                      </td>
                      <td className="py-2.5 pr-2">Show your history and preferences</td>
                      <td className="py-2.5 font-mono text-[11px] text-[#A1A1A1]">
                        On-device SQLite
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-2">Game state, difficulty, statistics, settings</td>
                      <td className="py-2.5 pr-2 font-mono text-[11px] text-white">Chess Pocket</td>
                      <td className="py-2.5 pr-2">Resume games, track your stats</td>
                      <td className="py-2.5 font-mono text-[11px] text-[#A1A1A1]">
                        On-device SQLite
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-2">Puzzle progress, streaks, settings</td>
                      <td className="py-2.5 pr-2 font-mono text-[11px] text-white">
                        Sudoku Daily Puzzle
                      </td>
                      <td className="py-2.5 pr-2">Save progress and streaks</td>
                      <td className="py-2.5 font-mono text-[11px] text-[#A1A1A1]">
                        On-device SQLite
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#8E8E8E]">
                This data stays on your device. We cannot access it, and it is removed when you
                clear the app&apos;s storage or uninstall the app.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <p>
                <strong className="text-white">b) Information you choose to send us:</strong> If you
                email{" "}
                <a
                  href={`mailto:${siteConfig.company.supportEmail}`}
                  className="text-white underline"
                >
                  {siteConfig.company.supportEmail}
                </a>{" "}
                or submit a form on our Website, we receive the information you provide (for
                example, your email address and message). We use it only to respond to you and to
                improve our Apps.
              </p>
              <p>
                <strong className="text-white">c) Website information:</strong> Our Website may
                record standard server logs (IP address, browser type, pages requested, date and
                time) for security and to keep the site working. We do not use these logs for
                advertising.
              </p>
              <p>
                <strong className="text-white">d) Advertising-related data:</strong> Where an App
                displays advertisements, it uses a Google Play-compliant advertising SDK (Google
                AdMob). The SDK may process device and advertising identifiers, IP address, and
                basic device and app interaction data to deliver ads, limit frequency, prevent
                fraud, and measure performance. We configure ads as{" "}
                <strong className="text-white">non-personalized</strong>, and we do not use your
                data to build advertising profiles. Google&apos;s handling of that data is described
                in Google&apos;s Privacy Policy at{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:opacity-80"
                >
                  https://policies.google.com/privacy
                </a>
                . You can reset your advertising ID or opt out of ads personalization in Android
                under <strong>Settings → Privacy → Ads</strong>.
              </p>
            </div>
          </section>

          {/* 3.3 Google Play Data Safety */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-medium text-white">3.3 Google Play Data Safety</h2>
            <p className="mb-3 text-xs leading-relaxed">
              Our Data Safety declarations on Google Play reflect this Policy:
            </p>
            <ul className="list-inside list-disc space-y-2 text-xs">
              <li>
                <strong className="text-white">Data shared with third parties:</strong> Limited to
                ad-serving data processed by the advertising SDK, as described in 3.2(d).
              </li>
              <li>
                <strong className="text-white">Personal data sold:</strong> None.
              </li>
              <li>
                <strong className="text-white">Data encrypted in transit:</strong> Yes, for any
                network communication performed by an SDK or the Apps.
              </li>
              <li>
                <strong className="text-white">Deletion request mechanism:</strong> Provided. See
                our{" "}
                <Link href="/delete-data" className="text-white underline hover:opacity-85">
                  Data Deletion page
                </Link>
                .
              </li>
              <li>
                <strong className="text-white">Account creation:</strong> Not required in any App.
              </li>
            </ul>
          </section>

          {/* 3.4 On-Device SQLite Storage */}
          <section>
            <h2 className="mb-3 text-lg font-medium text-white">3.4 On-Device SQLite Storage</h2>
            <p className="text-xs leading-relaxed">
              Each App stores its data in a private SQLite database inside the app&apos;s sandboxed
              storage. Other apps cannot read it, and it is not uploaded to our servers. You can
              erase it at any time through{" "}
              <strong className="text-white">
                Android Settings → Apps → [App name] → Storage → Clear data
              </strong>
              , or by uninstalling the App.
            </p>
          </section>

          {/* 3.5 Android Permissions Disclosure */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
            <h2 className="mb-3 text-lg font-medium text-white">
              3.5 Android Permissions Disclosure
            </h2>
            <p className="mb-3 text-xs text-[#8E8E8E]">
              We request the minimum permissions necessary.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2E2E2E] text-[#8E8E8E]">
                    <th className="pb-2 font-medium">Permission</th>
                    <th className="pb-2 font-medium">Why It May Be Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F] font-mono text-[11px] text-[#CCCCCC]">
                  <tr>
                    <td className="py-2.5 pr-4 text-white">INTERNET</td>
                    <td className="py-2.5 font-sans text-xs text-[#A1A1A1]">
                      Used only by the advertising SDK and for Google Play services. Core features
                      work without it.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-white">ACCESS_NETWORK_STATE</td>
                    <td className="py-2.5 font-sans text-xs text-[#A1A1A1]">
                      Lets the advertising SDK check whether a connection is available.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-white">VIBRATE (if used)</td>
                    <td className="py-2.5 font-sans text-xs text-[#A1A1A1]">
                      Optional haptic feedback on taps and moves.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[#8E8E8E]">
              We do <strong>not</strong> request access to your contacts, SMS, call logs, camera,
              microphone, precise or approximate location, photos, or files. You can review the
              permissions of any installed App in Android Settings.
            </p>
          </section>

          {/* 3.5.1 How We Use Information */}
          <section>
            <h2 className="mb-3 text-lg font-medium text-white">3.5.1 How We Use Information</h2>
            <ul className="list-inside list-disc space-y-1.5 text-xs">
              <li>To operate and maintain the Apps and Website</li>
              <li>To respond to support requests and grievances</li>
              <li>To keep the Apps secure and prevent abuse or fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-2 text-xs">
              We do not use your information to make automated decisions that have legal or
              similarly significant effects on you.
            </p>
          </section>

          {/* 3.6 & 3.7 */}
          <section className="space-y-4">
            <div>
              <h2 className="mb-2 text-lg font-medium text-white">3.6 No Sale of Personal Data</h2>
              <p className="text-xs">
                We do <strong>not</strong> sell, rent, or trade personal information. We do not
                share personal information with third parties for their own marketing.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-medium text-white">
                3.7 Disclosure to Third Parties
              </h2>
              <p className="text-xs">We disclose information only:</p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                <li>
                  to service providers acting on our behalf (such as the advertising SDK provider
                  and email hosting), bound by confidentiality and data protection obligations;
                </li>
                <li>when required by law, court order, or a lawful government request;</li>
                <li>to protect our rights, users, or the integrity of our Apps;</li>
                <li>
                  in connection with a merger, acquisition, or restructuring, with notice to users
                  where required.
                </li>
              </ul>
            </div>
          </section>

          {/* 3.8 Advertising Policy */}
          <section>
            <h2 className="mb-2 text-lg font-medium text-white">3.8 Advertising Policy</h2>
            <p className="text-xs leading-relaxed">
              Our advertising practices follow the Google Play Developer Program Policies, including
              the Ads policy and the Families Policy where applicable. We do not show deceptive ads,
              ads that mimic system notifications, or ads that interfere with gameplay controls. We
              do not use personal or sensitive data for ad targeting.
            </p>
          </section>

          {/* 3.9 Children's Privacy */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-medium text-white">
              3.9 Children&apos;s Privacy (COPPA &amp; Google Families Policy)
            </h2>
            <p className="mb-2 text-xs">
              Our Apps are general-audience utilities and games and are not designed to collect
              personal information from children.
            </p>
            <ul className="list-inside list-disc space-y-1.5 text-xs">
              <li>
                We do <strong>not</strong> knowingly collect personal information from children
                under 13 (or under 16 where applicable, or the minimum age in your country).
              </li>
              <li>
                For users identified as children, ads are served in a{" "}
                <strong className="text-white">child-directed, non-personalized</strong> manner and
                only from certified ad sources permitted under Google&apos;s Families Policy.
              </li>
              <li>
                We do not enable behavioral advertising, social features, or purchases directed at
                children without parental controls.
              </li>
              <li>
                If you believe a child has provided personal information to us, contact{" "}
                <a
                  href={`mailto:${siteConfig.company.supportEmail}`}
                  className="text-white underline hover:opacity-85"
                >
                  {siteConfig.company.supportEmail}
                </a>{" "}
                and we will delete it promptly.
              </li>
            </ul>
          </section>

          {/* 3.10 & 3.11 */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-2 text-sm font-medium text-white">3.10 Data Retention</h3>
              <ul className="list-inside list-disc space-y-1.5 text-xs">
                <li>
                  <strong className="text-white">On-device data:</strong> remains until you clear it
                  or uninstall the App.
                </li>
                <li>
                  <strong className="text-white">Support correspondence:</strong> retained for up to{" "}
                  <strong>24 months</strong> after resolution.
                </li>
                <li>
                  <strong className="text-white">Website server logs:</strong> retained for up to{" "}
                  <strong>90 days</strong>.
                </li>
              </ul>
            </div>

            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h3 className="mb-2 text-sm font-medium text-white">3.11 Security</h3>
              <p className="text-xs leading-relaxed">
                We apply reasonable technical and organizational safeguards, including private app
                storage, encrypted network connections where applicable, and limited access to
                support data. No method of electronic storage or transmission is 100% secure, but we
                rigorously protect your information.
              </p>
            </div>
          </section>

          {/* 3.12 Your Rights */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-medium text-white">3.12 Your Rights</h2>
            <div className="space-y-3 text-xs leading-relaxed">
              <p>
                <strong className="text-white">
                  Under India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act):
                </strong>{" "}
                you may request access to a summary of your personal data we process, correction or
                erasure, withdrawal of consent, and grievance redressal. You may also nominate
                another person to exercise your rights in case of death or incapacity.
              </p>
              <p>
                <strong className="text-white">Under the GDPR (EEA, UK):</strong> you have the right
                to access, rectify, erase, restrict, object to processing, and port your data, and
                to lodge a complaint with your local supervisory authority. Where we rely on
                consent, you may withdraw it at any time. Our lawful bases are consent, legitimate
                interests (operating and securing the Apps), and legal obligation.
              </p>
              <p>
                <strong className="text-white">Under the CCPA/CPRA (California):</strong> you have
                the right to know what personal information we collect, to request deletion, to
                correct inaccurate information, and to opt out of the sale or sharing of personal
                information.{" "}
                <strong className="text-white">
                  We do not sell or share personal information for cross-context behavioral
                  advertising.
                </strong>{" "}
                We will not discriminate against you for exercising these rights.
              </p>
              <div className="mt-4 border-t border-[#1F1F1F] pt-4">
                <p>
                  <strong className="text-white">How to exercise your rights:</strong> email{" "}
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}?subject=Privacy%20Request`}
                    className="text-white underline hover:opacity-85"
                  >
                    {siteConfig.company.supportEmail}
                  </a>{" "}
                  with the subject line &ldquo;Privacy Request&rdquo;, or use the form at{" "}
                  <Link href="/delete-data" className="text-white underline hover:opacity-85">
                    {siteConfig.url}/delete-data
                  </Link>
                  . We will respond within <strong>30 days</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* 3.13 to 3.15 */}
          <section className="space-y-3 text-xs">
            <p>
              <strong className="text-white">3.13 International Transfers:</strong> If you contact
              us from outside India, your message may be processed in India or by our service
              providers in other countries. Where required, we use appropriate safeguards for
              cross-border transfers.
            </p>
            <p>
              <strong className="text-white">3.14 Third-Party Links and Services:</strong> Our Apps
              and Website may link to third-party sites (for example, Google Play). We do not
              control and are not responsible for their privacy practices.
            </p>
            <p>
              <strong className="text-white">3.15 Changes to This Policy:</strong> We may update
              this Policy to reflect changes in our practices or the law. The &ldquo;Last
              Updated&rdquo; date above will change, and material changes will be announced on our
              Website and, where appropriate, within the Apps.
            </p>
          </section>

          {/* 3.16 Contact */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-lg font-medium text-white">3.16 Contact</h2>
            <div className="space-y-1.5 font-mono text-xs text-white">
              <p>Legal Entity: {siteConfig.company.legalName}</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${siteConfig.company.supportEmail}`}
                  className="underline hover:opacity-80"
                >
                  {siteConfig.company.supportEmail}
                </a>
              </p>
              <p>Website: {siteConfig.url}</p>
              <p>Registered Office: {siteConfig.company.registeredAddress}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
