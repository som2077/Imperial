import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { VerificationContact } from "@/components/landing/verification-contact";

export const metadata = {
  title: "Contact & Developer Support Desk | Imperial Tech O.P.C.",
  description:
    "Official developer support desk, grievance redressal, and Google Play Console organization verification contacts for Imperial Tech O.P.C.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
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
      <main className="py-8">
        <VerificationContact />
      </main>
    </div>
  );
}
