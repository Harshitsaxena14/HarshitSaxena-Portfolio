"use client";

import React from "react";

interface UiverseButtonProps {
  href?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function UiverseButton({
  href = "#projects",
  children = "VIEW MY PROJECTS",
  className = "",
  onClick,
}: UiverseButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      role="button"
      className={`group relative inline-flex items-center justify-center rounded-full p-[1.5px] overflow-hidden transition-transform duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      {/* Outer spectrum glow layer */}
      <span
        aria-hidden="true"
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 opacity-35 blur-md group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
      />

      {/* Rotating spectrum border ring */}
      <span
        aria-hidden="true"
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] motion-reduce:animate-none bg-[conic-gradient(from_90deg_at_50%_50%,#00e5ff_0%,#7c3aed_33%,#f43f5e_66%,#00e5ff_100%)] opacity-85 group-hover:opacity-100 transition-opacity"
      />

      {/* Dark button core surface with inset depth */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#08080a] text-white font-mono text-xs font-semibold tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_inset_0_-2px_10px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Background constellation SVG network */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 180 48"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="spectrum-path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          {/* Static network background lines */}
          <path
            d="M10 24 Q 45 8, 90 24 T 170 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.15"
          />
          <path
            d="M15 36 Q 60 12, 110 36 T 165 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.12"
          />
          {/* Constellation node dots */}
          <circle cx="25" cy="18" r="1.5" fill="#00e5ff" className="animate-pulse" />
          <circle cx="90" cy="24" r="1.5" fill="#7c3aed" className="animate-pulse" />
          <circle cx="155" cy="18" r="1.5" fill="#f43f5e" className="animate-pulse" />
        </svg>

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <span
            className="text-[10px] text-cyan-400 group-hover:translate-y-0.5 transition-transform duration-200"
            aria-hidden="true"
          >
            ↓
          </span>
        </span>
      </span>
    </a>
  );
}

export default UiverseButton;
