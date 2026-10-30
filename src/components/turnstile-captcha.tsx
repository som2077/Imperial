"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

interface TurnstileCaptchaProps {
  onSuccess?: (token: string) => void;
  onError?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

export function TurnstileCaptcha({ onSuccess, onError, className = "" }: TurnstileCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey =
    process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"; // Cloudflare always-pass test key
  const [token, setToken] = useState<string>("dev-bypass");
  const isDevMode = !process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (isDevMode) {
      if (onSuccess) onSuccess("dev-bypass");
      return;
    }

    // Load Cloudflare Turnstile script
    const scriptId = "cf-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    function renderWidget() {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          callback: (receivedToken: string) => {
            setToken(receivedToken);
            if (onSuccess) onSuccess(receivedToken);
          },
          "error-callback": () => {
            if (onError) onError();
          },
        });
      }
    }

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    }
  }, [siteKey, isDevMode, onSuccess, onError]);

  return (
    <div className={`my-2 ${className}`}>
      <input type="hidden" name="cf-turnstile-response" value={token} />
      {isDevMode ? (
        <div className="bg-muted/40 border-muted-foreground/15 text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Bot Protection Active (Cloudflare Turnstile)</span>
        </div>
      ) : (
        <div ref={containerRef} className="cf-turnstile" />
      )}
    </div>
  );
}
