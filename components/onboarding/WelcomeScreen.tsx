"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Users, X } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
  onQuickGuest: () => void;
}

export function WelcomeScreen({ onStart, onQuickGuest }: WelcomeScreenProps) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="relative min-h-dvh flex flex-col justify-between p-6 overflow-hidden bg-radial from-zinc-900/90 via-zinc-950 to-black">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-6 flex items-center justify-between z-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse glow-accent" />
          <span className="text-xs font-bold tracking-widest text-zinc-300 uppercase">
            WHO AROUND
          </span>
        </div>

        <button
          onClick={() => setShowHowItWorks(true)}
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 hover:border-white/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>How it works</span>
        </button>
      </motion.div>

      {/* Hero Visual & Headline */}
      <div className="my-auto py-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-medium mb-6"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Activity & Social Discovery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-5"
        >
          Find your people. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500">
            Find your plans.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-sm mb-6"
        >
          There&apos;s always something happening around you. You just need someone to do it with.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 gap-2.5 max-w-sm"
        >
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-2.5">
            <span className="text-xl">🏸</span>
            <div>
              <p className="text-xs font-semibold text-zinc-200">Real Activities</p>
              <p className="text-[10px] text-zinc-400">Sports, meetups, walks</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-2.5">
            <span className="text-xl">👥</span>
            <div>
              <p className="text-xs font-semibold text-zinc-200">Shared Vibe</p>
              <p className="text-[10px] text-zinc-400">Never attend alone</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pb-6 z-10 flex flex-col gap-3"
      >
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          <span>Let&apos;s go</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-zinc-500">
            No signup required. Instant guest demo.
          </span>
          <button
            onClick={onQuickGuest}
            className="text-xs text-orange-400/90 hover:text-orange-300 underline underline-offset-2 transition-colors"
          >
            Continue as guest
          </button>
        </div>
      </motion.div>

      {/* How It Works Modal */}
      <AnimatePresence>
        {showHowItWorks && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHowItWorks(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  How Who Around Works
                </h3>
                <button
                  onClick={() => setShowHowItWorks(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-white">Swipe on Activities</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      This is NOT a dating app. You swipe on sports, tech meetups, food walks, and events.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-white">See Who Else Is Interested</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Check people who want to attend, see shared interests, and match plans.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-white">Make Your Own Plan</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
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
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors"
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
