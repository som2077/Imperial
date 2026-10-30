"use client";

import * as React from "react";

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
    <section className="border-border/60 bg-muted/20 border-y py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divide-border/60 grid grid-cols-2 gap-8 divide-y md:grid-cols-4 md:divide-x md:divide-y-0">
          {metrics.map((m, idx) => (
            <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? "md:pl-8" : ""}`}>
              <div className="text-foreground font-mono text-3xl font-extrabold tracking-tight sm:text-4xl">
                {m.value}
              </div>
              <div className="text-foreground mt-1 text-xs font-bold tracking-wider uppercase">
                {m.label}
              </div>
              <p className="text-muted-foreground mt-1 text-xs leading-normal">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
