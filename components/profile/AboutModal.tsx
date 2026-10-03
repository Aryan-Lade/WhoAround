"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Apple Dimming Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[480px] apple-sheet rounded-t-[36px] sm:rounded-[36px] p-6 pt-3 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* iOS Grab Handle */}
          <div className="apple-grab-handle" />

          <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 glow-accent" />
              <h3 className="apple-heading text-base uppercase">
                About Who Around
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-white/10 apple-pressable transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto no-scrollbar py-4 space-y-4 text-xs text-zinc-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-orange-500/12 border border-orange-500/25">
              <p className="font-black text-white text-sm tracking-tight">
                &ldquo;Find your people. Find your plans.&rdquo;
              </p>
              <p className="apple-subheadline text-xs mt-1 text-zinc-300">
                A mobile-first social activity discovery web app for people who want to do things but don&apos;t have someone to do them with.
              </p>
            </div>

            <div>
              <h4 className="apple-caption uppercase font-bold text-white mb-1.5">
                The Core Problem
              </h4>
              <p className="apple-subheadline text-xs">
                In every city, students, interns, transplants, and working professionals often miss out on hackathons, badminton games, street food walks, or concerts simply because they don&apos;t want to go alone.
              </p>
            </div>

            <div>
              <h4 className="apple-caption uppercase font-bold text-white mb-1.5">
                Not a Dating App
              </h4>
              <p className="apple-subheadline text-xs">
                You swipe on <span className="text-white font-semibold">ACTIVITIES</span>, not people. The hierarchy is Activity → People Interested → Mutual Connection.
              </p>
            </div>

            <div>
              <h4 className="apple-caption uppercase font-bold text-white mb-1.5">
                Frictionless Guest Demo
              </h4>
              <p className="apple-subheadline text-xs">
                No sign up, no passwords, no email verification. You open the app and instantly discover what&apos;s happening in Nagpur, Pune, Mumbai, and beyond.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="apple-btn-primary w-full text-xs shadow-lg"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
