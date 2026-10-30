import { ImperialNavbar } from "@/components/landing/imperial-navbar";
import { ImperialHero } from "@/components/landing/imperial-hero";
import { StudioReleases } from "@/components/landing/studio-releases";
import { AppsPortfolio } from "@/components/landing/apps-portfolio";
import { StudioStandards } from "@/components/landing/studio-standards";
import { AboutStudio } from "@/components/landing/about-studio";
import { VerificationContact } from "@/components/landing/verification-contact";
import { ImperialFooter } from "@/components/landing/imperial-footer";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-sans text-white antialiased selection:bg-white selection:text-black">
      {/* Schema.org Organization JSON-LD for Google Verification */}
      <JsonLd />

      {/* 1. Header (Fixed, transparent → bg/80 + blur on scroll) */}
      <ImperialNavbar />

      {/* 2. Hero (Huge headline, muted subtext, primary CTA + arrow link) */}
      <ImperialHero />

      {/* 3. News / Updates list (Mono uppercase date + title + arrow, hairline borders) */}
      <StudioReleases />

      {/* 4. Feature blocks (Stacked clean app showcases, no heavy decoration) */}
      <AppsPortfolio />

      {/* 5. Engineering Standards (4 specifications, APK manifest security audit) */}
      <StudioStandards />

      {/* 6. About Us (Corporate entity, legal incorporation India, 3 core values) */}
      <AboutStudio />

      {/* 7. Legal & Contact (Physical registered address, support email, data deletion) */}
      <VerificationContact />

      {/* 8. Footer (Multi-column links, hairline border, copyright in text-subtle) */}
      <ImperialFooter />
    </div>
  );
}
