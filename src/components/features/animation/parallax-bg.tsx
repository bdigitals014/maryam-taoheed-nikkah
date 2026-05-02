"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const ParallaxBg = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 min-h-[150%] w-full bg-[url(/images/hall2.webp)] bg-cover bg-center bg-no-repeat"
        style={{ y }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        {children}
      </div>
    </motion.section>
  );
};

export default ParallaxBg;