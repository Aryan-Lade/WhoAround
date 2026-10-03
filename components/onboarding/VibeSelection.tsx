"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Compass } from "lucide-react";
import { VIBES } from "@/data/vibes";
import { Vibe } from "@/types";

interface VibeSelectionProps {
  selectedVibes: Vibe[];
  onToggleVibe: (vibe: Vibe) => void;
  onNext: () => void;
  onBack: () => void;
}

export function VibeSelection({
  selectedVibes,
  onToggleVibe,
  onNext,
  onBack,
}: VibeSelectionProps) {
  const canProceed = selectedVibes.length >= 1;

  return (
    <div className="relative min-h-dvh flex flex-col justify-between p-6 bg-zinc-950">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pt-4 pb-4">
          <button
            onClick={onBack}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 -ml-2 transition-colors"
          >
            ← Back
          </button>
          <span className="text-[11px] font-semibold tracking-wider text-orange-400 uppercase">
            Step 3 of 3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Intent & Atmosphere</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            What&apos;s your vibe?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            What kind of plans are you looking for?
          </p>
        </motion.div>
      </div>

      {/* Vibes List */}
      <div className="my-auto py-3 space-y-2.5 overflow-y-auto no-scrollbar max-h-[52vh]">
        {VIBES.map((vibe, idx) => {
          const isSelected = selectedVibes.includes(vibe.id);
          return (
            <motion.button
              key={vibe.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              onClick={() => onToggleVibe(vibe.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                isSelected
                  ? "bg-zinc-900 border-orange-500 shadow-[0_0_15px_-4px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/40"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/20 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{vibe.emoji}</span>
                <div>
                  <span className="font-bold text-sm text-zinc-100 block">
                    {vibe.label}
                  </span>
                  <span className="text-xs text-zinc-400 block mt-0.5">
                    {vibe.tagline}
                  </span>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-colors ${
                  isSelected
                    ? "bg-orange-500 text-white"
                    : "border border-zinc-700 bg-zinc-800"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Button */}
      <div className="pb-6 pt-2">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-xl transition-all flex items-center justify-center gap-2 ${
            canProceed
              ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 active:scale-[0.98]"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
          }`}
        >
          <span>Let&apos;s see what&apos;s around</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-[11px] text-zinc-500 mt-2">
          {selectedVibes.length} vibes selected
        </p>
      </div>
    </div>
  );
}
