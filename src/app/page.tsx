import { BentoGrid } from "@/components/landing/bento-grid";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { CodeShowcase } from "@/components/landing/code-showcase";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { FAQSection } from "@/components/landing/faq";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { TemplateShowcase } from "@/components/landing/template-showcase";
import { Navbar } from "@/components/landing/navbar";
import { StarterKitHero } from "@/components/landing/starter-kit-hero";
import { BackboneFooter } from "@/components/landing/backbone-footer";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/20 flex min-h-screen flex-col">
      {/* JSON-LD Rich Snippets for SEO */}
      <JsonLd />

      {/* Modern High-Contrast Navigation Header */}
      <Navbar />

      {/* High-Converting Starter Kit Hero Section */}
      <StarterKitHero />

      {/* Dedicated Commercial Template Showcase Catalog */}
      <TemplateShowcase />

      {/* Modern Interactive Bento Grid Feature Showcase */}
      <BentoGrid />

      {/* 3-Step Production Flow */}
      <HowItWorksSection />

      {/* Interactive Code Architecture Showcase */}
      <CodeShowcase />

      {/* Commercial Comparison Matrix */}
      <ComparisonSection />

      {/* Wall of Love / Testimonials Section */}
      <TestimonialsSection />

      {/* Interactive FAQ Section */}
      <FAQSection />

      {/* Backbone-Style High-Contrast Footer */}
      <BackboneFooter />
    </div>
  );
}
