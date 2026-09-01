/**
 * durations.ts — HarshitOS Motion Engine
 *
 * Centralized duration constants in seconds.
 * DO NOT use magic numbers for animation durations across components.
 */

export const Durations = {
  /**
   * 0.08s — Instant feedback.
   * WHEN TO USE: Button press down, active tap feedback, keypress indicator.
   * WHEN NOT TO USE: Hover transitions or section reveals.
   */
  instant: 0.08,

  /**
   * 0.15s — Fast micro interaction.
   * WHEN TO USE: Tooltip fade-in, badge hover, icon color changes, toggle switches.
   * WHEN NOT TO USE: Large card movements or modal dialogs.
   */
  fast: 0.15,

  /**
   * 0.25s — Standard component transition.
   * WHEN TO USE: Button hover lifts, link underlines, command palette item highlights.
   * WHEN NOT TO USE: Full-page layout shifts.
   */
  normal: 0.25,

  /**
   * 0.35s — Medium layout transition.
   * WHEN TO USE: Card hover scaling, dropdown expansion, tab panel switching.
   * WHEN NOT TO USE: Simple hover text colors.
   */
  medium: 0.35,

  /**
   * 0.50s — Slow container transition.
   * WHEN TO USE: Modal dialog entrance, drawer slide-ins, backdrop blur reveals.
   * WHEN NOT TO USE: Small icon transitions.
   */
  slow: 0.50,

  /**
   * 0.65s — Structural section / page transition.
   * WHEN TO USE: Full-width section viewport reveals, initial page entrance.
   * WHEN NOT TO USE: Micro interactions or button clicks.
   */
  page: 0.65,

  /**
   * 0.80s — Orbital / ambient background motion.
   * WHEN TO USE: Continuous inertia alignment, 3D orbit speed adjustments.
   * WHEN NOT TO USE: Snappy UI controls.
   */
  orbital: 0.80,
} as const;

export type DurationKey = keyof typeof Durations;
