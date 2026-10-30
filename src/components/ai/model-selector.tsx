"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Zap } from "lucide-react";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  badge: string;
}

export const AVAILABLE_MODELS: AIModel[] = [
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    badge: "Fast & Light",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    badge: "Most Capable",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    badge: "Best for Code",
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    badge: "Long Context",
  },
];

interface ModelSelectorProps {
  value: string;
  onChange: (val: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const currentModel = AVAILABLE_MODELS.find((m) => m.id === value) || AVAILABLE_MODELS[0];

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="bg-background hover:bg-muted/50 inline-flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-xs transition-colors outline-none">
        <div className="flex items-center gap-1.5">
          <Zap className="text-primary h-3.5 w-3.5" />
          <Select.Value>{currentModel.name}</Select.Value>
        </div>
        <Select.Icon>
          <ChevronDown className="text-muted-foreground h-3 w-3" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 z-50 min-w-[200px] rounded-xl border p-1 shadow-lg">
          <Select.Viewport className="space-y-1 p-1">
            {AVAILABLE_MODELS.map((m) => (
              <Select.Item
                key={m.id}
                value={m.id}
                className="hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent flex cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-xs outline-none"
              >
                <div className="flex flex-col text-left">
                  <Select.ItemText className="font-semibold">{m.name}</Select.ItemText>
                  <span className="text-muted-foreground text-[10px]">{m.badge}</span>
                </div>
                <Select.ItemIndicator>
                  <Check className="text-primary h-3.5 w-3.5" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
