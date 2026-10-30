"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { HelpCircle, Mail } from "lucide-react";

export function FAQSection() {
  return (
    <section id="faq" className="bg-muted/10 border-t py-24">
      <div className="container mx-auto max-w-4xl px-4 sm:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="mb-3 gap-1">
            <HelpCircle className="text-primary size-3.5" /> FAQ
          </Badge>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base text-pretty">
            Everything you need to know about the product, licensing, and tech stack. Have more
            questions?{" "}
            <a
              href={`mailto:${siteConfig.mailSupport}`}
              className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
            >
              <Mail className="size-3.5" /> Email our team
            </a>
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {siteConfig.faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card hover:border-primary/40 rounded-xl border px-5 py-1 shadow-2xs transition-colors"
            >
              <AccordionTrigger className="text-foreground py-4 text-base font-semibold text-balance hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-1 pb-4 text-sm leading-relaxed text-pretty">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
