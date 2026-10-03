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
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all apple-pressable ${
          canUndo && !disabled
            ? "bg-white/10 hover:bg-white/15 border border-white/12 text-amber-400 shadow-md"
            : "bg-white/5 border border-white/5 text-zinc-600 cursor-not-allowed"
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
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all apple-pressable ${
          disabled
            ? "bg-white/5 border border-white/5 text-zinc-600 cursor-not-allowed"
            : "bg-zinc-900/80 hover:bg-rose-500/15 border border-rose-500/30 text-rose-400 shadow-lg shadow-rose-950/30"
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
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all apple-pressable ${
          disabled
            ? "bg-white/5 border border-white/5 text-zinc-600 cursor-not-allowed"
            : "bg-white/10 hover:bg-white/15 border border-white/12 text-zinc-200 hover:text-white shadow-md"
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
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all apple-pressable ${
          disabled
            ? "bg-white/5 border border-white/5 text-zinc-600 cursor-not-allowed"
            : "bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 border-t border-white/25"
        }`}
        title="I'm interested!"
      >
        <Heart className="w-6 h-6 fill-current stroke-none" />
      </button>
    </div>
  );
}
