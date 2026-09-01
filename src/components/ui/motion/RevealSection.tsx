"use client";

/**
 * RevealSection.tsx — HarshitOS Motion Engine
 *
 * Cinematic section container wrapper that serves as the single viewport-reveal root.
 * Propagates variant state ("hidden" -> "visible") to all child motion primitives.
 */

import React from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";

interface RevealSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function RevealSection({
  children,
  id,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
}: RevealSectionProps) {
  const { isReducedMotion } = useMotion();

  if (isReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}

export default RevealSection;
