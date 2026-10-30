"use client";

import { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Brain, ChevronDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReasoningDisplayProps {
  reasoning: string;
  durationSeconds?: number;
}

export function ReasoningDisplay({ reasoning, durationSeconds = 2.4 }: ReasoningDisplayProps) {
  const [open, setOpen] = useState(false);

  if (!reasoning) return null;

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="border-primary/20 bg-primary/5 my-3 overflow-hidden rounded-lg border text-xs dark:bg-zinc-900/40"
    >
      <Collapsible.Trigger className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between px-3.5 py-2 text-left font-medium transition-colors">
        <div className="flex items-center gap-2">
          <Brain className="text-primary h-4 w-4" />
          <span className="text-foreground font-semibold">Thought Process</span>
          <Badge variant="outline" className="border-primary/20 h-4 px-1.5 py-0 text-[10px]">
            <Sparkles className="text-primary mr-1 h-2.5 w-2.5" /> {durationSeconds}s
          </Badge>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Collapsible.Trigger>

      <Collapsible.Content className="bg-background/50 text-muted-foreground border-t px-3.5 py-3 font-sans text-xs leading-relaxed whitespace-pre-wrap">
        {reasoning}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
