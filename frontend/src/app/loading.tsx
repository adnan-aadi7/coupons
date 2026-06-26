import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#FF6A13] animate-spin" />
        <p className="text-sm font-semibold text-slate-400 tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
