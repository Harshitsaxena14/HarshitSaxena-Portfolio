import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 bg-[#09090d] space-y-6 shadow-2xl">
        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center mx-auto text-emerald-400">
          <Terminal size={24} />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold text-emerald-400 tracking-widest uppercase block">
            404 // RESOURCE NOT FOUND
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Page Signal Lost
          </h1>
          <p className="text-xs text-text-muted leading-relaxed font-sans">
            The requested address or route does not exist within the HarshitOS environment.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-medium text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO OVERVIEW</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
