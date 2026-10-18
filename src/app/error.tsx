"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[RouteError Boundary]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 bg-[#09090d] space-y-6 shadow-2xl">
        <div className="w-12 h-12 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center mx-auto text-red-400">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-red-400 tracking-widest uppercase block">
            ROUTE EXCEPTION // RUNTIME ERROR
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Unexpected Error
          </h1>
          <p className="text-xs text-text-muted leading-relaxed font-mono">
            {error.message || "An unexpected error occurred during execution."}
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-medium text-black bg-white hover:bg-white/90 transition-colors"
          >
            <RotateCcw size={14} />
            <span>RETRY SEGMENT</span>
          </button>
        </div>
      </div>
    </div>
  );
}
