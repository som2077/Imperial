import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service | Imperial Tech O.P.C.",
  description:
    "Official Terms of Service governing the use of Imperial Tech O.P.C. Android applications and services.",
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
      <main className="container mx-auto max-w-[840px] px-6 py-16 sm:py-24">
        <div className="mb-12">
          <div className="mb-3 font-mono text-xs tracking-[0.08em] text-[#6B6B6B] uppercase">
            Legal Agreement
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono text-xs text-[#6B6B6B]">
            Effective Date: 30 October 2026 • Last Updated: 30 October 2026
          </p>
        </div>

        <div className="space-y-10 text-sm leading-[1.65] text-[#A1A1A1]">
          {/* Preamble */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <p>
              These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) govern your use of the
              Android applications <strong>Universal Calculator World</strong>,{" "}
              <strong>Chess Pocket</strong>, and <strong>Sudoku Daily Puzzle</strong> (the &ldquo;
              <strong>Apps</strong>&rdquo;) and the website{" "}
              <a
                href={siteConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:opacity-80"
              >
                {siteConfig.url}
              </a>{" "}
              (the &ldquo;<strong>Website</strong>&rdquo;) provided by{" "}
              <strong>Imperial Tech O.P.C.</strong>, a company incorporated under the Companies Act,
              2013, India (&ldquo;<strong>Imperial Tech</strong>&rdquo;, &ldquo;
              <strong>we</strong>&rdquo;, &ldquo;<strong>us</strong>&rdquo;).
            </p>
            <p className="mt-3 text-xs text-[#8E8E8E]">
              By downloading, installing, or using the Apps or Website, you agree to these Terms. If
              you do not agree, do not use them.
            </p>
          </section>

          {/* 1. Agreement to Terms & Eligibility */}
          <section>
            <h2 className="mb-2 text-base font-medium text-white">
              1. Agreement to Terms &amp; Eligibility
            </h2>
            <p className="text-xs leading-relaxed">
              These Terms of Service constitute a legally binding agreement between you and Imperial
              Tech O.P.C. You must be legally able to enter into a binding contract. If you are
              under the age of majority in your jurisdiction, you may use the Apps only with the
              permission and supervision of a parent or legal guardian.
            </p>
          </section>

          {/* 2. License Grant */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
            <h2 className="mb-2 text-base font-medium text-white">2. License Grant</h2>
            <p className="text-xs leading-relaxed">
              Subject to these Terms, we grant you a{" "}
              <strong className="text-white">
                limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable
              </strong>{" "}
              license to install and use the Apps on Android devices that you own or control, for
              your personal, non-commercial use, and as permitted by the Google Play Terms of
              Service.
            </p>
          </section>

          {/* 3. Restrictions */}
          <section>
            <h2 className="mb-2 text-base font-medium text-white">3. Restrictions</h2>
            <p className="mb-2 text-xs">You agree not to:</p>
            <ul className="list-inside list-disc space-y-1.5 text-xs">
              <li>copy, modify, or create derivative works of the Apps;</li>
              <li>
                reverse engineer, decompile, or attempt to extract source code, except where
                applicable law expressly permits;
              </li>
              <li>remove or alter copyright, trademark, or other proprietary notices;</li>
              <li>rent, lease, sell, sublicense, or distribute the Apps;</li>
              <li>
                use the Apps to violate any law, or to interfere with or disrupt the Apps or related
                services;
              </li>
              <li>use automated means to manipulate ads, gameplay, or statistics.</li>
            </ul>
          </section>

          {/* 5.4 Intellectual Property */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
            <h2 className="mb-2 text-base font-medium text-white">5.4 Intellectual Property</h2>
            <p className="text-xs leading-relaxed">
              The Apps, including their code, design, graphics, text, chess engine implementation,
              puzzle content, and trademarks, are owned by Imperial Tech O.P.C. or its licensors and
              are protected by Indian and international intellectual property laws. No rights are
              granted other than those expressly stated in these Terms.
            </p>
          </section>

          {/* 5.5 to 5.8 */}
          <section className="space-y-4 text-xs">
            <div>
              <h2 className="mb-1 text-base font-medium text-white">
                5.5 Third-Party Components and Platforms
              </h2>
              <p>
                The Apps may include open-source or third-party components governed by their own
                licenses. Your use of Google Play is subject to Google&apos;s terms. We are not a
                party to your agreement with Google.
              </p>
            </div>

            <div>
              <h2 className="mb-1 text-base font-medium text-white">5.6 Privacy</h2>
              <p>
                Your use of the Apps is also governed by our{" "}
                <Link href="/privacy" className="text-white underline hover:opacity-85">
                  Privacy Policy
                </Link>
                , which forms part of these Terms.
              </p>
            </div>

            <div>
              <h2 className="mb-1 text-base font-medium text-white">5.7 Advertising</h2>
              <p>
                Some Apps may display advertisements. Ads are provided by third parties, and we are
                not responsible for their content, though we follow Google Play&apos;s Ads policy.
              </p>
            </div>

            <div>
              <h2 className="mb-1 text-base font-medium text-white">
                5.8 Updates and Availability
              </h2>
              <p>
                We may update, modify, suspend, or discontinue any App or feature at any time. Some
                updates may be required to continue using the App. We do not guarantee uninterrupted
                availability.
              </p>
            </div>
          </section>

          {/* 5.9 Disclaimer of Warranties */}
          <section className="rounded-[6px] border border-[#2E2E2E] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-base font-medium text-white">5.9 Disclaimer of Warranties</h2>
            <p className="font-mono text-xs leading-relaxed text-[#CCCCCC] uppercase">
              TO THE FULLEST EXTENT PERMITTED BY LAW, THE APPS AND WEBSITE ARE PROVIDED &ldquo;AS
              IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, ACCURACY, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APPS WILL BE
              ERROR-FREE OR UNINTERRUPTED, OR THAT CALCULATIONS, CONVERSIONS, OR ENGINE MOVES WILL
              BE FREE FROM ERROR.
            </p>
            <p className="mt-3 text-xs text-[#E5E5E5]">
              <strong>Universal Calculator World</strong> is intended for general convenience; you
              should independently verify results before relying on them for engineering, medical,
              financial, safety-critical, or legal purposes.
            </p>
          </section>

          {/* 5.10 Limitation of Liability */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-base font-medium text-white">5.10 Limitation of Liability</h2>
            <p className="font-mono text-xs leading-relaxed text-[#CCCCCC] uppercase">
              TO THE FULLEST EXTENT PERMITTED BY LAW, IMPERIAL TECH O.P.C., ITS DIRECTOR, EMPLOYEES,
              AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, DATA, GOODWILL, OR OTHER
              INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE
              APPS OR WEBSITE.
            </p>
            <p className="mt-3 text-xs text-[#A1A1A1]">
              Our total aggregate liability for all claims relating to the Apps shall not exceed the
              greater of (A) the amount you paid us for the App in the twelve (12) months before the
              claim, or (B) INR 1,000. Nothing in these Terms excludes liability that cannot be
              excluded under applicable law, including for fraud or willful misconduct.
            </p>
          </section>

          {/* 5.11 & 5.12 */}
          <section className="space-y-4 text-xs">
            <div>
              <h2 className="mb-1 text-base font-medium text-white">5.11 Indemnity</h2>
              <p>
                You agree to indemnify and hold harmless Imperial Tech O.P.C. from claims, losses,
                and expenses (including reasonable legal fees) arising from your breach of these
                Terms or misuse of the Apps.
              </p>
            </div>

            <div>
              <h2 className="mb-1 text-base font-medium text-white">5.12 Termination</h2>
              <p>
                These Terms apply until terminated. We may suspend or terminate your license
                immediately if you breach these Terms. You may terminate by uninstalling the Apps.
                Sections that by their nature should survive termination (including 5.4, 5.9, 5.10,
                5.11, and 5.13) will survive.
              </p>
            </div>
          </section>

          {/* 5.13 & 5.14 Governing Law & Arbitration */}
          <section className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6 sm:p-8">
            <h2 className="mb-3 text-base font-medium text-white">
              5.13 Governing Law and Jurisdiction
            </h2>
            <p className="text-xs leading-relaxed">
              These Terms are governed by the <strong className="text-white">laws of India</strong>,
              without regard to conflict-of-law principles. Subject to the dispute-resolution steps
              below, the{" "}
              <strong className="text-white">
                courts at the location of our registered office in India
              </strong>{" "}
              shall have exclusive jurisdiction. Nothing limits any non-waivable consumer rights you
              may have under the laws of your country of residence.
            </p>

            <h3 className="mt-4 mb-2 text-sm font-medium text-white">5.14 Dispute Resolution</h3>
            <p className="text-xs leading-relaxed">
              Before filing a claim, you agree to first contact{" "}
              <a
                href={`mailto:${siteConfig.company.supportEmail}`}
                className="text-white underline"
              >
                {siteConfig.company.supportEmail}
              </a>{" "}
              and give us 30 days to resolve the issue informally. Unresolved disputes may be
              referred to arbitration under the Arbitration and Conciliation Act, 1996, with a sole
              arbitrator, English as the language, and the seat at the location of our registered
              office.
            </p>
          </section>

          {/* 5.15 to 5.17 */}
          <section className="space-y-4 text-xs">
            <div>
              <h2 className="mb-1 text-base font-medium text-white">5.15 Changes to These Terms</h2>
              <p>
                We may revise these Terms from time to time. The updated version will be posted on
                this page with a new effective date. Continued use after changes means you accept
                them.
              </p>
            </div>

            <div>
              <h2 className="mb-1 text-base font-medium text-white">5.16 General</h2>
              <p>
                These Terms, with the Privacy Policy, form the entire agreement between you and us
                regarding the Apps. If any provision is held unenforceable, the rest remain in
                effect. Our failure to enforce a right is not a waiver. You may not assign these
                Terms without our consent; we may assign ours in connection with a merger,
                acquisition, or sale of assets.
              </p>
            </div>

            <div className="rounded-[6px] border border-[#1F1F1F] bg-[#0A0A0A] p-6">
              <h2 className="mb-2 text-base font-medium text-white">5.17 Contact</h2>
              <div className="space-y-1 font-mono text-xs text-white">
                <p>Legal Entity: {siteConfig.company.legalName}</p>
                <p>
                  Support Email:{" "}
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="underline hover:opacity-80"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </p>
                <p>Website: {siteConfig.url}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
