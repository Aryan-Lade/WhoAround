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

/**
 * Apple WWDC 'Designing Fluid Interfaces' Momentum Projection:
 * Projects where an element will rest given its release velocity.
 */
function projectMomentum(initialVelocity: number, decelerationRate = 0.998): number {
  return ((initialVelocity / 1000) * decelerationRate) / (1 - decelerationRate);
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
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  // Motion value tracking 1:1 with pointer
  const x = useMotionValue(0);
  
  // Apple fluid rotation: subtle and natural, desynced from raw linear mapping
  const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);
  
  // Dynamic stamps: continuous opacity tracking during gesture
  const interestedOpacity = useTransform(x, [30, 110], [0, 1]);
  const skipOpacity = useTransform(x, [-30, -110], [0, 1]);

  const currentItem = scoredActivities[0];
  const nextItem = scoredActivities[1];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    // Project where the card is going based on release velocity (Apple Principle #6)
    const projectedX = info.offset.x + projectMomentum(info.velocity.x, 0.992);
    const triggerThreshold = 130;

    // Decide commit based on projected resting position and velocity direction
    if (projectedX > triggerThreshold || info.offset.x > 100 || info.velocity.x > 350) {
      // Swiped Right -> Interested
      setExitDirection("right");
      setTimeout(() => {
        if (currentItem) onSwipeRight(currentItem.activity);
        setExitDirection(null);
        x.set(0);
      }, 220);
    } else if (projectedX < -triggerThreshold || info.offset.x < -100 || info.velocity.x < -350) {
      // Swiped Left -> Skip
      setExitDirection("left");
      setTimeout(() => {
        if (currentItem) onSwipeLeft(currentItem.activity);
        setExitDirection(null);
        x.set(0);
      }, 220);
    } else {
      // Snap back: critically damped spring (damping 1.0, response 0.35)
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

  // Empty state when stack is exhausted
  if (!currentItem) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="apple-card p-8 max-w-sm w-full flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
            <Compass className="w-8 h-8" />
          </div>

          <h3 className="apple-heading text-xl mb-1.5">
            You&apos;re all caught up!
          </h3>
          <p className="apple-subheadline text-xs leading-relaxed mb-6">
            Swipe right on something you&apos;d actually do, check other categories, or create your own activity.
          </p>

          <div className="w-full space-y-2.5">
            <button
              onClick={onCreatePlan}
              className="apple-btn-primary w-full text-xs shadow-lg shadow-orange-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Make a Plan</span>
            </button>

            <button
              onClick={onResetSwipes}
              className="apple-btn-secondary w-full text-xs"
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
      {/* Cards container with Apple depth & materials */}
      <div className="relative w-full h-[clamp(370px,52vh,440px)] flex items-center justify-center">
        {/* Next Card underneath: calibrated Apple continuous depth */}
        {nextItem && (
          <div className="absolute inset-0 z-0 scale-[0.95] translate-y-3 opacity-70 pointer-events-none transition-all duration-300">
            <ActivityCard
              activity={nextItem.activity}
              matchReason={nextItem.matchReasons[0]}
              onOpenDetails={() => {}}
              onOpenAttendees={() => {}}
            />
          </div>
        )}

        {/* Top Active Card with Apple fluid gestures */}
        <motion.div
          key={currentItem.activity.id}
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.65} // Rubber-banding resistance
          onDragEnd={handleDragEnd}
          animate={
            exitDirection === "left"
              ? { x: -460, opacity: 0, rotate: -20, scale: 0.95 }
              : exitDirection === "right"
              ? { x: 460, opacity: 0, rotate: 20, scale: 0.95 }
              : { x: 0, opacity: 1, scale: 1 }
          }
          // Apple spring physics: damping 0.8 for momentum, response 0.35s
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="absolute inset-0 z-10 touch-none cursor-grab active:cursor-grabbing will-change-transform"
        >
          {/* Dynamic "INTERESTED" stamp on right drag */}
          <motion.div
            style={{ opacity: interestedOpacity }}
            className="absolute top-8 left-8 z-30 pointer-events-none -rotate-12 border-3 border-emerald-400 rounded-2xl px-4 py-1.5 bg-emerald-950/85 backdrop-blur-xl shadow-2xl"
          >
            <span className="text-xl sm:text-2xl font-black text-emerald-300 tracking-wider">
              INTERESTED
            </span>
          </motion.div>

          {/* Dynamic "SKIP" stamp on left drag */}
          <motion.div
            style={{ opacity: skipOpacity }}
            className="absolute top-8 right-8 z-30 pointer-events-none rotate-12 border-3 border-rose-500 rounded-2xl px-4 py-1.5 bg-rose-950/85 backdrop-blur-xl shadow-2xl"
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
