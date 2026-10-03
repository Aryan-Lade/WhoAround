"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Users } from "lucide-react";
import { City, Category } from "@/types";

interface TransitionScreenProps {
  city: City;
  interests: Category[];
  onComplete: () => void;
}

export function TransitionScreen({ city, interests, onComplete }: TransitionScreenProps) {
  const [stage, setStage] = useState<"finding" | "found">("finding");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage("found");
    }, 1400);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#fbfbfd] via-[#f5f5f7] to-[#ebebf0] text-center overflow-hidden">
      {/* Background pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.8, 2.4],
            opacity: [0.5, 0.15, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="w-48 h-48 rounded-full border border-orange-500/30"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 2.0],
            opacity: [0.4, 0.1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.7,
          }}
          className="w-48 h-48 rounded-full border border-amber-500/25"
        />
      </div>

      {/* Central radar logo icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-10 w-24 h-24 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-[0_0_40px_-8px_rgba(249,115,22,0.45)] mb-8 flex items-center justify-center"
      >
        <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center relative overflow-hidden shadow-inner">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"
          />
          <Users className="w-10 h-10 text-orange-500 relative z-10" />
        </div>
      </motion.div>

      {/* Dynamic text transitions */}
      <div className="relative z-10 min-h-[90px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          {stage === "finding" ? (
            <motion.div
              key="finding"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <h3 className="text-2xl apple-heading">
                Finding your kind of people...
              </h3>
              <p className="apple-subheadline text-xs flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                Scanning activities around {city}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <h3 className="text-2xl apple-heading flex items-center justify-center gap-2">
                <span>Here&apos;s what&apos;s around you</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h3>
              <p className="text-sm text-orange-600 font-semibold">
                Personalized for your interests
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interest tags chips preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 flex flex-wrap justify-center gap-1.5 mt-4 max-w-xs"
      >
        {interests.slice(0, 4).map((interest) => (
          <span
            key={interest}
            className="apple-badge bg-white text-zinc-800 border-black/8 shadow-sm text-[11px]"
          >
            {interest}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
