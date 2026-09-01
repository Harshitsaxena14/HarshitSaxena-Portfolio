/**
 * variants.ts — HarshitOS Motion Engine
 *
 * Centralized Framer Motion Variants dictionary.
 * Standardizes `hidden`, `visible`, and `exit` states for all UI components.
 */

import { Variants } from "framer-motion";
import { Durations } from "./durations";
import { Easings } from "./easings";
import { Transitions } from "./transitions";

export const MotionVariants: Record<string, Variants> = {
  /**
   * Fade in while moving upward.
   * WHEN TO USE: Section headings, text paragraphs, card entrances on scroll.
   * WHEN NOT TO USE: Full-screen modal dismissals.
   */
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: Transitions.sectionReveal,
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: Durations.fast, ease: [...Easings.exit] },
    },
  },

  /**
   * Fade in while moving downward.
   * WHEN TO USE: Dropdown menus, header banners, notification toasts.
   * WHEN NOT TO USE: Footer elements or bottom-up drawers.
   */
  fadeDown: {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: Transitions.cardHover,
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: Durations.fast, ease: [...Easings.exit] },
    },
  },

  /**
   * Scale up from slightly reduced size.
   * WHEN TO USE: Modal dialogs, command palette, preview cards.
   * WHEN NOT TO USE: Large text lines.
   */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: Transitions.modalOpen,
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: Transitions.modalClose,
    },
  },

  /**
   * Scale out to slightly larger size.
   * WHEN TO USE: Expanding image lightboxes, background radial reveals.
   * WHEN NOT TO USE: Small icon tooltips.
   */
  scaleOut: {
    hidden: { opacity: 0, scale: 1.06 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: Transitions.cardHover,
    },
    exit: {
      opacity: 0,
      scale: 1.03,
      transition: { duration: Durations.fast, ease: [...Easings.exit] },
    },
  },

  /**
   * Slide in from the right.
   * WHEN TO USE: Mobile sidebar navigation, drawer panels.
   * WHEN NOT TO USE: Centered dialogs.
   */
  slideLeft: {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: Transitions.slide,
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: Durations.fast, ease: [...Easings.exit] },
    },
  },

  /**
   * Slide in from the left.
   * WHEN TO USE: Back navigation flows, left drawer panels.
   * WHEN NOT TO USE: Centered modal windows.
   */
  slideRight: {
    hidden: { opacity: 0, x: -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: Transitions.slide,
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: Durations.fast, ease: [...Easings.exit] },
    },
  },

  /**
   * Pure opacity reveal without spatial movement.
   * WHEN TO USE: Backdrop blurs, overlay masks, image lazy loading.
   * WHEN NOT TO USE: Interactive cards that require depth feedback.
   */
  reveal: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: Transitions.fade,
    },
    exit: {
      opacity: 0,
      transition: { duration: Durations.fast },
    },
  },

  /**
   * Stagger parent variants for list grids.
   * WHEN TO USE: Grids of project cards, social icon docks, tech stack chips.
   * WHEN NOT TO USE: Standalone single components.
   */
  staggerParent: {
    hidden: {},
    visible: {
      transition: Transitions.staggerParent,
    },
  },

  /**
   * Stagger child variants for list items inside a stagger parent.
   * WHEN TO USE: Individual cards or items inside a stagger parent container.
   * WHEN NOT TO USE: Outside of a staggered parent container.
   */
  staggerChild: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: Transitions.staggerChild,
    },
  },

  /**
   * Scroll-triggered viewport reveal with once-only optimization.
   * WHEN TO USE: Page sections that reveal as the user scrolls down.
   * WHEN NOT TO USE: Re-triggering interactive elements.
   */
  viewportReveal: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: Transitions.sectionReveal,
    },
  },
} as const;

export type VariantKey = keyof typeof MotionVariants;
