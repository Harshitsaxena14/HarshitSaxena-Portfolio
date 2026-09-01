/**
 * transitions.ts — HarshitOS Motion Engine
 *
 * Centralized Framer Motion Transition configurations.
 * Combines Durations, Easings, and Springs into production-ready transition presets.
 */

import { Transition } from "framer-motion";
import { Durations } from "./durations";
import { Easings } from "./easings";
import { Springs } from "./springs";

export const Transitions: Record<string, Transition> = {
  /**
   * Transition for button hover lifts and press states.
   * WHEN TO USE: Primary/secondary CTA buttons, navbar items.
   * WHEN NOT TO USE: Full section reveals.
   */
  buttonHover: {
    ...Springs.button,
  },

  /**
   * Transition for card hover scaling and elevation.
   * WHEN TO USE: Project cards, LeetCode stat cards, article previews.
   * WHEN NOT TO USE: Small text labels.
   */
  cardHover: {
    ...Springs.card,
  },

  /**
   * Transition for scroll-triggered section reveals.
   * WHEN TO USE: Heading and container viewport reveals.
   * WHEN NOT TO USE: Micro interactions.
   */
  sectionReveal: {
    ...Springs.section,
  },

  /**
   * Transition for modal workspace opening.
   * WHEN TO USE: Case study modals, command palette dialog.
   * WHEN NOT TO USE: Tooltip popups.
   */
  modalOpen: {
    ...Springs.modal,
  },

  /**
   * Transition for modal workspace closing.
   * WHEN TO USE: Dialog exit, modal dismiss.
   * WHEN NOT TO USE: Entrance animations.
   */
  modalClose: {
    duration: Durations.fast,
    ease: [...Easings.exit],
  },

  /**
   * Smooth opacity fade transition.
   * WHEN TO USE: Image loading placeholders, backdrop overlays.
   * WHEN NOT TO USE: Tactile buttons.
   */
  fade: {
    duration: Durations.normal,
    ease: [...Easings.smooth],
  },

  /**
   * Smooth scale transition.
   * WHEN TO USE: Badge reveals, icon expands.
   * WHEN NOT TO USE: Page layout changes.
   */
  scale: {
    duration: Durations.fast,
    ease: [...Easings.bounce],
  },

  /**
   * Directional slide transition.
   * WHEN TO USE: Mobile drawer slide-in, notification banners.
   * WHEN NOT TO USE: Small inline text.
   */
  slide: {
    duration: Durations.medium,
    ease: [...Easings.apple],
  },

  /**
   * Stagger container for list items.
   * WHEN TO USE: Parent container of list items, grid reveals.
   * WHEN NOT TO USE: Single standalone components.
   */
  staggerParent: {
    staggerChildren: 0.08,
    delayChildren: 0.04,
  },

  /**
   * Individual item inside a staggered list.
   * WHEN TO USE: Children of a staggered parent container.
   * WHEN NOT TO USE: Independent top-level containers.
   */
  staggerChild: {
    ...Springs.button,
  },
} as const;

export type TransitionKey = keyof typeof Transitions;
