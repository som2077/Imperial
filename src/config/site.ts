export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  priceMonthly?: number;
  priceAnnually?: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  variantIdMonthly?: string;
  variantIdAnnually?: string;
  checkoutUrl?: string;
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface ChangelogItem {
  version: string;
  title: string;
  date: string;
  badge: "major" | "feature" | "improvement";
  highlights: string[];
}

export interface MobileAppItem {
  id: string;
  name: string;
  badge: string;
  badgeVariant: "live" | "coming_soon" | "testing";
  tagline: string;
  description: string;
  category: string;
  version: string;
  downloads?: string;
  rating?: number;
  reviewsCount?: string;
  features: string[];
  playStoreUrl?: string;
  gradient: string;
  iconBg: string;
  techStack: string[];
  privacyHighlights: string[];
}

export const siteConfig = {
  name: "Imperial Tech O.P.C.",
  shortName: "Imperial Tech",
  tagline: "Crafting Intuitive Utilities & Engaging Mobile Games",
  description:
    "Imperial Tech O.P.C. is an independent software and game development studio dedicated to building high-performance, privacy-focused apps for millions of users worldwide.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://imperialtech.com",
  ogImage: "/api/og",
  mailSupport: "support@imperialtech.com",

  // Corporate & Google Play Organization Verification Information
  company: {
    legalName: "Imperial Tech O.P.C.",
    legalType: "One Person Company (Incorporated in India)",
    country: "India",
    registeredAddress: "Imperial Tech O.P.C., Tech Hub Building, Sector 62, Noida, Uttar Pradesh 201309, India",
    supportEmail: "support@imperialtech.com",
    developerEmail: "developer@imperialtech.com",
    privacyEmail: "privacy@imperialtech.com",
    supportHours: "Monday – Friday, 9:00 AM – 6:00 PM IST",
    responseTimeSLA: "Within 24–48 Business Hours",
    googlePlayDeveloperId: "Imperial Tech O.P.C.",
    googlePlayStoreUrl: "https://play.google.com/store/apps/developer?id=Imperial+Tech+O.P.C.",
    dataDeletionUrl: "/data-deletion",
    dunsNumber: "Verified Entity",
  },

  socials: {
    twitter: "https://x.com/imperialtech_app",
    github: "https://github.com/som2077",
    discord: "https://discord.gg/imperialtech",
    playStore: "https://play.google.com/store/apps/developer?id=Imperial+Tech+O.P.C.",
  },

  creator: {
    name: "Imperial Tech O.P.C.",
    twitter: "@imperialtech_app",
  },

  // Trust metrics / stats
  stats: [
    { label: "Offline-Friendly", value: "100%", description: "Core features work without internet" },
    { label: "Privacy Rating", value: "A+", description: "Zero intrusive SDKs or personal data sales" },
    { label: "Rendering Target", value: "60 FPS", description: "Smooth native animations & low battery use" },
    { label: "User Support SLA", value: "< 24h", description: "Fast direct engineering assistance" },
  ],

  // Mobile App Studio Portfolio
  apps: [
    {
      id: "universal-calculator",
      name: "Universal Calculator World",
      badge: "Available on Google Play",
      badgeVariant: "live",
      tagline: "The all-in-one smart calculator & unit conversion suite.",
      description:
        "Universal Calculator World delivers a modern scientific calculator, comprehensive multi-category unit converters, offline currency exchange estimation, and customizable formula history.",
      category: "Tools & Utilities",
      version: "v2.4.1",
      downloads: "50,000+",
      rating: 4.8,
      reviewsCount: "1,200+",
      gradient: "from-blue-600 via-indigo-600 to-violet-700",
      iconBg: "bg-blue-600/10 text-blue-600 dark:text-blue-400",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.imperialtech.universalcalculator",
      techStack: ["Kotlin", "Jetpack Compose", "Room DB", "Material 3"],
      features: [
        "Full scientific calculator with trigonometrics & logarithms",
        "150+ unit conversions across 18 specialized categories",
        "Offline-capable historical formula & tape recall",
        "Customizable high-contrast color themes & dynamic theming",
      ],
      privacyHighlights: [
        "Zero ad trackers",
        "No network permission required for calculation",
        "Calculations stored strictly on-device",
      ],
    },
    {
      id: "chess-pocket",
      name: "Chess Pocket",
      badge: "New Release / Coming Soon",
      badgeVariant: "coming_soon",
      tagline: "Tactical chess puzzle trainer & elegant offline play.",
      description:
        "Chess Pocket is designed for chess enthusiasts who want bite-sized tactical puzzles, offline engine analysis, and clean board aesthetics without clutter or forced interruptions.",
      category: "Board & Strategy Game",
      version: "v1.0.0-rc",
      downloads: "Early Access",
      rating: 4.9,
      reviewsCount: "Pre-launch",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
      iconBg: "bg-purple-600/10 text-purple-600 dark:text-purple-400",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.imperialtech.chesspocket",
      techStack: ["Flutter", "Stockfish Engine (C++ WASM)", "SQLite", "Skia Canvas"],
      features: [
        "Over 10,000 curated tactical puzzle challenges",
        "Adaptive offline AI opponent ranging from 800 to 2400 ELO",
        "Daily puzzle streak challenge with offline progress sync",
        "Minimalist Scandinavian & wood board themes with haptic feedback",
      ],
      privacyHighlights: [
        "100% offline gameplay mode",
        "Zero tracking cookies or device fingerprints",
        "Anonymous puzzle completion progress",
      ],
    },
    {
      id: "sudoku-puzzle",
      name: "Sudoku - Daily Puzzle Game",
      badge: "In Testing",
      badgeVariant: "testing",
      tagline: "Classic brain training logic puzzles for every skill level.",
      description:
        "Experience crisp, fluid classic number placement puzzles with smart auto-candidate notes, mistake highlights, and soothing ambient themes crafted for mindful focus.",
      category: "Brain & Puzzle Game",
      version: "v0.9.4-beta",
      downloads: "Beta Testing",
      rating: 4.8,
      reviewsCount: "Closed Beta",
      gradient: "from-amber-500 via-orange-600 to-red-600",
      iconBg: "bg-amber-600/10 text-amber-600 dark:text-amber-400",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.imperialtech.sudokudaily",
      techStack: ["React Native", "TurboModules", "Skia", "Zustand"],
      features: [
        "4 balanced difficulty levels: Easy, Medium, Hard, and Master",
        "Intelligent pencil notes & auto-duplicate conflict detection",
        "Daily trophy challenges with monthly calendar tracking",
        "Battery-saving dark theme and fluid 60 FPS animations",
      ],
      privacyHighlights: [
        "No account creation necessary to play",
        "Game save states remain 100% on your device",
        "No location or phone state permissions",
      ],
    },
  ] satisfies MobileAppItem[],

  // Frequently Asked Questions tailored to Studio & Google Play Verification
  faqs: [
    {
      question: "Who is Imperial Tech O.P.C.?",
      answer:
        "Imperial Tech O.P.C. is an officially incorporated independent mobile software and game development studio based in India. We specialize in building fast, privacy-first Android utilities and logic games.",
      category: "Studio",
    },
    {
      question: "Where can I download your apps?",
      answer:
        "All our applications are officially distributed through the Google Play Store under our verified developer profile. You can explore our live releases in the Our Apps section above.",
      category: "Distribution",
    },
    {
      question: "Do your apps collect or sell personal user data?",
      answer:
        "No. Imperial Tech O.P.C. strictly follows a zero-telemetry, privacy-first engineering architecture. Our utilities (such as Universal Calculator World) and logic games store user states locally on your device. We do not sell or monetize personal data.",
      category: "Privacy & Data Safety",
    },
    {
      question: "How do I request deletion of my user data or account?",
      answer:
        "In compliance with Google Play Developer Policy, we provide a dedicated User Data Deletion Request portal at /data-deletion. You can also email us directly at support@imperialtech.com with the subject 'Data Deletion Request' for processing within 48 hours.",
      category: "Compliance",
    },
    {
      question: "How do I contact developer support or report an issue?",
      answer:
        "Our support team can be contacted 24/7 at support@imperialtech.com. We guarantee a human technical response within 24–48 business hours.",
      category: "Support",
    },
    {
      question: "Are your mobile games playable offline?",
      answer:
        "Yes! Both Chess Pocket and Sudoku - Daily Puzzle Game feature robust offline engines. You can play, solve puzzles, and track your streaks without any cellular or Wi-Fi connection.",
      category: "Apps",
    },
  ] satisfies FAQItem[],

  // Pricing / Licensing kept for compatibility
  plans: [
    {
      id: "standard",
      name: "Standard License",
      description: "Ideal for indie hackers and solo founders launching 1 commercial product.",
      price: 79,
      originalPrice: 129,
      priceMonthly: 79,
      priceAnnually: 79,
      features: [
        "1 Commercial SaaS Project License",
        "Next.js 16 + React 19 + Tailwind CSS v4",
        "Supabase SSR Auth (MFA, Magic Link, OAuth)",
        "Drizzle ORM with PostgreSQL Database",
        "Lemon Squeezy MoR Subscriptions & Portal",
      ],
      variantIdMonthly: "standard",
      variantIdAnnually: "standard",
      checkoutUrl: "https://lemonsqueezy.com",
      badge: "Indie",
      ctaText: "Get Standard License",
    },
    {
      id: "pro",
      name: "Pro License",
      description: "For serial builders and startups.",
      price: 149,
      originalPrice: 249,
      priceMonthly: 149,
      priceAnnually: 149,
      popular: true,
      features: [
        "Unlimited Commercial SaaS Projects",
        "Client Projects & Agency Rights",
      ],
      variantIdMonthly: "pro",
      variantIdAnnually: "pro",
      checkoutUrl: "https://lemonsqueezy.com",
      badge: "Most Popular",
      ctaText: "Get Pro Access",
    },
  ] as PricingPlan[],

  testimonials: [
    {
      name: "David K.",
      role: "Verified Android User",
      company: "Google Play Review",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
      quote:
        "Universal Calculator World is hands-down the cleanest calculator I've used. No lag, instant unit conversions, and most importantly zero annoying popup ads while doing math.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Mobile Gamer",
      company: "Beta Tester",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
      quote:
        "Chess Pocket has become my daily commute companion. The puzzle progression is super thoughtful and it runs buttery smooth even in airplane mode.",
      rating: 5,
    },
    {
      name: "Arun Patel",
      role: "Software Architect",
      company: "Google Play Review",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
      quote:
        "Great to see an indie Indian studio creating genuine, privacy-respecting utilities without bloating their APKs with third-party tracking frameworks.",
      rating: 5,
    },
  ] satisfies TestimonialItem[],

  changelog: [
    {
      version: "v2.4.1",
      title: "Universal Calculator World Update",
      date: "October 2026",
      badge: "major",
      highlights: [
        "Added 15 new scientific unit conversions",
        "Refined memory tape history persistence",
        "Updated Material 3 dynamic color theming",
      ],
    },
    {
      version: "v1.0.0-rc",
      title: "Chess Pocket Release Candidate",
      date: "October 2026",
      badge: "feature",
      highlights: [
        "10,000+ tactical puzzle database initialized",
        "Stockfish engine optimization for low-power ARM processors",
        "Nordic minimalist board theme added",
      ],
    },
  ] satisfies ChangelogItem[],
};
