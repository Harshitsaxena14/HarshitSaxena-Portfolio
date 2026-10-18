"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      role="contentinfo"
      className="w-full border-t border-border-subtle bg-black"
    >
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        suppressHydrationWarning
        className="max-w-[1080px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        {/* Left: Identity */}
        <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
          <span className="text-text-primary font-semibold tracking-wider uppercase">
            HARSHIT SAXENA
          </span>
          <span className="text-border-medium" aria-hidden="true">//</span>
          <span suppressHydrationWarning>© {year}</span>
        </div>

        {/* Right: Build note */}
        <p className="font-mono text-[11px] text-text-muted tracking-wide">
          BUILT WITH NEXT.JS &middot; TYPESCRIPT &middot; TAILWIND CSS
        </p>
      </motion.div>
    </footer>
  );
}
