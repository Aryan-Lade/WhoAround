"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/interests";
import { Category } from "@/types";

interface InterestSelectionProps {
  selectedInterests: Category[];
  onToggleInterest: (category: Category) => void;
  onNext: () => void;
  onBack: () => void;
}

export function InterestSelection({
  selectedInterests,
  onToggleInterest,
  onNext,
  onBack,
}: InterestSelectionProps) {
  const canProceed = selectedInterests.length >= 2;

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
            Step 2 of 3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Discovery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            What are you into?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
            Pick what you&apos;d actually do. (Select at least 2)
          </p>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <div className="my-auto py-3 max-h-[56vh] overflow-y-auto no-scrollbar grid grid-cols-2 gap-2.5">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedInterests.includes(cat.id);
          return (
            <motion.button
              key={cat.id}
              type="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: idx * 0.02 }}
              onClick={() => onToggleInterest(cat.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-24 group ${
                isSelected
                  ? "bg-zinc-900 border-orange-500 shadow-[0_0_15px_-4px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/20 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{cat.emoji}</span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-orange-500 text-white"
                      : "border border-zinc-700 bg-zinc-800"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              <div>
                <span className="font-bold text-sm text-zinc-100 block">
                  {cat.label}
                </span>
                <span className="text-[10px] text-zinc-400 line-clamp-1 block">
                  {cat.description.split(",")[0]}
                </span>
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
          <span>Show me what&apos;s around</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-[11px] text-zinc-500 mt-2">
          {selectedInterests.length === 0
            ? "Pick at least 2 interests to unlock matching"
            : selectedInterests.length === 1
            ? "Select 1 more to continue"
            : `${selectedInterests.length} interests selected`}
        </p>
      </div>
    </div>
  );
}
