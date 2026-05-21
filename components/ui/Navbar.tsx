"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site, navLinks } from "@/constants/content";
import Button from "./Button";
import Logo from "./Logo";
import { useBooking } from "@/components/booking/BookingContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/95 backdrop-blur-md border-b border-ivory/5 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a
            href="#"
            className="flex items-center gap-3 interactive group"
            aria-label={site.name}
          >
            <Logo size={44} priority className="transition-transform duration-500 group-hover:rotate-[8deg]" />
            <span className="font-display text-lg md:text-xl tracking-[0.3em] text-ivory uppercase hidden sm:inline link-underline">
              {site.name}
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-ivory/70 hover:text-ivory tracking-wide link-underline interactive transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              variant="outline"
              onClick={openBooking}
              className="!px-6 !py-2.5 text-xs"
            >
              Book a Class
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden text-ivory interactive p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-obsidian flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex items-center gap-3">
                <Logo size={40} />
                <span className="font-display text-lg tracking-[0.3em] text-ivory uppercase">
                  {site.name}
                </span>
              </div>
              <button
                type="button"
                className="text-ivory interactive p-2"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <ul className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    className="font-display text-3xl text-ivory italic interactive"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
              >
                <Button
                  variant="outline"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                >
                  Book a Class
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
