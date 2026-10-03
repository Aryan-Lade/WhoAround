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
    <div className="relative min-h-dvh flex flex-col justify-between p-6 bg-gradient-to-b from-[#fbfbfd] via-[#f5f5f7] to-[#ebebf0]">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pt-4 pb-4">
          <button
            onClick={onBack}
            className="text-xs text-zinc-500 hover:text-zinc-900 px-2 py-1 -ml-2 transition-colors apple-pressable font-medium"
          >
            ← Back
          </button>
          <span className="text-[11px] font-bold tracking-wider text-orange-600 uppercase">
            Step 2 of 3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
        >
          <div className="apple-badge bg-orange-500/15 text-orange-700 border-orange-500/30 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Personalized Discovery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl apple-heading">
            What are you into?
          </h2>
          <p className="apple-subheadline text-xs sm:text-sm mt-1 leading-relaxed">
            Pick what you&apos;d actually do. (Select at least 2)
          </p>
        </motion.div>
      </div>

      {/* Categories Grid with Apple continuous rounding */}
      <div className="my-auto py-3 max-h-[56vh] overflow-y-auto no-scrollbar grid grid-cols-2 gap-2.5">
        {CATEGORIES.map((cat, idx) => {
          const isSelected = selectedInterests.includes(cat.id);
          return (
            <motion.button
              key={cat.id}
              type="button"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: idx * 0.02 }}
              onClick={() => onToggleInterest(cat.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-24 apple-pressable group shadow-sm ${
                isSelected
                  ? "bg-white border-orange-500 shadow-[0_0_20px_-4px_rgba(249,115,22,0.25)] ring-2 ring-orange-500/30"
                  : "bg-white/80 border-black/6 hover:border-black/15 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{cat.emoji}</span>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-orange-500 text-white shadow-sm"
                      : "border border-black/15 bg-zinc-50"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              <div>
                <span className="font-bold text-sm text-zinc-900 block tracking-tight">
                  {cat.label}
                </span>
                <span className="apple-caption text-[10px] text-zinc-500 line-clamp-1 block">
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
          className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 apple-pressable ${
            canProceed
              ? "apple-btn-primary shadow-xl"
              : "bg-zinc-200 text-zinc-400 cursor-not-allowed border border-black/5"
          }`}
        >
          <span>Show me what&apos;s around</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center apple-caption text-[11px] mt-2">
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
