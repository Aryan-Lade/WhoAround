"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, Sparkles, X } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  onQuickGuest: () => void;
}

export function WelcomeScreen({ onStart, onQuickGuest }: WelcomeScreenProps) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="relative min-h-dvh flex flex-col justify-between p-6 overflow-hidden bg-gradient-to-b from-[#fbfbfd] via-[#f5f5f7] to-[#ebebf0]">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-amber-400/8 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        className="pt-6 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse glow-accent" />
          <span className="text-xs font-black tracking-[-0.02em] text-zinc-900 uppercase">
            WHO AROUND
          </span>
        </div>

        <button
          onClick={() => setShowHowItWorks(true)}
          className="apple-badge bg-black/5 hover:bg-black/10 text-zinc-700 hover:text-zinc-950 apple-pressable transition-all border border-black/8"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>How it works</span>
        </button>
      </motion.div>

      {/* Hero Visual & Headline with Apple Optical Typography */}
      <div className="my-auto py-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 280, delay: 0.1 }}
          className="apple-badge bg-orange-500/15 text-orange-700 border-orange-500/30 mb-6"
        >
          <Compass className="w-3.5 h-3.5 text-orange-600" />
          <span>Activity & Social Discovery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280, delay: 0.2 }}
          className="text-4xl sm:text-5xl apple-display-title mb-5"
        >
          Find your people. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600">
            Find your plans.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280, delay: 0.3 }}
          className="apple-subheadline text-base sm:text-lg text-zinc-600 max-w-sm mb-7"
        >
          There&apos;s always something happening around you. You just need someone to do it with.
        </motion.p>

        {/* Apple Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280, delay: 0.4 }}
          className="grid grid-cols-2 gap-3 max-w-sm"
        >
          <div className="p-3.5 rounded-2xl bg-white/90 border border-black/6 flex items-start gap-2.5 shadow-sm">
            <span className="text-xl">🏸</span>
            <div>
              <p className="text-xs font-bold text-zinc-900">Real Activities</p>
              <p className="apple-caption text-[10px] text-zinc-500">Sports, meetups, walks</p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/90 border border-black/6 flex items-start gap-2.5 shadow-sm">
            <span className="text-xl">👥</span>
            <div>
              <p className="text-xs font-bold text-zinc-900">Shared Vibe</p>
              <p className="apple-caption text-[10px] text-zinc-500">Never attend alone</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 280, delay: 0.5 }}
        className="pb-6 z-10 flex flex-col gap-3.5"
      >
        <button
          onClick={onStart}
          className="apple-btn-primary w-full py-4 text-base shadow-xl group"
        >
          <span>Let&apos;s go</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-between px-1">
          <span className="apple-caption text-xs text-zinc-500">
            No signup required. Instant guest demo.
          </span>
          <button
            onClick={onQuickGuest}
            className="text-xs text-orange-600 hover:text-orange-700 font-semibold transition-colors apple-pressable"
          >
            Continue as guest
          </button>
        </div>
      </motion.div>

      {/* How It Works Modal with Apple Sheet styling */}
      <AnimatePresence>
        {showHowItWorks && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowItWorks(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative w-full max-w-sm apple-glass-heavy border border-black/10 rounded-3xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3.5 border-b border-black/8">
                <h3 className="apple-heading text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  How Who Around Works
                </h3>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 apple-pressable"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-sm text-zinc-700">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-orange-500/15 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs border border-orange-500/25">
                    1
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 text-xs">Swipe on Activities</p>
                    <p className="apple-subheadline text-xs mt-0.5">
                      This is NOT a dating app. You swipe on sports, tech meetups, food walks, and events.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-orange-500/15 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs border border-orange-500/25">
                    2
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 text-xs">See Who Else Is Interested</p>
                    <p className="apple-subheadline text-xs mt-0.5">
                      Check people who want to attend, see shared interests, and match plans.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-orange-500/15 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs border border-orange-500/25">
                    3
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 text-xs">Make Your Own Plan</p>
                    <p className="apple-subheadline text-xs mt-0.5">
                      Need 2 players for badminton? Post it in 30 seconds and others can join.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowHowItWorks(false);
                  onStart();
                }}
                className="apple-btn-primary w-full text-xs py-3"
              >
                Got it, let&apos;s start!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
