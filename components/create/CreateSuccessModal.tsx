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
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm apple-glass-heavy border border-black/10 rounded-[32px] p-6 shadow-2xl z-10 text-center flex flex-col items-center"
        >
          {/* Animated checkmark icon with Apple halo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 mb-4 shadow-[0_0_35px_-5px_rgba(249,115,22,0.35)]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-orange-500">
              <CheckCircle2 className="w-9 h-9 text-orange-500 stroke-[2.2]" />
            </div>
          </div>

          <span className="apple-badge bg-orange-500/10 text-orange-600 border-orange-500/20 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Activity Posted
          </span>

          <h3 className="text-2xl apple-heading mb-2">
            Your plan is live.
          </h3>

          <p className="apple-subheadline text-xs leading-relaxed max-w-xs mb-6 bg-black/[0.03] p-3.5 rounded-2xl border border-black/6 italic">
            &ldquo;You might not know them yet. But they might want to play too.&rdquo;
          </p>

          <div className="w-full p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 text-left mb-6">
            <p className="text-xs font-bold text-zinc-900 truncate">
              {activity.title}
            </p>
            <p className="apple-caption text-[11px] mt-0.5">
              {activity.date} · {activity.location}
            </p>
          </div>

          <button
            onClick={onSeeFeed}
            className="apple-btn-primary w-full py-3.5 text-sm shadow-xl"
          >
            <Compass className="w-4 h-4" />
            <span>See who&apos;s around</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
