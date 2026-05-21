"use client";

import { booking } from "@/constants/content";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useBooking } from "@/components/booking/BookingContext";

export default function BookingCTA() {
  const { open } = useBooking();

  return (
    <section
      id="booking"
      className="bg-ivory text-obsidian py-28 md:py-36 diagonal-top"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10 text-center">
        <ScrollReveal>
          <span className="inline-block text-[10px] md:text-xs tracking-[0.3em] uppercase text-amber mb-6">
            {booking.eyebrow}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic font-light mb-6 text-obsidian">
            {booking.heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="text-obsidian/60 text-base md:text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
            {booking.subtext}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <Button
            variant="filled"
            onClick={open}
            className="!text-base !px-12 !py-4"
          >
            {booking.cta}
          </Button>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <a
            href="#classes"
            className="inline-block mt-8 text-sm text-obsidian/50 hover:text-amber link-underline interactive transition-colors"
          >
            {booking.secondary}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
