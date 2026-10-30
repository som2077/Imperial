import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/blog/posts";
import { ArrowLeft, Clock, Sparkles, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const ogParams = new URLSearchParams({
    title: post.title,
    description: post.description,
    badge: "Blog",
    author: post.author.name,
  });
  const ogImageUrl = `/api/og?${ogParams.toString()}`;

  return {
    title: `${post.title} | SaaS Starter Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold">
            <Sparkles className="text-primary h-5 w-5" />
            <span>SaaS Starter</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> All Articles
            </Link>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="container mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <article className="space-y-8">
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{post.description}</p>
            <div className="text-muted-foreground flex items-center gap-4 pt-2 text-xs">
              <div className="text-foreground flex items-center gap-1.5 font-medium">
                <User className="text-primary h-4 w-4" /> {post.author.name}
              </div>
              <span>•</span>
              <div>{post.date}</div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readTime}
              </div>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">
            {post.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-foreground mt-8 mb-4 text-xl font-bold">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="text-muted-foreground">
                  {paragraph.trim()}
                </p>
              );
            })}
          </div>
        </article>
      </main>
    </div>
  );
}
