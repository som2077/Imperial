import Link from "next/link";
import { getAllPosts } from "@/lib/blog/posts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
  title: "Blog & Guides",
  description:
    "Insights, guides, and tactical advice on building and scaling modern SaaS businesses.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

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
              href="/"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="mb-3">
            <BookOpen className="mr-1 h-3 w-3" /> Engineering & Growth
          </Badge>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight">The SaaS Playbook</h1>
          <p className="text-muted-foreground">
            Practical guides and tactical advice on software development, growth, and indie hacking.
          </p>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card className="py-12 text-center">
              <CardContent className="space-y-2">
                <BookOpen className="text-muted-foreground/40 mx-auto h-8 w-8" />
                <p className="text-sm font-semibold">No articles published yet</p>
                <p className="text-muted-foreground text-xs">
                  Check back soon for new playbooks and guides.
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="hover:border-primary/50 group cursor-pointer transition-colors">
                  <CardHeader>
                    <div className="text-muted-foreground mb-2 flex items-center gap-3 text-xs">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-primary text-2xl transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-base leading-relaxed">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-primary flex items-center justify-between pt-0 text-sm font-medium">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
