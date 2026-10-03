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
    <div className="flex items-center justify-center gap-4 py-1.5 px-4 z-20">
      {/* Rewind / Undo */}
      <button
        onClick={onUndo}
        disabled={!canUndo || disabled}
        aria-label="Undo last swipe"
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all apple-pressable ${
          canUndo && !disabled
            ? "bg-white border border-black/8 text-amber-500 hover:bg-zinc-50 shadow-sm"
            : "bg-black/5 border border-black/5 text-zinc-400 cursor-not-allowed"
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
            ? "bg-black/5 border border-black/5 text-zinc-400 cursor-not-allowed"
            : "bg-white hover:bg-rose-50/60 border border-rose-200 text-rose-500 shadow-md shadow-rose-500/10"
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
            ? "bg-black/5 border border-black/5 text-zinc-400 cursor-not-allowed"
            : "bg-white hover:bg-zinc-50 border border-black/8 text-zinc-700 hover:text-zinc-950 shadow-sm"
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
            ? "bg-black/5 border border-black/5 text-zinc-400 cursor-not-allowed"
            : "bg-gradient-to-b from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 border-t border-white/25"
        }`}
        title="I'm interested!"
      >
        <Heart className="w-6 h-6 fill-current stroke-none" />
      </button>
    </div>
  );
}
