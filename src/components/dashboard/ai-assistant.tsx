"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, User, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your AI Copilot powered by the Vercel AI SDK. How can I help you build your SaaS today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        let errorMessage = "OpenAI API Key needed in .env.local";
        try {
          const errorData = await response.json();
          if (errorData.error) errorMessage = errorData.error;
        } catch {
          // fallback
        }
        toast.error(errorMessage);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "⚠️ Notice: To enable live AI streaming, add your OPENAI_API_KEY in `.env.local`. The API route is fully pre-wired with the Vercel AI SDK!",
          },
        ]);
        setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantResponse += chunk;

          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = {
              role: "assistant",
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
            role: "assistant",
            content:
              "⚠️ No response stream received. Please verify your OPENAI_API_KEY has active credits and proper permissions in .env.local.",
          };
          return copy;
        });
      }
    } catch {
      toast.error("Network error while communicating with AI service.");
      setMessages((prev) => {
        const copy = [...prev];
        if (
          copy.length > 0 &&
          copy[copy.length - 1].role === "assistant" &&
          !copy[copy.length - 1].content
        ) {
          copy[copy.length - 1] = {
            role: "assistant",
            content: "⚠️ Connection interrupted. Please try again.",
          };
        }
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Assistant Copilot</CardTitle>
              <CardDescription>Powered by Vercel AI SDK streaming integration</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-primary/30 gap-1">
            <Sparkles className="text-primary h-3 w-3" /> GPT-4o Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/20 h-64 space-y-4 overflow-y-auto rounded-lg border p-4 pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 text-sm ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="bg-primary/10 text-primary mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-3.5 py-2.5 leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground border shadow-sm"
                }`}
              >
                {msg.content || (
                  <span className="text-muted-foreground flex items-center gap-1.5 italic">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking...
                  </span>
                )}
              </div>
              {msg.role === "user" && (
                <div className="bg-muted mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                  <User className="text-muted-foreground h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSend} className="flex w-full gap-2">
          <Input
            placeholder="Ask anything or request content..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
