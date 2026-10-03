"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  PanInfo,
} from "framer-motion";
import { Sparkles, Plus, RotateCcw, Compass } from "lucide-react";
import { Activity } from "@/types";
import { ScoredActivity } from "@/lib/recommendations";
import { ActivityCard } from "./ActivityCard";
import { SwipeControls } from "./SwipeControls";

interface ActivitySwipeStackProps {
  scoredActivities: ScoredActivity[];
  onSwipeLeft: (activity: Activity) => void;
  onSwipeRight: (activity: Activity) => void;
  onOpenDetails: (activity: Activity) => void;
  onOpenAttendees: (activity: Activity) => void;
  onUndo: () => void;
  onResetSwipes: () => void;
  onCreatePlan: () => void;
  canUndo: boolean;
}

export function ActivitySwipeStack({
  scoredActivities,
  onSwipeLeft,
  onSwipeRight,
  onOpenDetails,
  onOpenAttendees,
  onUndo,
  onResetSwipes,
  onCreatePlan,
  canUndo,
}: ActivitySwipeStackProps) {
  // We manage the current top card from scoredActivities
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  // Motion values for the top card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-15, 0, 15]);
  const interestedOpacity = useTransform(x, [20, 100], [0, 1]);
  const skipOpacity = useTransform(x, [-20, -100], [0, 1]);

  const currentItem = scoredActivities[0];
  const nextItem = scoredActivities[1];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> Interested
      setExitDirection("right");
      setTimeout(() => {
        if (currentItem) onSwipeRight(currentItem.activity);
        setExitDirection(null);
        x.set(0);
      }, 200);
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> Skip
      setExitDirection("left");
      setTimeout(() => {
        if (currentItem) onSwipeLeft(currentItem.activity);
        setExitDirection(null);
        x.set(0);
      }, 200);
    } else {
      // Snap back
      x.set(0);
    }
  };

  const triggerSkip = () => {
    if (!currentItem) return;
    setExitDirection("left");
    setTimeout(() => {
      onSwipeLeft(currentItem.activity);
      setExitDirection(null);
      x.set(0);
    }, 220);
  };

  const triggerInterested = () => {
    if (!currentItem) return;
    setExitDirection("right");
    setTimeout(() => {
      onSwipeRight(currentItem.activity);
      setExitDirection(null);
      x.set(0);
    }, 220);
  };

  // If stack is exhausted
  if (!currentItem) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-8 rounded-3xl bg-zinc-900/80 border border-white/10 max-w-sm w-full flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
            <Compass className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-white mb-1.5">
            You&apos;re all caught up!
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Swipe right on something you&apos;d actually do, check other categories, or create your own activity.
          </p>

          <div className="w-full space-y-2.5">
            <button
              onClick={onCreatePlan}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Make a Plan</span>
            </button>

            <button
              onClick={onResetSwipes}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 font-semibold text-xs border border-white/5 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset & Shuffle Stack</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-4 pb-2 relative">
      {/* Cards container with depth */}
      <div className="relative w-full h-[510px] sm:h-[530px] flex items-center justify-center">
        {/* Next Card underneath (gives realistic physical stack depth) */}
        {nextItem && (
          <div className="absolute inset-0 z-0 scale-[0.94] translate-y-3 opacity-60 pointer-events-none transition-all duration-300">
            <ActivityCard
              activity={nextItem.activity}
              matchReason={nextItem.matchReasons[0]}
              onOpenDetails={() => {}}
              onOpenAttendees={() => {}}
            />
          </div>
        )}

        {/* Top Active Card */}
        <motion.div
          key={currentItem.activity.id}
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={
            exitDirection === "left"
              ? { x: -450, opacity: 0, rotate: -25 }
              : exitDirection === "right"
              ? { x: 450, opacity: 0, rotate: 25 }
              : { x: 0, opacity: 1, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing"
        >
          {/* Dynamic "INTERESTED" stamp on right drag */}
          <motion.div
            style={{ opacity: interestedOpacity }}
            className="absolute top-8 left-8 z-30 pointer-events-none -rotate-12 border-4 border-emerald-400 rounded-2xl px-4 py-1.5 bg-emerald-950/80 backdrop-blur-md shadow-2xl"
          >
            <span className="text-xl sm:text-2xl font-black text-emerald-300 tracking-wider">
              INTERESTED
            </span>
          </motion.div>

          {/* Dynamic "SKIP" stamp on left drag */}
          <motion.div
            style={{ opacity: skipOpacity }}
            className="absolute top-8 right-8 z-30 pointer-events-none rotate-12 border-4 border-rose-500 rounded-2xl px-4 py-1.5 bg-rose-950/80 backdrop-blur-md shadow-2xl"
          >
            <span className="text-xl sm:text-2xl font-black text-rose-400 tracking-wider">
              SKIP
            </span>
          </motion.div>

          <ActivityCard
            activity={currentItem.activity}
            matchReason={currentItem.matchReasons[0]}
            onOpenDetails={() => onOpenDetails(currentItem.activity)}
            onOpenAttendees={() => onOpenAttendees(currentItem.activity)}
          />
        </motion.div>
      </div>

      {/* Accessible Action Buttons Below Card */}
      <SwipeControls
        onSkip={triggerSkip}
        onInterested={triggerInterested}
        onOpenDetails={() => onOpenDetails(currentItem.activity)}
        onUndo={onUndo}
        canUndo={canUndo}
        disabled={exitDirection !== null}
      />
    </div>
  );
}
