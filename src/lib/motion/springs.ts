/**
 * springs.ts — HarshitOS Motion Engine
 *
 * Centralized Framer Motion spring physics presets.
 * DO NOT hardcode stiffness/damping/mass values in individual components.
 */

import { Spring } from "framer-motion";

export const Springs: Record<string, Spring> = {
  /**
   * High stiffness, low mass tactile spring.
   * WHEN TO USE: Micro feedback on press/tap (:active states).
   * WHEN NOT TO USE: Large spatial translations.
   */
  micro: {
    type: "spring",
    stiffness: 500,
    damping: 30,
    mass: 0.5,
  },

  /**
   * Snappy spring for interactive hover states.
   * WHEN TO USE: Link hovers, icon scaling, border glows.
   * WHEN NOT TO USE: Heavy modals.
   */
  hover: {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 0.6,
  },

  /**
   * Balanced spring for CTA buttons and interactive controls.
   * WHEN TO USE: Button hover lifts, toggle switches, badge reveals.
   * WHEN NOT TO USE: Background section reveals.
   */
  button: {
    type: "spring",
    stiffness: 350,
    damping: 22,
    mass: 0.7,
  },

  /**
   * Medium-weight spring for card hover & scaling.
   * WHEN TO USE: Portfolio cards, grid items, preview containers.
   * WHEN NOT TO USE: Text line transitions.
   */
  card: {
    type: "spring",
    stiffness: 300,
    damping: 26,
    mass: 0.8,
  },

  /**
   * Smooth, heavy spring for modal overlays & workspaces.
   * WHEN TO USE: Case study modals, command palette popup, full-screen drawers.
   * WHEN NOT TO USE: Small icon hover states.
   */
  modal: {
    type: "spring",
    stiffness: 320,
    damping: 32,
    mass: 0.8,
  },

  /**
   * Gentle spring for scroll-triggered viewport section reveals.
   * WHEN TO USE: Scroll-in sections, main headline entries.
   * WHEN NOT TO USE: Fast micro-animations.
   */
  section: {
    type: "spring",
    stiffness: 220,
    damping: 28,
    mass: 1.0,
  },

  /**
   * Low mass, high responsiveness for floating navigation & dock pills.
   * WHEN TO USE: Navbar sliding pill indicator, social dock hover rise.
   * WHEN NOT TO USE: Heavy modal dialogs.
   */
  dock: {
    type: "spring",
    stiffness: 380,
    damping: 24,
    mass: 0.6,
  },

  /**
   * Ultra-responsive spring for custom magnetic cursor trailing.
   * WHEN TO USE: Cursor follower, magnetic button pulls.
   * WHEN NOT TO USE: Static layout transitions.
   */
  cursor: {
    type: "spring",
    stiffness: 600,
    damping: 35,
    mass: 0.3,
  },

  /**
   * Soft ambient spring for floating 3D elements and background rings.
   * WHEN TO USE: Orbital ring card movement, ambient glow shifts.
   * WHEN NOT TO USE: Fast UI button clicks.
   */
  floating: {
    type: "spring",
    stiffness: 180,
    damping: 20,
    mass: 1.2,
  },

  /**
   * Elastic magnetic pull spring.
   * WHEN TO USE: Magnetic cursor suction on primary buttons.
   * WHEN NOT TO USE: Modal dialog entrances.
   */
  magnetic: {
    type: "spring",
    stiffness: 250,
    damping: 18,
    mass: 0.5,
  },
} as const;

export type SpringKey = keyof typeof Springs;
