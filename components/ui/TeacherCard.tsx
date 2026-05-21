"use client";

import { motion } from "framer-motion";

interface TeacherCardProps {
  initials: string;
  name: string;
  title: string;
  bio: string;
  specializations: readonly string[];
}

export default function TeacherCard({
  initials,
  name,
  title,
  bio,
  specializations,
}: TeacherCardProps) {
  return (
    <motion.article
      className="group bg-charcoal border border-ivory/5 rounded-sm p-8 text-center interactive transition-colors hover:border-amber/30"
      initial="rest"
      whileHover="hover"
    >
      <motion.div
        className="mx-auto mb-6 h-16 w-16 rounded-full bg-[#1a1a14] flex items-center justify-center border border-amber/40"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.06 },
        }}
        transition={{ duration: 0.4 }}
      >
        <span className="font-display italic text-2xl text-amber">{initials}</span>
      </motion.div>

      <h3 className="font-display text-xl md:text-2xl text-ivory mb-1 font-light link-underline inline-block">
        {name}
      </h3>
      <p className="text-[10px] tracking-[0.18em] uppercase text-ivory/40 mb-4">
        {title}
      </p>
      <p className="text-ivory/60 text-sm leading-relaxed font-light mb-6 max-w-xs mx-auto">
        {bio}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {specializations.map((spec, i) => (
          <span
            key={spec}
            className={`text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border ${
              i % 2 === 0
                ? "border-amber/40 text-amber bg-amber/5"
                : "border-sage/40 text-sage bg-sage/5"
            }`}
          >
            {spec}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
