"use client";

/**
 * BootScreen.tsx
 *
 * Fast, intentional terminal boot sequence overlay.
 * Features crisp status logs, SKIP button, and prefers-reduced-motion support.
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_TEXT_LINES = [
  "initializing portfolio...",
  "loading identity........ OK",
  "loading projects....... OK",
  "loading systems........ OK",
  "loading DSA............ OK",
  "loading interface...... OK",
  "system ready.",
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // If user prefers reduced motion, complete immediately
  useEffect(() => {
    if (prefersReducedMotion) {
      onCompleteRef.current();
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Fast snappy schedule (~1.2s total)
    const intervals = [150, 350, 550, 750, 950, 1150, 1350];
    const timers: NodeJS.Timeout[] = [];

    BOOT_TEXT_LINES.forEach((_, idx) => {
      const t = setTimeout(() => {
        setCurrentLineIndex(idx + 1);

        if (idx === BOOT_TEXT_LINES.length - 1) {
          const exitTimer = setTimeout(() => {
            setIsExiting(true);
            const finishTimer = setTimeout(() => {
              onCompleteRef.current();
            }, 300);
            timers.push(finishTimer);
          }, 300);
          timers.push(exitTimer);
        }
      }, intervals[idx]);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="boot-screen-overlay"
          initial={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#030305] text-white flex flex-col items-center justify-center p-6 select-none overflow-hidden origin-center"
        >
          {/* Top-Right SKIP Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 font-mono text-[11px] text-text-muted hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded transition-all bg-white/[0.02] flex items-center gap-2 group cursor-pointer"
          >
            <span>SKIP</span>
            <span className="text-[9px] px-1 py-0.5 rounded bg-white/10 text-white/60 group-hover:text-white">
              ESC
            </span>
          </button>

          {/* Centered Terminal Box */}
          <div className="w-full max-w-md font-mono text-xs text-white/90 space-y-2.5 bg-black/40 p-6 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md">
            {/* Header Icon Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/40 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-widest font-mono text-white/60">
                  HARSHIT OS // BOOT PROTOCOL
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/30">v2.4</span>
            </div>

            {/* Line-by-line animated text */}
            <div className="pt-2 space-y-2 min-h-[160px]">
              {BOOT_TEXT_LINES.slice(0, currentLineIndex).map((line, idx) => {
                const isLast = idx === BOOT_TEXT_LINES.length - 1;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex items-center gap-2.5 font-mono ${
                      isLast ? "text-emerald-400 font-bold text-sm pt-2" : "text-white/80"
                    }`}
                  >
                    <span className="text-emerald-500/60 select-none">&gt;</span>
                    <span>{line}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
