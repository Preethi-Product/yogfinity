"use client";

import { classes } from "@/constants/content";
import ClassCard from "@/components/ui/ClassCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Classes() {
  return (
    <section id={classes.id} className="bg-charcoal py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory italic mb-4">
              {classes.heading}
            </h2>
            <p className="text-ivory/50 max-w-xl mx-auto text-sm md:text-base">
              {classes.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {classes.items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 100}>
              <ClassCard {...item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
