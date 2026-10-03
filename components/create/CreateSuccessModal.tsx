"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, Compass } from "lucide-react";
import { Activity } from "@/types";

interface CreateSuccessModalProps {
  isOpen: boolean;
  activity: Activity | null;
  onSeeFeed: () => void;
}

export function CreateSuccessModal({
  isOpen,
  activity,
  onSeeFeed,
}: CreateSuccessModalProps) {
  if (!isOpen || !activity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl z-10 text-center flex flex-col items-center"
        >
          {/* Animated checkmark icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 mb-4 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]">
            <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-orange-400">
              <CheckCircle2 className="w-9 h-9 text-orange-400 stroke-[2.2]" />
            </div>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Activity Posted
          </span>

          <h3 className="text-2xl font-black text-white tracking-tight mb-2">
            Your plan is live.
          </h3>

          <p className="text-xs text-zinc-300 leading-relaxed max-w-xs mb-6 bg-zinc-800/50 p-3.5 rounded-xl border border-white/5 italic">
            &ldquo;You might not know them yet. But they might want to play too.&rdquo;
          </p>

          <div className="w-full p-3 rounded-xl bg-zinc-800/40 border border-white/5 text-left mb-6">
            <p className="text-xs font-bold text-white truncate">
              {activity.title}
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              {activity.date} · {activity.location}
            </p>
          </div>

          <button
            onClick={onSeeFeed}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>See who&apos;s around</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
