"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/constants/content";
import ScrollReveal from "@/components/ui/ScrollReveal";

function QuoteMark() {
  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[400px] h-auto opacity-[0.04] pointer-events-none"
      viewBox="0 0 120 100"
      aria-hidden
    >
      <text
        x="10"
        y="90"
        fontSize="100"
        fill="#C9893A"
        fontFamily="Georgia, serif"
      >
        &ldquo;
      </text>
    </svg>
  );
}

function Stars() {
  return (
    <div className="text-amber tracking-[0.3em] text-sm mb-4" aria-label="5 stars">
      ★★★★★
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const items = testimonials.items;
  const multiple = items.length > 1;

  useEffect(() => {
    if (!multiple) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length, multiple]);

  const current = items[active];

  return (
    <section className="relative bg-charcoal py-28 md:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 lg:px-10 relative">
        <ScrollReveal>
          <h2 className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-amber uppercase text-center mb-16">
            {testimonials.heading}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <ScrollReveal>
            <div className="relative h-full bg-obsidian/40 border border-ivory/10 rounded-sm p-10 md:p-12">
              <QuoteMark />
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  <Stars />
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-ivory italic font-light leading-relaxed mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <span className="block text-amber text-[10px] tracking-[0.25em] uppercase mb-1">
                        {current.name}
                      </span>
                      <span className="text-ivory/40 text-[10px] tracking-[0.18em] uppercase">
                        {current.program}
                      </span>
                    </cite>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              {multiple && (
                <div className="flex gap-2 mt-8">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`interactive h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? "w-8 bg-amber" : "w-2 bg-ivory/20 hover:bg-ivory/40"
                      }`}
                      aria-label={`View testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="h-full bg-obsidian/40 border border-ivory/10 rounded-sm p-10 md:p-12 flex items-center">
              <blockquote className="border-l-2 border-amber pl-6 md:pl-8">
                <p className="font-display text-xl md:text-2xl lg:text-3xl italic text-ivory font-light leading-relaxed mb-3">
                  &ldquo;{testimonials.mantra.quote}&rdquo;
                </p>
                <footer className="text-amber text-[10px] tracking-[0.25em] uppercase">
                  — {testimonials.mantra.attribution}
                </footer>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
