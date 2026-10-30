"use client";

import { useState, useRef, useEffect } from "react";
import { ModelSelector } from "@/components/ai/model-selector";
import { PromptSuggestions } from "@/components/ai/prompt-suggestions";
import { SmartInput } from "@/components/ai/smart-input";
import { CodeBlock } from "@/components/ai/code-block";
import { ReasoningDisplay } from "@/components/ai/reasoning-display";
import { SaaSMetricsWidget } from "@/components/ai/generative-tools";
import { Bot, User, Sparkles, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
  reasoning?: string;
  toolWidget?: "metrics" | "pricing";
}

export default function AIStudioPage() {
  const [modelId, setModelId] = useState("gpt-4o-mini");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to the AI Studio! I am equipped with the Vercel AI SDK, Tool Calling, and streaming components. What would you like to build or explore?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as tokens stream
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(textToSend?: string) {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Check if prompt triggered tools locally for mock demo
    const triggersMetrics =
      text.toLowerCase().includes("metric") || text.toLowerCase().includes("mrr");

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, modelId }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMessage = "OpenAI API Key required in .env.local";
        try {
          const errorData = await response.json();
          if (errorData.error) errorMessage = errorData.error;
        } catch {
          // fallback if response is not JSON
        }
        toast.error(errorMessage);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            reasoning:
              "Checked system environment variables for OPENAI_API_KEY. Found placeholder. Gracefully switching to demo response mode.",
            content:
              "⚠️ Notice: To connect live OpenAI / Anthropic models, please add your `OPENAI_API_KEY` to `.env.local`.\n\nHere is a live demonstration of what the AI code block and Generative UI components look like:",
            toolWidget: triggersMetrics ? "metrics" : undefined,
          },
        ]);
        setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
          toolWidget: triggersMetrics ? "metrics" : undefined,
        },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantResponse += chunk;

          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: assistantResponse,
            };
            return copy;
          });
        }
      }

      // Safeguard against empty stream ending with a perpetual spinner
      if (!assistantResponse.trim()) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            ...copy[copy.length - 1],
            content:
              "⚠️ No response stream received from the AI model. Please verify your OPENAI_API_KEY has active credits and proper permissions.",
          };
          return copy;
        });
      }
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      if (isAbort) {
        toast.info("Generation stopped.");
      } else {
        toast.error("Network error while connecting to AI route.");
        setMessages((prev) => {
          const copy = [...prev];
          if (
            copy.length > 0 &&
            copy[copy.length - 1].role === "assistant" &&
            !copy[copy.length - 1].content
          ) {
            copy[copy.length - 1] = {
              ...copy[copy.length - 1],
              content: "⚠️ Connection interrupted or failed. Please try again.",
            };
          }
          return copy;
        });
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }

  function handleStop() {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  function handleClear() {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared. What would you like to explore next?",
      },
    ]);
  }

  // Render message content with CodeBlocks if ``` is present
  function renderContent(content: string) {
    if (content.includes("```")) {
      const parts = content.split(/(```[\s\S]*?```)/g);
      return parts.map((part, idx) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          const firstLine = lines[0].trim();
          const language = firstLine.match(/^[a-zA-Z0-9]+$/) ? firstLine : "code";
          const code = (language !== "code" ? lines.slice(1) : lines).join("\n");
          return <CodeBlock key={idx} language={language} code={code} />;
        }
        return (
          <p key={idx} className="leading-relaxed whitespace-pre-wrap">
            {part}
          </p>
        );
      });
    }

    return <p className="leading-relaxed whitespace-pre-wrap">{content}</p>;
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] max-w-5xl flex-col">
      {/* Studio Header */}
      <div className="flex shrink-0 items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-xs">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Studio</h1>
            <p className="text-muted-foreground text-xs">
              Vercel AI SDK 4.0 • Tool Calling & Generative UI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ModelSelector value={modelId} onChange={setModelId} />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            title="Clear Chat"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 space-y-6 overflow-y-auto py-6 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 text-sm ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="bg-primary/10 text-primary mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-xs">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "bg-card text-card-foreground border shadow-xs"
              }`}
            >
              {msg.reasoning && <ReasoningDisplay reasoning={msg.reasoning} />}

              {msg.content ? (
                renderContent(msg.content)
              ) : (
                <span className="text-muted-foreground flex items-center gap-2 py-1 text-xs italic">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating response...
                </span>
              )}

              {msg.toolWidget === "metrics" && (
                <SaaSMetricsWidget
                  data={{
                    mrr: 14820,
                    activeUsers: 842,
                    churnRate: "1.4%",
                    growth: "+28.4% MoM",
                  }}
                />
              )}
            </div>

            {msg.role === "user" && (
              <div className="bg-muted text-muted-foreground mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-xs">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {messages.length === 1 && (
          <div className="pt-4">
            <p className="text-muted-foreground mb-2 text-xs font-medium">
              Suggested Prompts & Actions:
            </p>
            <PromptSuggestions onSelect={(p) => handleSend(p)} />
          </div>
        )}

        <div ref={scrollAnchorRef} />
      </div>

      {/* Input Footer Area */}
      <div className="shrink-0 pt-3">
        <SmartInput
          value={input}
          onChange={setInput}
          onSubmit={() => handleSend()}
          onStop={handleStop}
          isLoading={loading}
          placeholder={`Message ${modelId}...`}
        />
      </div>
    </div>
  );
}
