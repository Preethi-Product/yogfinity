"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { hero } from "@/constants/content";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useBooking } from "@/components/booking/BookingContext";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { open } = useBooking();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0 hero-gradient" style={{ y }} />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        aria-hidden
      >
        <defs>
          <pattern
            id="fascia-mesh"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M60 10 Q90 60 60 110 Q30 60 60 10 M10 60 Q60 30 110 60 Q60 90 10 60"
              fill="none"
              stroke="#C9893A"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fascia-mesh)" />
      </svg>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10 text-center pt-24"
        style={{ opacity }}
      >
        <ScrollReveal>
          <span className="inline-block text-[10px] md:text-xs tracking-[0.3em] uppercase text-amber mb-8">
            {hero.eyebrow}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h1 className="font-display italic text-long-shadow leading-[1] mb-8 font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem]">
            <span className="block text-ivory">
              {hero.line1}
            </span>
            <span className="block text-amber mt-2">
              {hero.line2}
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <p className="max-w-xl mx-auto text-ivory/55 text-base md:text-lg leading-relaxed mb-12 font-light">
            {hero.subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button variant="filled" onClick={open}>
              {hero.ctaPrimary}
            </Button>
            <Button variant="ghost" href="#method">
              {hero.ctaSecondary}
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="grid grid-cols-3 max-w-2xl mx-auto pt-10 border-t border-ivory/10">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display italic font-light text-3xl md:text-4xl text-amber mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-ivory/40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory/40 hover:text-amber transition-colors interactive animate-scroll-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </motion.a>
    </section>
  );
}
