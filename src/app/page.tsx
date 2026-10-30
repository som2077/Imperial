import { ImperialNavbar } from "@/components/landing/imperial-navbar";
import { ImperialHero } from "@/components/landing/imperial-hero";
import { StudioReleases } from "@/components/landing/studio-releases";
import { StudioStandards } from "@/components/landing/studio-standards";
import { AboutStudio } from "@/components/landing/about-studio";
import { VerificationContact } from "@/components/landing/verification-contact";
import { ImperialFooter } from "@/components/landing/imperial-footer";

export default function HomePage() {
  return (
    <div
      suppressHydrationWarning
      className="flex min-h-screen flex-col bg-black font-sans text-white antialiased selection:bg-white selection:text-black"
    >
      {/* 1. Header (Fixed, transparent → bg/80 + blur on scroll) */}
      <ImperialNavbar />

      {/* 2. Hero (Huge headline, muted subtext, primary CTA + arrow link) */}
      <ImperialHero />

      {/* 3. News / Updates cards */}
      <StudioReleases />

      {/* 4. Engineering Standards (4 specifications, APK manifest security audit) */}
      <StudioStandards />

      {/* 5. About Us (Corporate entity, legal incorporation India, 3 core values) */}
      <AboutStudio />

      {/* 6. Legal & Contact (Physical registered address, support email, data deletion) */}
      <VerificationContact />

      {/* 7. Footer (Multi-column links, hairline border, copyright in text-subtle) */}
      <ImperialFooter />
    </div>
  );
}
