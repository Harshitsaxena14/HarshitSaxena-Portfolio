/**
 * motion.ts — HarshitOS Motion Engine Orchestrator
 *
 * Core engine utilities for accessing and combining motion primitives.
 */

import { Transition, Variants } from "framer-motion";
import { Durations, DurationKey } from "./durations";
import { Easings, EasingKey } from "./easings";
import { Springs, SpringKey } from "./springs";
import { Transitions, TransitionKey } from "./transitions";
import { MotionVariants, VariantKey } from "./variants";

/**
 * Access a transition preset safely with fallback.
 */
export function getTransition(key: TransitionKey): Transition {
  return Transitions[key] || Transitions.buttonHover;
}

/**
 * Access a variant preset safely with fallback.
 */
export function getVariant(key: VariantKey): Variants {
  return MotionVariants[key] || MotionVariants.fadeUp;
}

/**
 * Accessible motion wrapper — strips spatial translations (y/x/scale)
 * when `prefers-reduced-motion` is active, maintaining pure opacity fades.
 *
 * @param variant Standard MotionVariant
 * @returns Accessible MotionVariant compliant with prefers-reduced-motion
 */
export function withReducedMotion(variant: Variants): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: Durations.fast, ease: [...Easings.smooth] },
    },
    exit: {
      opacity: 0,
      transition: { duration: Durations.instant },
    },
  };
}

/**
 * Unified Motion Engine Configuration Object
 */
export const MotionConfig = {
  durations: Durations,
  easings: Easings,
  springs: Springs,
  transitions: Transitions,
  variants: MotionVariants,
  getTransition,
  getVariant,
  withReducedMotion,
} as const;
