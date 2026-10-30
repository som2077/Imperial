export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-launch-saas-fast-in-2026",
    title: "How to Launch a Profitable SaaS in Under 7 Days in 2026",
    description:
      "A complete tactical blueprint on leveraging pre-built boilerplates, AI tools, and Merchant of Record gateways to go from zero to revenue.",
    date: "October 10, 2026",
    readTime: "5 min read",
    author: {
      name: "Marc Dev",
      role: "Indie Founder",
    },
    content: `
Starting a software business used to take months of setting up authentication, databases, and billing pipelines. Today, the game has fundamentally changed.

### 1. Skip the Plumbing Work
Every SaaS requires the same fundamental building blocks: user authentication, a scalable database, billing/subscription portals, and transactional emails. Coding these from scratch for every new idea is the number one reason indie projects fail to ship.

By using an opinionated starter kit that couples **Next.js 16**, **Supabase Auth**, **Drizzle ORM**, and **Lemon Squeezy**, you save over 100 hours of development time.

### 2. Merchant of Record vs Direct Gateways
If you plan to sell globally, sales tax and VAT compliance can be a legal nightmare. Choosing a Merchant of Record (MoR) like Lemon Squeezy abstracts away international GST, VAT, and tax filing automatically.

### 3. Build in Public and Ship Fast
Focus 100% of your initial energy on validating the core value proposition. Talk to real users, track funnel analytics via PostHog, and iterate quickly based on usage data.
    `,
  },
  {
    slug: "why-drizzle-orm-is-taking-over",
    title: "Why Drizzle ORM is Replacing Traditional ORMs for Modern SaaS",
    description:
      "An engineering comparison of performance, serverless cold starts, and type safety between Drizzle and traditional ORMs.",
    date: "October 05, 2026",
    readTime: "4 min read",
    author: {
      name: "Alex Rivera",
      role: "Senior Full-Stack Engineer",
    },
    content: `
When building serverless and edge applications with Next.js, database access latency is the biggest bottleneck.

### Zero Cold-Start Overhead
Traditional ORMs carry a heavy runtime query engine that adds 150ms-300ms to serverless function cold starts. Drizzle ORM operates as a pure TypeScript-to-SQL compiler with zero heavy binaries.

### TypeScript-First Philosophy
With Drizzle, your SQL schema is defined directly in TypeScript (\`schema.ts\`). If you change a column type, TypeScript immediately flags every query across your entire codebase that might break.

### Conclusion
For modern full-stack web applications where speed and maintainability matter, Drizzle ORM paired with PostgreSQL is the gold standard.
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
