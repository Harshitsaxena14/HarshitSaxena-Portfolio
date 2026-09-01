"use client";

/**
 * LeetCodeSkeleton.tsx
 *
 * Skeleton loader matching exact layout dimensions to eliminate layout shift (CLS).
 */

export default function LeetCodeSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse" aria-hidden="true">
      {/* Top Row: Rating Stat Cards + Difficulty Doughnut */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Rating Stat Cards (7 cols on lg) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-[160px] flex flex-col justify-between">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-9 w-28 bg-white/15 rounded" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-[160px] flex flex-col justify-between">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-9 w-28 bg-white/15 rounded" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-[160px] flex flex-col justify-between">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-9 w-28 bg-white/15 rounded" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-[160px] flex flex-col justify-between">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-9 w-28 bg-white/15 rounded" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>
        </div>

        {/* Difficulty Doughnut Card (5 cols on lg) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] min-h-[336px] flex flex-col justify-between">
          <div className="h-4 w-32 bg-white/10 rounded mb-4" />
          <div className="flex items-center justify-center my-auto">
            <div className="w-36 h-36 rounded-full border-4 border-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.06]">
            <div className="h-10 bg-white/5 rounded" />
            <div className="h-10 bg-white/5 rounded" />
            <div className="h-10 bg-white/5 rounded" />
          </div>
        </div>
      </div>

      {/* Bottom Row: Contest Graph + Submission Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contest Graph (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-[340px] flex flex-col justify-between">
          <div className="h-4 w-40 bg-white/10 rounded mb-6" />
          <div className="flex-1 bg-white/5 rounded-lg mb-4" />
          <div className="h-3 w-48 bg-white/10 rounded" />
        </div>

        {/* Submission Heatmap (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-[340px] flex flex-col justify-between">
          <div className="h-4 w-40 bg-white/10 rounded mb-6" />
          <div className="flex-1 bg-white/5 rounded-lg mb-4" />
          <div className="h-3 w-48 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}
