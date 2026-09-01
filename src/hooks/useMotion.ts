"use client";

/**
 * useMotion.ts — HarshitOS Motion Engine Hook
 *
 * Custom React hook exposing motion presets and accessibility-aware variants.
 *
 * Example:
 *   const { variants, transitions, getAccessibleVariant, isReducedMotion } = useMotion();
 *   <motion.div variants={getAccessibleVariant("fadeUp")} />
 */

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Durations,
  Easings,
  Springs,
  Transitions,
  MotionVariants,
  VariantKey,
  TransitionKey,
  withReducedMotion,
} from "@/lib/motion";

export function useMotion() {
  const reducedMotionPreference = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Keep SSR and first client render aligned; apply accessibility preference after hydration.
  const isReducedMotion = isHydrated ? !!reducedMotionPreference : false;

  /**
   * Returns a Framer Motion variant that automatically strips spatial movement
   * when `prefers-reduced-motion` is active.
   */
  const getAccessibleVariant = (key: VariantKey) => {
    const baseVariant = MotionVariants[key] || MotionVariants.fadeUp;
    if (isReducedMotion) {
      return withReducedMotion(baseVariant);
    }
    return baseVariant;
  };

  /**
   * Returns a transition preset that respects reduced motion preferences.
   */
  const getAccessibleTransition = (key: TransitionKey) => {
    const baseTransition = Transitions[key] || Transitions.buttonHover;
    if (isReducedMotion) {
      return { duration: Durations.fast, ease: [...Easings.smooth] };
    }
    return baseTransition;
  };

  return {
    isReducedMotion,
    durations: Durations,
    easings: Easings,
    springs: Springs,
    transitions: Transitions,
    variants: MotionVariants,
    getAccessibleVariant,
    getAccessibleTransition,
  };
}

export default useMotion;
