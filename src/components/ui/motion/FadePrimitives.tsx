"use client";

/**
 * FadeUp.tsx, FadeIn.tsx, ScaleIn.tsx — HarshitOS Motion Primitives
 *
 * Atomic scroll animation wrappers built on HarshitOS Motion Engine.
 */

import React from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";

interface PrimitiveProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function FadeUp({
  children,
  className = "",
  yOffset = 18,
}: PrimitiveProps) {
  const { isReducedMotion, springs } = useMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: springs.card,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  className = "",
}: PrimitiveProps) {
  const { isReducedMotion, durations, easings } = useMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: durations.normal,
            ease: [...easings.smooth],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  className = "",
}: PrimitiveProps) {
  const { isReducedMotion, springs } = useMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.96 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: springs.card,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
