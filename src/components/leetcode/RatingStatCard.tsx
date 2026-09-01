"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Trophy, TrendingUp, Award, Flame } from "lucide-react";

interface RatingStatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  badgeText?: string;
  accentColor?: string;
  iconType: "current" | "highest" | "rank" | "contests";
  delay?: number;
}

export default function RatingStatCard({
  title,
  value,
  subtitle,
  badgeText,
  accentColor = "#FFA116",
  iconType,
  delay = 0,
}: RatingStatCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  // Smooth Count-Up Animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    const duration = 1200; // ms

    function animateCount(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(animateCount);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay, prefersReducedMotion]);

  const icons = {
    current: <TrendingUp className="w-4 h-4 text-[#FFA116]" aria-hidden="true" />,
    highest: <Trophy className="w-4 h-4 text-amber-400" aria-hidden="true" />,
    rank: <Award className="w-4 h-4 text-cyan-400" aria-hidden="true" />,
    contests: <Flame className="w-4 h-4 text-rose-400" aria-hidden="true" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="p-5 sm:p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.07] shadow-xl hover:border-white/[0.14] transition-colors relative overflow-hidden flex flex-col justify-between"
    >
      {/* Background glow accent */}
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted tracking-wider uppercase font-medium">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
          {icons[iconType]}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="my-3">
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
          {iconType === "rank" ? `#${displayValue.toLocaleString()}` : displayValue.toLocaleString()}
        </div>
      </div>

      {/* Subtitle / Badge Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted">
        {subtitle && <span>{subtitle}</span>}
        {badgeText && (
          <span
            className="px-2 py-0.5 rounded-full font-mono text-[11px] font-semibold border"
            style={{
              borderColor: `${accentColor}40`,
              backgroundColor: `${accentColor}15`,
              color: accentColor,
            }}
          >
            {badgeText}
          </span>
        )}
      </div>
    </motion.div>
  );
}
