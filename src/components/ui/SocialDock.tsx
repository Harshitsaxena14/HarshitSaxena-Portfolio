"use client";

/**
 * SocialDock
 *
 * Premium dark social icon row with Apple/Linear-style floating tooltips.
 *
 * Interaction model is adapted from the reference doodle tooltip component:
 *   - Button rises  translateY(-8px) scale(1.08) on hover
 *   - Shadow opens with platform accent glow
 *   - Icon brightens to platform colour
 *   - Tooltip fades + slides up above the button
 *   - All hover interactions are pure CSS — zero JS on repeat interactions
 *   - Framer Motion handles only the one-time staggered entrance animation
 *
 * Usage:
 *   <SocialDock
 *     githubUrl="https://github.com/username"
 *     linkedinUrl="https://linkedin.com/in/username"
 *     leetcodeUrl="https://leetcode.com/username"
 *     email="hello@example.com"
 *   />
 */

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import styles from "./socialDock.module.css";

// ── Custom LeetCode SVG ───────────────────────────────────────────────────────
// Lucide does not include a LeetCode mark; this is an accurate single-path
// trace of the official icon at 24×24 viewBox with fill="currentColor".

function LeetCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SocialDockProps {
  /** Full GitHub profile URL */
  githubUrl: string;
  /** Full LinkedIn profile URL */
  linkedinUrl: string;
  /** Full LeetCode profile URL */
  leetcodeUrl: string;
  /** Email address — component prepends "mailto:" */
  email: string;
  /** Optional extra className on the root element */
  className?: string;
}

// ── Entrance animation variants ───────────────────────────────────────────────
// Used only once on mount. All repeat interactions are handled by CSS.

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 310, damping: 26, mass: 0.8 },
  },
};

/** Opacity-only entrance when prefers-reduced-motion is set. */
const itemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function SocialDock({
  githubUrl,
  linkedinUrl,
  leetcodeUrl,
  email,
  className = "",
}: SocialDockProps) {
  const prefersReducedMotion = useReducedMotion();
  const entryItem = prefersReducedMotion ? itemVariantsReduced : itemVariants;

  const links = [
    {
      id: "github" as const,
      label: "GitHub",
      ariaLabel: "GitHub profile (opens in new tab)",
      href: githubUrl,
      external: true,
      icon: <Github size={20} aria-hidden="true" />,
    },
    {
      id: "linkedin" as const,
      label: "LinkedIn",
      ariaLabel: "LinkedIn profile (opens in new tab)",
      href: linkedinUrl,
      external: true,
      icon: <Linkedin size={20} aria-hidden="true" />,
    },
    {
      id: "leetcode" as const,
      label: "LeetCode",
      ariaLabel: "LeetCode profile (opens in new tab)",
      href: leetcodeUrl,
      external: true,
      icon: <LeetCodeIcon size={20} />,
    },
    {
      id: "email" as const,
      label: "Email",
      ariaLabel: "Send an email",
      href: `mailto:${email}`,
      external: false,
      icon: <Mail size={20} aria-hidden="true" />,
    },
  ];

  return (
    <motion.ul
      className={[styles.container, className].filter(Boolean).join(" ")}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      role="list"
      aria-label="Social links"
    >
      {links.map(({ id, label, ariaLabel, href, external, icon }) => (
        <motion.li key={id} variants={entryItem} className={styles.item}>
          {/*
           * The <a> carries both the CSS hover states (via CSS module class
           * selectors) and the accessibility attributes. No JS event listeners
           * are needed — all hover-driven UI (lift, glow, tooltip) is CSS-only.
           */}
          <a
            href={href}
            aria-label={ariaLabel}
            title={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={[styles.btn, styles[id]].join(" ")}
          >
            <span className={styles.icon}>{icon}</span>
          </a>

          {/*
           * Tooltip — shown via .item:hover .tooltip in the CSS module.
           * aria-hidden: screen-reader users get context from the <a> aria-label.
           */}
          <div className={styles.tooltip} aria-hidden="true">
            {label}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
