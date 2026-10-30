import { notFound } from "next/navigation";
import Link from "next/link";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ai/code-block";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return { title: "Article Not Found | Documentation" };
  }

  const ogParams = new URLSearchParams({
    title: doc.title,
    description: doc.description,
    badge: doc.category,
    author: "Documentation",
  });
  const ogImageUrl = `/api/og?${ogParams.toString()}`;

  return {
    title: `${doc.title} | SaaS Documentation`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: doc.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [ogImageUrl],
    },
  };
}

export default async function DocArticlePage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <div className="space-y-10">
      {/* Article Header */}
      <div className="space-y-3 border-b pb-6">
        <Badge variant="outline" className="text-xs">
          {doc.category}
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{doc.title}</h1>
        <p className="text-muted-foreground text-base leading-relaxed">{doc.description}</p>
        <div className="text-muted-foreground flex items-center gap-1.5 pt-1 text-xs">
          <Clock className="h-3.5 w-3.5" />
          <span>{doc.readTime}</span>
        </div>
      </div>

      {/* Article Content */}
      <div className="text-muted-foreground space-y-6 text-sm leading-relaxed">
        {doc.content.split("\n\n").map((section, idx) => {
          if (section.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-foreground mt-6 mb-2 text-lg font-bold">
                {section.replace("### ", "")}
              </h3>
            );
          }

          if (section.startsWith("```")) {
            const lines = section.slice(3, -3).trim().split("\n");
            const lang = lines[0].trim();
            const code = lines.slice(1).join("\n");
            return <CodeBlock key={idx} language={lang || "typescript"} code={code} />;
          }

          return (
            <p key={idx} className="leading-relaxed whitespace-pre-wrap">
              {section}
            </p>
          );
        })}
      </div>

      {/* Prev / Next Pagination */}
      <div className="flex items-center justify-between gap-4 border-t pt-8">
        {prevDoc ? (
          <Link
            href={`/docs/${prevDoc.slug}`}
            className="hover:border-primary/50 flex max-w-[45%] flex-col gap-1 rounded-xl border p-3 text-left transition-colors"
          >
            <span className="text-muted-foreground flex items-center gap-1 text-[10px] uppercase">
              <ArrowLeft className="h-3 w-3" /> Previous
            </span>
            <span className="text-foreground truncate text-xs font-semibold">{prevDoc.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextDoc ? (
          <Link
            href={`/docs/${nextDoc.slug}`}
            className="hover:border-primary/50 ml-auto flex max-w-[45%] flex-col gap-1 rounded-xl border p-3 text-right transition-colors"
          >
            <span className="text-muted-foreground flex items-center justify-end gap-1 text-[10px] uppercase">
              Next <ArrowRight className="h-3 w-3" />
            </span>
            <span className="text-foreground truncate text-xs font-semibold">{nextDoc.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
