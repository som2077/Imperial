import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { Star, Heart, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-muted/20 border-t py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="border-primary/20 bg-primary/5 mb-3 gap-1.5">
            <Heart className="size-3.5 fill-rose-500 text-rose-500" /> Wall of Love
          </Badge>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Loved by Founders &amp; Engineers
          </h2>
          <p className="text-muted-foreground text-base text-pretty">
            See how developers are shipping MVPs and scaling their SaaS products in record time.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {siteConfig.testimonials.map((t, idx) => (
            <Card
              key={idx}
              className="bg-card/90 flex flex-col justify-between border shadow-2xs transition-shadow duration-200 hover:shadow-md"
            >
              <CardContent className="space-y-4 p-6">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-card-foreground text-sm leading-relaxed text-pretty italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 border-t pt-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-full border">
                    <Image src={t.avatar} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground truncate text-sm font-semibold">
                        {t.name}
                      </span>
                      <CheckCircle2 className="text-primary size-3.5 shrink-0" />
                    </div>
                    <p className="text-muted-foreground truncate text-xs">
                      {t.role} at <span className="text-foreground font-medium">{t.company}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
