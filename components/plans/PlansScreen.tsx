"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Plus, Compass } from "lucide-react";
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
      {/* Screen Header in Apple Optical Typography */}
      <div className="mb-4">
        <h1 className="text-2xl font-black apple-heading">
          My Plans
        </h1>
        <p className="apple-subheadline text-xs mt-0.5">
          Activities you want to do and people to do them with
        </p>
      </div>

      {/* iOS Style Segmented Control with spring feedback */}
      <div className="apple-segmented-control mb-5">
        <button
          onClick={() => setTab("interested")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 apple-pressable ${
            tab === "interested"
              ? "apple-segmented-item-active"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>Interested</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10 text-zinc-300 font-bold">
            {interestedActivities.length}
          </span>
        </button>

        <button
          onClick={() => setTab("created")}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 apple-pressable ${
            tab === "created"
              ? "apple-segmented-item-active"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <span>Your Plans</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/10 text-zinc-300 font-bold">
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
        /* Empty State with Apple Card styling */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="my-auto py-12 px-6 apple-card text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/20">
            {tab === "interested" ? (
              <Calendar className="w-8 h-8" />
            ) : (
              <Plus className="w-8 h-8" />
            )}
          </div>

          <h3 className="apple-heading text-lg mb-1">
            Nothing here yet.
          </h3>
          <p className="apple-subheadline text-xs max-w-xs leading-relaxed mb-6">
            {tab === "interested"
              ? "Swipe right on something you'd actually do in the Explore feed."
              : "Don't wait for someone else to make a plan. Create one in 30 seconds."}
          </p>

          {tab === "interested" ? (
            <button
              onClick={onExplore}
              className="apple-btn-primary py-3 px-6 text-xs shadow-lg"
            >
              <Compass className="w-4 h-4" />
              <span>Explore plans</span>
            </button>
          ) : (
            <button
              onClick={onCreatePlan}
              className="apple-btn-primary py-3 px-6 text-xs shadow-lg"
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
