"use client";

import { motion } from "framer-motion";

interface DifficultyDoughnutProps {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}

export default function DifficultyDoughnut({
  totalSolved,
  totalQuestions,
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
}: DifficultyDoughnutProps) {
  // SVG Circular progress math
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Ratios
  const easyRatio = totalSolved > 0 ? easySolved / totalSolved : 0.33;
  const mediumRatio = totalSolved > 0 ? mediumSolved / totalSolved : 0.33;
  const hardRatio = totalSolved > 0 ? hardSolved / totalSolved : 0.34;

  const easyStroke = circumference * easyRatio;
  const mediumStroke = circumference * mediumRatio;
  const hardStroke = circumference * hardRatio;

  // Offset positions around circle
  const easyOffset = 0;
  const mediumOffset = -easyStroke;
  const hardOffset = -(easyStroke + mediumStroke);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.07] shadow-xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-text-muted tracking-wider uppercase font-medium">
          Solved Problems
        </span>
        <span className="font-mono text-xs text-text-muted">
          {totalSolved} / {totalQuestions}
        </span>
      </div>

      {/* Doughnut SVG & Center Stat */}
      <div className="relative flex items-center justify-center my-2">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Easy Segment (#10B981) */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10B981"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${easyStroke} ${circumference}`}
            strokeDashoffset={easyOffset}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${easyStroke} ${circumference}` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Medium Segment (#F59E0B) */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#F59E0B"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${mediumStroke} ${circumference}`}
            strokeDashoffset={mediumOffset}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${mediumStroke} ${circumference}` }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />

          {/* Hard Segment (#EF4444) */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#EF4444"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${hardStroke} ${circumference}`}
            strokeDashoffset={hardOffset}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${hardStroke} ${circumference}` }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
            {totalSolved}
          </span>
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest mt-0.5">
            Solved
          </span>
        </div>
      </div>

      {/* Difficulty Breakdown Cards */}
      <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-white/[0.06]">
        {/* Easy */}
        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-center">
          <span className="block text-[11px] font-mono text-emerald-400 font-semibold uppercase">
            Easy
          </span>
          <span className="text-base font-bold font-mono text-white mt-0.5 block">
            {easySolved}
          </span>
          <span className="text-[10px] font-mono text-text-muted block">
            /{easyTotal}
          </span>
        </div>

        {/* Medium */}
        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-center">
          <span className="block text-[11px] font-mono text-amber-400 font-semibold uppercase">
            Medium
          </span>
          <span className="text-base font-bold font-mono text-white mt-0.5 block">
            {mediumSolved}
          </span>
          <span className="text-[10px] font-mono text-text-muted block">
            /{mediumTotal}
          </span>
        </div>

        {/* Hard */}
        <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-center">
          <span className="block text-[11px] font-mono text-rose-400 font-semibold uppercase">
            Hard
          </span>
          <span className="text-base font-bold font-mono text-white mt-0.5 block">
            {hardSolved}
          </span>
          <span className="text-[10px] font-mono text-text-muted block">
            /{hardTotal}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
