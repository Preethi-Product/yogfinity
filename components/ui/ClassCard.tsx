"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ClassCardProps {
  name: string;
  intensity: number;
  duration: string;
  level: string;
  description: string;
  bgClass: string;
  textClass: string;
}

function IntensityDots({ level, dark }: { level: number; dark?: boolean }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < level
              ? dark
                ? "bg-obsidian"
                : "bg-amber"
              : dark
                ? "bg-obsidian/20"
                : "bg-ivory/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function ClassCard({
  name,
  intensity,
  duration,
  level,
  description,
  bgClass,
  textClass,
}: ClassCardProps) {
  const [hovered, setHovered] = useState(false);
  const isLight = textClass.includes("obsidian");

  return (
    <motion.article
      className={`relative overflow-hidden rounded-sm min-h-[300px] flex flex-col justify-between p-8 ${bgClass} ${textClass} interactive fascia-pattern`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-obsidian/85 backdrop-blur-sm flex items-center justify-center p-8"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-ivory text-center text-sm leading-relaxed max-w-xs font-light">
          {description}
        </p>
      </motion.div>

      <div className="relative z-10">
        <IntensityDots level={intensity} dark={isLight} />
      </div>

      <div className="relative z-10">
        <h3 className="font-display text-3xl md:text-4xl italic font-light mb-4">
          {name}
        </h3>
        <p
          className={`text-[10px] tracking-[0.18em] uppercase font-medium ${
            isLight ? "text-obsidian/70" : "text-ivory/70"
          }`}
        >
          {duration} · {level}
        </p>
      </div>
    </motion.article>
  );
}
