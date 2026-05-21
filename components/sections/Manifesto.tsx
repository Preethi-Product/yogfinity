"use client";

import { manifesto } from "@/constants/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Manifesto() {
  return (
    <section
      id={manifesto.id}
      className="relative bg-ivory text-obsidian py-28 md:py-36 diagonal-top diagonal-bottom"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <blockquote className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl italic font-light leading-snug text-obsidian">
              &ldquo;{manifesto.quote}&rdquo;
            </p>
            <footer className="mt-6 text-[10px] md:text-xs tracking-[0.25em] uppercase text-amber">
              {manifesto.attribution}
            </footer>
          </blockquote>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {manifesto.pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 80}>
              <article className="group h-full bg-obsidian/[0.03] border border-obsidian/10 rounded-sm p-6 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(10,10,10,0.12)] interactive">
                <span className="text-3xl mb-4 block" role="img" aria-hidden>
                  {pillar.icon}
                </span>
                <h3 className="font-display text-xl text-obsidian mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-obsidian/60 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
