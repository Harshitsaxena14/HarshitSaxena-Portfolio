"use client";

import { useEffect, useState } from "react";
import { LeetCodeStats, getFallbackLeetCodeStats } from "@/lib/leetcode";
import RatingStatCard from "./RatingStatCard";
import DifficultyDoughnut from "./DifficultyDoughnut";
import ContestGraph from "./ContestGraph";
import SubmissionHeatmap from "./SubmissionHeatmap";
import LeetCodeSkeleton from "./LeetCodeSkeleton";
import { ExternalLink } from "lucide-react";
import { RevealSection, StaggerContainer, StaggerItem, FadeUp } from "@/components/ui/motion";

export default function LeetCodeSection() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  const username = process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "harshit_saxena14";

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        const res = await fetch("/api/leetcode");
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data: LeetCodeStats = await res.json();
        if (isMounted) {
          setStats(data);
          setLoading(false);
        }
      } catch (err: any) {
        console.warn("[LeetCodeSection] Client fetch fallback:", err);
        if (isMounted) {
          setStats(getFallbackLeetCodeStats(username));
          setLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <RevealSection
      id="leetcode"
      className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-black border-b border-border-subtle overflow-hidden"
    >
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono text-xs text-text-muted tracking-widest block uppercase mb-2">
            // 05. DSA &middot; ALGORITHMIC ANALYTICS
          </span>
            <h2
              id="leetcode-heading"
              className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight flex items-center gap-3"
            >
              LeetCode Dashboard
              <span className="text-xs font-mono font-normal text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </h2>
          </div>

          <a
            href={`https://leetcode.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-text-primary transition-colors border border-border-subtle hover:border-border-medium px-3 py-1.5 rounded bg-background-subtle group"
          >
            <span>@{username}</span>
            <ExternalLink className="w-3 h-3 text-text-muted group-hover:text-text-primary transition-colors" />
          </a>
        </FadeUp>

        {loading ? (
          <LeetCodeSkeleton />
        ) : stats ? (
          <StaggerContainer className="flex flex-col gap-6">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
              <StaggerItem className="lg:col-span-4 flex flex-col gap-4">
                <RatingStatCard
                  title="Contest Rating"
                  value={stats.currentRating}
                  subtitle={`Peak: ${stats.highestRating}`}
                  badgeText={`Top ${stats.globalTopPercentage}%`}
                  accentColor="#FFA116"
                  iconType="current"
                />
                <RatingStatCard
                  title="Global Ranking"
                  value={stats.ranking}
                  subtitle={`Contests: ${stats.contestCount}`}
                  accentColor="#00E5FF"
                  iconType="rank"
                />
              </StaggerItem>

              <StaggerItem className="lg:col-span-8 flex flex-col">
                <DifficultyDoughnut
                  totalSolved={stats.totalSolved}
                  totalQuestions={stats.totalQuestions}
                  easySolved={stats.easySolved}
                  easyTotal={stats.easyTotal}
                  mediumSolved={stats.mediumSolved}
                  mediumTotal={stats.mediumTotal}
                  hardSolved={stats.hardSolved}
                  hardTotal={stats.hardTotal}
                />
              </StaggerItem>
            </div>

            {/* Bottom Row: Contest Rating Graph + Submission Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <StaggerItem className="lg:col-span-6">
                <ContestGraph
                  history={stats.contestHistory}
                  currentRating={stats.currentRating}
                  highestRating={stats.highestRating}
                />
              </StaggerItem>

              <StaggerItem className="lg:col-span-6">
                <SubmissionHeatmap
                  submissionCalendar={stats.submissionCalendar}
                  totalSubmissions={stats.totalSubmissions}
                  activeDays={stats.activeDays}
                  maxStreak={stats.maxStreak}
                />
              </StaggerItem>
            </div>
          </StaggerContainer>
        ) : null}
      </div>
    </RevealSection>
  );
}
