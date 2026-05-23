"use client";

import { whyYogfinity } from "@/constants/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhyYogfinity() {
  return (
    <section
      id={whyYogfinity.id}
      className="relative bg-ivory text-obsidian py-28 md:py-40 diagonal-top diagonal-bottom"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <span className="text-[10px] tracking-[0.35em] uppercase text-amber font-sans">
              {whyYogfinity.label}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-obsidian italic font-light mt-4">
              {whyYogfinity.heading}
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-0 divide-y divide-obsidian/10">
          {whyYogfinity.usps.map((usp, i) => (
            <ScrollReveal key={usp.number} delay={i * 80}>
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-12 hover:bg-obsidian/[0.02] transition-colors duration-300 -mx-6 px-6 lg:-mx-10 lg:px-10">
                <div className="md:col-span-1 flex items-start pt-1">
                  <span className="font-display text-sm text-amber/50 tabular-nums">
                    {usp.number}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl md:text-3xl text-obsidian font-light leading-snug mb-3">
                    {usp.title}
                  </h3>
                  <p className="font-display italic text-obsidian/60 text-base md:text-lg leading-relaxed">
                    &ldquo;{usp.quote}&rdquo;
                  </p>
                </div>

                <div className="md:col-span-6 flex flex-wrap gap-2 md:justify-end md:content-start">
                  {usp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-[10px] tracking-[0.15em] uppercase border border-obsidian/20 text-obsidian/50 rounded-full px-3 py-1 group-hover:border-amber/40 group-hover:text-amber/70 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
