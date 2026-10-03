"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Compass, Sparkles } from "lucide-react";
import { Activity, Category } from "@/types";
import { PlanCard } from "./PlanCard";
import { ActivityDetailsModal } from "../explore/ActivityDetailsModal";

interface PlansScreenProps {
  interestedActivities: Activity[];
  createdActivities: Activity[];
  onRemoveInterested: (id: string) => void;
  onExplore: () => void;
  onCreatePlan: () => void;
  userInterests: Category[];
}

export function PlansScreen({
  interestedActivities,
  createdActivities,
  onRemoveInterested,
  onExplore,
  onCreatePlan,
  userInterests,
}: PlansScreenProps) {
  const [tab, setTab] = useState<"interested" | "created">("interested");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const displayedList = tab === "interested" ? interestedActivities : createdActivities;

  return (
    <div className="flex-1 flex flex-col w-full h-full pb-24 px-4 pt-4 overflow-y-auto no-scrollbar">
      {/* Screen Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">
          My Plans
        </h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Activities you want to do and people to do them with
        </p>
      </div>

      {/* Segmented Controls / Tabs */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-900 border border-white/5 mb-5">
        <button
          onClick={() => setTab("interested")}
          className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            tab === "interested"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>Interested</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-700/80 text-zinc-300">
            {interestedActivities.length}
          </span>
        </button>

        <button
          onClick={() => setTab("created")}
          className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            tab === "created"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>Your Plans</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-700/80 text-zinc-300">
            {createdActivities.length}
          </span>
        </button>
      </div>

      {/* Content List or Empty State */}
      {displayedList.length > 0 ? (
        <div className="space-y-3">
          {displayedList.map((act) => (
            <PlanCard
              key={act.id}
              activity={act}
              isUserCreated={act.isUserCreated}
              onOpenDetails={() => setSelectedActivity(act)}
              onRemove={
                tab === "interested" ? () => onRemoveInterested(act.id) : undefined
              }
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-auto py-12 px-6 rounded-3xl bg-zinc-900/60 border border-white/5 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4">
            {tab === "interested" ? (
              <Calendar className="w-8 h-8" />
            ) : (
              <Plus className="w-8 h-8" />
            )}
          </div>

          <h3 className="text-lg font-bold text-white mb-1">
            Nothing here yet.
          </h3>
          <p className="text-xs text-zinc-400 max-w-xs leading-relaxed mb-6">
            {tab === "interested"
              ? "Swipe right on something you'd actually do in the Explore feed."
              : "Don't wait for someone else to make a plan. Create one in 30 seconds."}
          </p>

          {tab === "interested" ? (
            <button
              onClick={onExplore}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore plans</span>
            </button>
          ) : (
            <button
              onClick={onCreatePlan}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Make a plan</span>
            </button>
          )}
        </motion.div>
      )}

      {/* Activity Details Modal */}
      <ActivityDetailsModal
        activity={selectedActivity}
        isOpen={selectedActivity !== null}
        onClose={() => setSelectedActivity(null)}
        isInterested={
          selectedActivity
            ? interestedActivities.some((a) => a.id === selectedActivity.id)
            : false
        }
        onToggleInterested={(act) => {
          onRemoveInterested(act.id);
          setSelectedActivity(null);
        }}
        userInterests={userInterests}
        onOpenAttendees={() => {}}
      />
    </div>
  );
}
