"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_ARTICLES } from "@/lib/docs";
import { CommandPaletteTrigger } from "@/components/command-palette";
import { ChevronRight } from "lucide-react";

export function DocsSidebar() {
  const pathname = usePathname();

  // Group by category
  const categories = Array.from(new Set(DOC_ARTICLES.map((d) => d.category)));

  return (
    <aside className="w-full shrink-0 space-y-6 pr-4 md:w-64">
      <div className="pb-2">
        <CommandPaletteTrigger />
      </div>

      <nav className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-2">
            <h4 className="text-muted-foreground px-2 text-xs font-bold tracking-wider uppercase">
              {category}
            </h4>
            <div className="space-y-1">
              {DOC_ARTICLES.filter((d) => d.category === category).map((doc) => {
                const isActive =
                  pathname === `/docs/${doc.slug}` ||
                  (pathname === "/docs" && doc.slug === "getting-started");

                return (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <span className="truncate">{doc.title}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
