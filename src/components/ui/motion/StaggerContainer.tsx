"use client";

/**
 * StaggerContainer.tsx & StaggerItem.tsx — HarshitOS Motion Engine
 *
 * Orchestrates staggered entrance animations for grids, lists, and card sets.
 */

import React from "react";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/useMotion";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.04,
}: StaggerContainerProps) {
  const { isReducedMotion } = useMotion();

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 18,
}: StaggerItemProps) {
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
