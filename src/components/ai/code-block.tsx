"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  language?: string;
  code: string;
}

export function CodeBlock({ language = "text", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="bg-muted/60 relative my-4 overflow-hidden rounded-xl border font-mono text-xs shadow-sm dark:bg-zinc-950">
      <div className="bg-muted/40 flex items-center justify-between border-b px-4 py-2 dark:bg-zinc-900/50">
        <span className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground h-7 gap-1.5 px-2 text-xs"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-medium text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      <div className="overflow-x-auto p-4 leading-relaxed">
        <pre className="text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
