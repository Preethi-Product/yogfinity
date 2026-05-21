"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { BookingProvider } from "@/components/booking/BookingContext";
import BookingModal from "@/components/booking/BookingModal";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Method from "@/components/sections/Method";
import Classes from "@/components/sections/Classes";
import Teachers from "@/components/sections/Teachers";
import Studio from "@/components/sections/Studio";
import Testimonials from "@/components/sections/Testimonials";
import BookingCTA from "@/components/sections/BookingCTA";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <BookingProvider>
      <PageLoader onComplete={onLoadComplete} />
      <CustomCursor />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navbar />
        <main>
          <Hero />
          <Manifesto />
          <Method />
          <Classes />
          <Teachers />
          <Studio />
          <Testimonials />
          <BookingCTA />
        </main>
        <Footer />
        <div id="journal" className="sr-only" aria-hidden />
      </motion.div>
      <BookingModal />
    </BookingProvider>
  );
}
