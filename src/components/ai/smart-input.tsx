"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Square } from "lucide-react";

interface SmartInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function SmartInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  placeholder = "Ask anything or execute a task...",
}: SmartInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) {
        onSubmit();
      }
    }
  }

  return (
    <div className="bg-background focus-within:ring-ring relative rounded-2xl border p-2 shadow-xs transition-all focus-within:ring-1">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="placeholder:text-muted-foreground max-h-48 w-full resize-none overflow-y-auto bg-transparent px-3 py-2 text-sm leading-relaxed outline-none"
      />

      <div className="border-muted/40 flex items-center justify-between border-t px-2 pt-1">
        <span className="text-muted-foreground text-[11px]">
          Press <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to
          send,{" "}
          <kbd className="bg-muted rounded px-1 py-0.5 font-mono text-[10px]">Shift+Enter</kbd> for
          newline
        </span>

        {isLoading ? (
          <Button
            size="icon"
            type="button"
            variant="destructive"
            onClick={onStop}
            className="h-8 w-8 rounded-full shadow-xs"
            title="Stop generating"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            <span className="sr-only">Stop</span>
          </Button>
        ) : (
          <Button
            size="icon"
            type="button"
            disabled={!value.trim()}
            onClick={onSubmit}
            className="h-8 w-8 rounded-full shadow-xs"
            title="Send prompt"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        )}
      </div>
    </div>
  );
}
