"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ContestPoint } from "@/lib/leetcode";

interface ContestGraphProps {
  history: ContestPoint[];
  currentRating: number;
  highestRating: number;
}

export default function ContestGraph({
  history,
  currentRating,
  highestRating,
}: ContestGraphProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredPoint, setHoveredPoint] = useState<ContestPoint | null>(null);
  const [hoveredPos, setHoveredPos] = useState<{ x: number; y: number } | null>(null);

  if (!history || history.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.07] h-[340px] flex items-center justify-center text-text-muted text-xs font-mono">
        No contest data available
      </div>
    );
  }

  // Dimensions
  const width = 560;
  const height = 210;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Min / Max calculation with padding
  const ratings = history.map((h) => h.rating);
  const minRating = Math.floor(Math.min(...ratings) / 100) * 100 - 50;
  const maxRating = Math.ceil(Math.max(...ratings, highestRating) / 100) * 100 + 50;

  // Coordinate mappers
  const getX = (idx: number) => {
    if (history.length === 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (idx / (history.length - 1)) * chartWidth;
  };

  const getY = (rating: number) => {
    const ratio = (rating - minRating) / (maxRating - minRating);
    return paddingTop + chartHeight - ratio * chartHeight;
  };

  // Generate SVG path points
  const points = history.map((point, idx) => ({
    x: getX(idx),
    y: getY(point.rating),
    data: point,
  }));

  const pathD = points.reduce((acc, point, idx) => {
    return idx === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  // Area path for gradient fill
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

  // Gridlines
  const ratingRange = maxRating - minRating;
  const gridSteps = 4;
  const gridValues = Array.from({ length: gridSteps + 1 }, (_, i) =>
    Math.round(minRating + (ratingRange / gridSteps) * i)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="p-6 rounded-2xl bg-[#0A0A0C] border border-white/[0.07] shadow-xl flex flex-col justify-between relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-mono text-xs text-text-muted tracking-wider uppercase font-medium block">
            Contest Rating Graph
          </span>
          <span className="text-[11px] font-mono text-text-muted">
            {history.length} Contests Attended
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#FFA116]" />
            Current: {currentRating}
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden my-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="ratingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFA116" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFA116" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Gridlines */}
          {gridValues.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="rgba(255, 255, 255, 0.3)"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#ratingGradient)" />

          {/* Line Path */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="#FFA116"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Interactive Data Points */}
          {points.map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === pt.data ? 6 : 4}
                fill={hoveredPoint === pt.data ? "#FFFFFF" : "#FFA116"}
                stroke="#0A0A0C"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={(e) => {
                  setHoveredPoint(pt.data);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredPos({ x: pt.x, y: pt.y });
                }}
                onMouseLeave={() => {
                  setHoveredPoint(null);
                  setHoveredPos(null);
                }}
              />
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && hoveredPos && (
          <div
            className="absolute z-20 pointer-events-none p-2.5 rounded-lg bg-black/90 border border-white/15 shadow-2xl text-xs font-mono text-white whitespace-nowrap -translate-x-1/2 -translate-y-full mb-2"
            style={{
              left: `${(hoveredPos.x / width) * 100}%`,
              top: `${(hoveredPos.y / height) * 100}%`,
            }}
          >
            <div className="font-semibold text-amber-400">{hoveredPoint.contestTitle}</div>
            <div className="text-[11px] text-text-muted mt-0.5">{hoveredPoint.date}</div>
            <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between gap-3">
              <span>Rating: <strong className="text-white">{hoveredPoint.rating}</strong></span>
              <span>Rank: <strong className="text-white">#{hoveredPoint.ranking}</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-muted font-mono pt-3 border-t border-white/[0.06]">
        <span>First Contest: {history[0]?.date}</span>
        <span>Latest Contest: {history[history.length - 1]?.date}</span>
      </div>
    </motion.div>
  );
}
