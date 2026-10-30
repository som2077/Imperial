import Link from "next/link";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/ai/code-block";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const metadata = {
  title: "Documentation | Architecture & Setup Guides",
  description: "Complete developer guides, architectural overviews, and API references.",
};

export default function DocsPage() {
  const doc = getDocBySlug("getting-started");
  const allDocs = getAllDocs().filter((d) => d.slug !== "getting-started");

  if (!doc) return null;

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
            return <CodeBlock key={idx} language={lang || "bash"} code={code} />;
          }

          return (
            <p key={idx} className="leading-relaxed whitespace-pre-wrap">
              {section}
            </p>
          );
        })}
      </div>

      {/* Explore More Guides */}
      <div className="space-y-4 border-t pt-8">
        <h3 className="text-foreground flex items-center gap-2 text-base font-bold">
          <BookOpen className="text-primary h-4 w-4" /> Next Guides in Documentation
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allDocs.map((item) => (
            <Link key={item.slug} href={`/docs/${item.slug}`}>
              <Card className="hover:border-primary/50 group h-full transition-colors">
                <CardHeader className="p-4">
                  <span className="text-primary text-[10px] font-bold uppercase">
                    {item.category}
                  </span>
                  <CardTitle className="group-hover:text-primary flex items-center justify-between text-sm font-semibold transition-colors">
                    <span>{item.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 text-xs">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
