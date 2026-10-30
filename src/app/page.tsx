import { ImperialNavbar } from "@/components/landing/imperial-navbar";
import { ImperialHero } from "@/components/landing/imperial-hero";
import { StudioMetrics } from "@/components/landing/studio-metrics";
import { AppsPortfolio } from "@/components/landing/apps-portfolio";
import { StudioStandards } from "@/components/landing/studio-standards";
import { StudioReleases } from "@/components/landing/studio-releases";
import { AboutStudio } from "@/components/landing/about-studio";
import { VerificationContact } from "@/components/landing/verification-contact";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { ImperialFooter } from "@/components/landing/imperial-footer";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground selection:bg-foreground selection:text-background flex min-h-screen flex-col">
      {/* Schema.org Organization Rich Snippets for Google Verification */}
      <JsonLd />

      {/* Minimalist Fixed Header */}
      <ImperialNavbar />

      {/* x.ai-Style Hero with Signature Modality Bento Grid */}
      <ImperialHero />

      {/* Hardware & Engineering Metric Banner (Colossus Inspired) */}
      <StudioMetrics />

      {/* Featured Apps Portfolio Catalog */}
      <AppsPortfolio />

      {/* High-Contrast Technical Standards & Security Benchmarks */}
      <StudioStandards />

      {/* Latest Studio News & Releases Feed */}
      <StudioReleases />

      {/* About Us (Corporate Identity, Legal Incorporation India, Core Values) */}
      <AboutStudio />

      {/* User Reviews & Google Play Feedback */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Verification Contact, Physical Address & Google Play Data Deletion Instructions */}
      <VerificationContact />

      {/* Structured Minimalist Footer */}
      <ImperialFooter />
    </div>
  );
}
