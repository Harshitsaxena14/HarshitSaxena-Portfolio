/**
 * easings.ts — HarshitOS Motion Engine
 *
 * Centralized cubic-bezier easing curves.
 * DO NOT hardcode array or string easings in individual components.
 */

export const Easings = {
  /**
   * Apple-inspired deceleration curve (easeOutExpo equivalent).
   * WHEN TO USE: Smooth, premium element reveals, modal entrances, and subtle dropdowns.
   * WHEN NOT TO USE: Micro interactions or button press states (too slow at start).
   */
  apple: [0.16, 1, 0.3, 1] as const,

  /**
   * Linear.app style snappy cubic-bezier.
   * WHEN TO USE: Quick UI feedback, tab switching, command palette reveals.
   * WHEN NOT TO USE: Full-page structural transitions.
   */
  linear: [0.25, 0.1, 0.25, 1.0] as const,

  /**
   * Standard balanced Material/Apple ease-in-out.
   * WHEN TO USE: Symmetric state toggles, expand/collapse accordions.
   * WHEN NOT TO USE: Spring-based micro interactions.
   */
  smooth: [0.4, 0.0, 0.2, 1] as const,

  /**
   * Slight overshoot bounce curve.
   * WHEN TO USE: Tooltip pop-ups, badge scale-ins, accent highlights.
   * WHEN NOT TO USE: Heavy containers, modals, or full-width sections.
   */
  bounce: [0.34, 1.56, 0.64, 1] as const,

  /**
   * Inertia glide deceleration curve.
   * WHEN TO USE: Carousel sliding, dock indicator tracking, scroll momentum.
   * WHEN NOT TO USE: Fast exit animations.
   */
  glide: [0.32, 0.72, 0, 1] as const,

  /**
   * Fast sharp acceleration.
   * WHEN TO USE: Unmounting elements, modal background fades on exit.
   * WHEN NOT TO USE: Entrance animations.
   */
  sharp: [0.4, 0, 0.6, 1] as const,

  /**
   * Accelerated exit curve.
   * WHEN TO USE: Dialog dismissal, tooltip hide.
   * WHEN NOT TO USE: Element mounts.
   */
  exit: [0.4, 0, 1, 1] as const,
} as const;

export type EasingKey = keyof typeof Easings;
