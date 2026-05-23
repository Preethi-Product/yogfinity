"use client";

import { method } from "@/constants/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

function FasciaIllustration() {
  return (
    <svg
      viewBox="0 0 320 480"
      className="w-full max-w-xs mx-auto lg:max-w-sm opacity-40"
      aria-hidden
    >
      <g fill="none" stroke="#C9893A" strokeWidth="0.8" strokeOpacity="0.6">
        {/* Minimal body outline */}
        <ellipse cx="160" cy="48" rx="28" ry="34" />
        <path d="M160 82 L160 200" />
        <path d="M160 120 Q80 160 60 240" />
        <path d="M160 120 Q240 160 260 240" />
        <path d="M160 200 L100 380" />
        <path d="M160 200 L220 380" />
        {/* Fascia network lines */}
        <path d="M160 82 Q120 140 100 200 Q80 260 70 320" strokeOpacity="0.35" />
        <path d="M160 82 Q200 140 220 200 Q240 260 250 320" strokeOpacity="0.35" />
        <path d="M130 160 Q160 180 190 160" strokeOpacity="0.35" />
        <path d="M120 240 Q160 260 200 240" strokeOpacity="0.35" />
        <path d="M110 320 Q160 340 210 320" strokeOpacity="0.35" />
        <circle cx="160" cy="160" r="4" fill="#C9893A" fillOpacity="0.5" />
        <circle cx="130" cy="220" r="3" fill="#7A8C6E" fillOpacity="0.5" />
        <circle cx="190" cy="220" r="3" fill="#7A8C6E" fillOpacity="0.5" />
        <circle cx="160" cy="280" r="3" fill="#C9893A" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

export default function Method() {
  return (
    <section
      id={method.id}
      className="relative bg-obsidian py-28 md:py-40 fascia-pattern overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-2 flex lg:justify-center">
            <ScrollReveal>
              <h2 className="font-sans text-xs tracking-[0.35em] text-amber uppercase lg:[writing-mode:vertical-lr] lg:rotate-180 block">
                {method.label}
              </h2>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 space-y-16 md:space-y-20">
            {method.steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 120}>
                <article className="group border-l border-amber/30 pl-8 md:pl-12 hover:border-amber transition-colors">
                  <span className="font-display text-6xl md:text-7xl text-amber/20 block mb-2 leading-none">
                    {step.number}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl text-ivory italic mb-4">
                    {step.title}
                  </h3>
                  <p className="text-ivory/55 text-sm md:text-base leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="lg:col-span-5 flex items-center justify-center pt-8 lg:pt-0">
            <ScrollReveal delay={200}>
              <FasciaIllustration />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
