"use client";

import React from "react";
import { X, Heart, RotateCcw, Info } from "lucide-react";

interface SwipeControlsProps {
  onSkip: () => void;
  onInterested: () => void;
  onOpenDetails: () => void;
  onUndo: () => void;
  canUndo: boolean;
  disabled?: boolean;
}

export function SwipeControls({
  onSkip,
  onInterested,
  onOpenDetails,
  onUndo,
  canUndo,
  disabled = false,
}: SwipeControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-3 px-4 z-20">
      {/* Rewind / Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        aria-label="Undo last swipe"
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
          canUndo && !disabled
            ? "bg-zinc-900 border border-white/10 text-amber-400 hover:bg-zinc-800 hover:scale-105 active:scale-95 shadow-md"
            : "bg-zinc-900/40 border border-white/5 text-zinc-600 cursor-not-allowed"
        }`}
        title="Undo last swipe"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      {/* Skip (Left) */}
      <button
        onClick={onSkip}
        disabled={disabled}
        aria-label="Skip activity"
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          disabled
            ? "bg-zinc-900/40 border border-white/5 text-zinc-600 cursor-not-allowed"
            : "bg-zinc-900 border border-rose-500/20 text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10 hover:scale-110 active:scale-95 shadow-lg shadow-rose-950/20"
        }`}
        title="Skip activity"
      >
        <X className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Info / Details */}
      <button
        onClick={onOpenDetails}
        disabled={disabled}
        aria-label="View activity details"
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
          disabled
            ? "bg-zinc-900/40 border border-white/5 text-zinc-600 cursor-not-allowed"
            : "bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:scale-105 active:scale-95 shadow-md"
        }`}
        title="View details"
      >
        <Info className="w-5 h-5" />
      </button>

      {/* Interested (Right) */}
      <button
        onClick={onInterested}
        disabled={disabled}
        aria-label="Mark as interested"
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
          disabled
            ? "bg-zinc-900/40 border border-white/5 text-zinc-600 cursor-not-allowed"
            : "bg-gradient-to-tr from-emerald-600 to-teal-500 text-white hover:scale-110 active:scale-95 shadow-lg shadow-emerald-500/25"
        }`}
        title="I'm interested!"
      >
        <Heart className="w-6 h-6 fill-current stroke-none" />
      </button>
    </div>
  );
}
