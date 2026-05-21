"use client";

import { teachers } from "@/constants/content";
import TeacherCard from "@/components/ui/TeacherCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Teachers() {
  return (
    <section
      id={teachers.id}
      className="bg-obsidian py-28 md:py-40 border-t border-ivory/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory italic mb-4">
              {teachers.heading}
            </h2>
            <p className="text-ivory/50 text-sm md:text-base">{teachers.subheading}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 max-w-4xl mx-auto">
          {teachers.members.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 120}>
              <TeacherCard {...member} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
