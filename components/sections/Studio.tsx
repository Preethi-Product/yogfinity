"use client";

import { studio } from "@/constants/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Studio() {
  const hero = studio.images[0];

  return (
    <section id={studio.id} className="relative bg-obsidian overflow-hidden">
      <div
        className={`relative w-full h-[60vh] md:h-[75vh] placeholder-image bg-gradient-to-br ${hero.gradient}`}
      >
        <span className="absolute top-6 left-6 text-ivory/25 text-[10px] tracking-[0.3em] uppercase">
          {hero.label}
        </span>
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian/40">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-ivory italic text-center px-8 text-long-shadow max-w-4xl">
              {studio.overlayTitle}
            </h2>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {studio.features.map((feature, i) => (
            <ScrollReveal key={feature} delay={i * 100}>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl text-ivory italic text-center md:text-left border-t border-amber/30 pt-8">
                {feature}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
