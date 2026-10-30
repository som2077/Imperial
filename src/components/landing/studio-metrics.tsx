"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function StudioMetrics() {
  const metrics = [
    {
      value: "100%",
      label: "Offline Execution",
      description: "Zero compulsory cloud dependencies",
    },
    {
      value: "0 MB",
      label: "Ad Trackers / SDKs",
      description: "Zero invasive third-party telemetry",
    },
    {
      value: "< 16ms",
      label: "Frame Response",
      description: "Buttery-smooth 60 FPS touch physics",
    },
    {
      value: "24–48h",
      label: "Support SLA",
      description: "Direct human engineering responses",
    },
  ];

  return (
    <section className="border-y border-border/60 bg-muted/20 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/60">
          {metrics.map((m, idx) => (
            <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? "md:pl-8" : ""}`}>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                {m.value}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">
                {m.label}
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-normal">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
