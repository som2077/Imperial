import { ImperialNavbar } from "@/components/landing/imperial-navbar";
import { ImperialHero } from "@/components/landing/imperial-hero";
import { AppsPortfolio } from "@/components/landing/apps-portfolio";
import { StudioStandards } from "@/components/landing/studio-standards";
import { AboutStudio } from "@/components/landing/about-studio";
import { VerificationContact } from "@/components/landing/verification-contact";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { ImperialFooter } from "@/components/landing/imperial-footer";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 flex min-h-screen flex-col">
      {/* JSON-LD Rich Snippets for SEO & Google Verification */}
      <JsonLd />

      {/* Sticky Responsive Header */}
      <ImperialNavbar />

      {/* Hero Section with Vibrant Aura Mesh & Floating Studio Showcase */}
      <ImperialHero />

      {/* Featured Apps Portfolio Catalog */}
      <AppsPortfolio />

      {/* High-Contrast Technical Standards & Security Benchmarks */}
      <StudioStandards />

      {/* About Us (Corporate Identity, Legal Incorporation India, Core Values) */}
      <AboutStudio />

      {/* User Reviews & Google Play Feedback */}
      <TestimonialsSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Verification Contact, Physical Address & Google Play Data Deletion Instructions */}
      <VerificationContact />

      {/* Luminous Call-to-Action & Clean 5-Column Studio Footer */}
      <ImperialFooter />
    </div>
  );
}
