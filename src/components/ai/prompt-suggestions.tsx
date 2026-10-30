"use client";

import { BarChart3, Mail, Code2, Lightbulb } from "lucide-react";

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

export const DEFAULT_SUGGESTIONS = [
  {
    icon: BarChart3,
    title: "Check SaaS Metrics",
    prompt:
      "Can you run the SaaS metrics tool and give me an overview of our MRR and active subscribers?",
  },
  {
    icon: Mail,
    title: "Draft Onboarding Email",
    prompt:
      "Write a high-converting welcome email for a user who just signed up for our SaaS starter kit.",
  },
  {
    icon: Code2,
    title: "Explain Drizzle Schema",
    prompt: "Show me a TypeScript code example of a Drizzle ORM query with relational joins.",
  },
  {
    icon: Lightbulb,
    title: "Pricing Strategy Idea",
    prompt:
      "Suggest three pricing tiers for a B2B AI tool with feature limits and Lemon Squeezy variants.",
  },
];

export function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="my-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {DEFAULT_SUGGESTIONS.map((item, idx) => {
        const Icon = item.icon;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onSelect(item.prompt)}
            className="bg-card hover:bg-accent/50 hover:border-primary/40 group flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-left shadow-xs transition-all"
          >
            <div className="bg-primary/10 text-primary mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-foreground group-hover:text-primary text-xs font-semibold transition-colors">
                {item.title}
              </p>
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[11px]">{item.prompt}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
