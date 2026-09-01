import { NextResponse } from "next/server";
import { fetchLeetCodeStats } from "@/lib/leetcode";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const username = process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "harshit_saxena14";
  
  try {
    const stats = await fetchLeetCodeStats(username);
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
