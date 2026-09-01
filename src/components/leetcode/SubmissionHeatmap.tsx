"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SubmissionHeatmapProps {
  submissionCalendar: Record<string, number>; // unix timestamp (seconds) -> submission count
  totalSubmissions: number;
  activeDays: number;
  maxStreak?: number;
}

export default function SubmissionHeatmap({
  submissionCalendar,
  totalSubmissions,
  activeDays,
  maxStreak = 24,
}: SubmissionHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<{
    dateStr: string;
    count: number;
  } | null>(null);

  // Generate 52 weeks (364 days) leading up to today
  const weeksCount = 52;
  const daysPerWeek = 7;
  const totalDays = weeksCount * daysPerWeek;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate grid matrix [52 weeks][7 days]
  const grid: Array<Array<{ date: Date; count: number; dateStr: string }>> = [];
  const monthLabels: Array<{ monthName: string; colIndex: number }> = [];

  let currentMonthName = "";

  for (let w = 0; w < weeksCount; w++) {
    const weekDays = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const dayOffset = totalDays - 1 - (w * 7 + d);
      const date = new Date(today.getTime() - dayOffset * 86400000);
      const timestampSec = Math.floor(date.getTime() / 1000);

      // Match timestamp rounded to day start
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      // Find matching key in calendar
      let count = 0;
      for (const [ts, cnt] of Object.entries(submissionCalendar || {})) {
        const calDate = new Date(Number(ts) * 1000);
        if (
          calDate.getFullYear() === date.getFullYear() &&
          calDate.getMonth() === date.getMonth() &&
          calDate.getDate() === date.getDate()
        ) {
          count += cnt;
        }
      }

      weekDays.push({ date, count, dateStr });

      // Track month labels
      const mName = date.toLocaleDateString("en-US", { month: "short" });
      if (d === 0 && mName !== currentMonthName) {
        currentMonthName = mName;
        monthLabels.push({ monthName: mName, colIndex: w });
      }
    }
    grid.push(weekDays);
  }

  // Get intensity color class
  const getCellColor = (count: number) => {
    if (count === 0) return "bg-white/[0.04] border-transparent";
    if (count <= 2) return "bg-emerald-950/80 border-emerald-800/40 text-emerald-300";
    if (count <= 4) return "bg-emerald-700/80 border-emerald-600/50 text-emerald-200";
    if (count <= 7) return "bg-emerald-500 border-emerald-400 text-white";
    return "bg-emerald-400 border-emerald-300 text-black font-bold shadow-[0_0_8px_rgba(52,211,153,0.5)]";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.07] shadow-xl flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-mono text-xs text-text-muted tracking-wider uppercase font-medium block">
            Submission Heatmap
          </span>
          <span className="text-[11px] font-mono text-text-muted">
            {totalSubmissions.toLocaleString()} submissions in the past year
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-text-muted text-[10px] block uppercase">Active Days</span>
            <span className="text-white font-bold">{activeDays}</span>
          </div>
          <div className="text-right">
            <span className="text-text-muted text-[10px] block uppercase">Max Streak</span>
            <span className="text-emerald-400 font-bold">{maxStreak} Days</span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto my-auto pb-2 scrollbar-none">
        <div className="min-w-[640px] select-none">
          {/* Month Labels Header */}
          <div className="flex text-[10px] font-mono text-text-muted mb-2.5 pl-6">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  position: "relative",
                  left: `${(m.colIndex / 52) * 100}%`,
                  marginRight: idx === monthLabels.length - 1 ? 0 : "-12px",
                }}
              >
                {m.monthName}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            {/* Day of Week Labels */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-text-muted pr-2 py-0.5">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Heatmap 52-column Grid */}
            <div className="flex-1 flex gap-1">
              {grid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 flex-1">
                  {week.map((cell, dIdx) => (
                    <div
                      key={dIdx}
                      className={`h-2.5 w-full rounded-sm border transition-all duration-150 cursor-pointer hover:scale-125 hover:z-10 ${getCellColor(
                        cell.count
                      )}`}
                      onMouseEnter={() =>
                        setHoveredCell({ dateStr: cell.dateStr, count: cell.count })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legend & Tooltip info */}
      <div className="flex items-center justify-between text-xs text-text-muted font-mono pt-3 border-t border-white/[0.06] mt-2">
        <div className="text-[11px]">
          {hoveredCell ? (
            <span className="text-white font-medium">
              <strong className="text-emerald-400">{hoveredCell.count} submissions</strong> on{" "}
              {hoveredCell.dateStr}
            </span>
          ) : (
            <span>Hover a cell to inspect activity</span>
          )}
        </div>

        {/* Intensity Legend */}
        <div className="flex items-center gap-1.5 text-[10px]">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.04]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950/80 border border-emerald-800/40" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700/80" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
