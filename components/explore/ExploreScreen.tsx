"use client";

import React, { useState, useMemo } from "react";
import { Activity, Category, City, Vibe } from "@/types";
import { CategoryFilter } from "./CategoryFilter";
import { ActivitySwipeStack } from "./ActivitySwipeStack";
import { ActivityDetailsModal } from "./ActivityDetailsModal";
import { AttendeeModal } from "./AttendeeModal";
import { scoreAndFilterActivities, ScoredActivity } from "@/lib/recommendations";
import { storage } from "@/lib/storage";

interface ExploreScreenProps {
  city: City;
  interests: Category[];
  vibes: Vibe[];
  activities: Activity[];
  swipedIds: string[];
  interestedIds: string[];
  onSwipeLeft: (activity: Activity) => void;
  onSwipeRight: (activity: Activity) => void;
  onToggleInterested: (activity: Activity) => void;
  onUndoSwipe: () => void;
  onResetSwipes: () => void;
  onCreatePlan: () => void;
}

export function ExploreScreen({
  city,
  interests,
  vibes,
  activities,
  swipedIds,
  interestedIds,
  onSwipeLeft,
  onSwipeRight,
  onToggleInterested,
  onUndoSwipe,
  onResetSwipes,
  onCreatePlan,
}: ExploreScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All" | "For You">("For You");
  const [activeModalActivity, setActiveModalActivity] = useState<Activity | null>(null);
  const [attendeeModalActivity, setAttendeeModalActivity] = useState<Activity | null>(null);

  // Compute scored & personalized activities using the algorithm
  const scoredActivities: ScoredActivity[] = useMemo(() => {
    return scoreAndFilterActivities({
      activities,
      city,
      interests,
      vibes,
      selectedCategory,
      excludeIds: swipedIds,
    });
  }, [activities, city, interests, vibes, selectedCategory, swipedIds]);

  return (
    <div className="flex-1 flex flex-col justify-between w-full h-full pb-20">
      {/* Category Filter Scroll */}
      <div className="pt-2 border-b border-white/5 bg-zinc-950/40">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Swipe Stack */}
      <div className="flex-1 flex flex-col justify-center py-2">
        <ActivitySwipeStack
          scoredActivities={scoredActivities}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          onOpenDetails={(act) => setActiveModalActivity(act)}
          onOpenAttendees={(act) => setAttendeeModalActivity(act)}
          onUndo={onUndoSwipe}
          onResetSwipes={onResetSwipes}
          onCreatePlan={onCreatePlan}
          canUndo={swipedIds.length > 0}
        />
      </div>

      {/* Activity Details Modal */}
      <ActivityDetailsModal
        activity={activeModalActivity}
        isOpen={activeModalActivity !== null}
        onClose={() => setActiveModalActivity(null)}
        isInterested={
          activeModalActivity ? interestedIds.includes(activeModalActivity.id) : false
        }
        onToggleInterested={onToggleInterested}
        userInterests={interests}
        onOpenAttendees={() => {
          if (activeModalActivity) {
            setAttendeeModalActivity(activeModalActivity);
          }
        }}
      />

      {/* Attendee Modal */}
      <AttendeeModal
        activity={attendeeModalActivity}
        isOpen={attendeeModalActivity !== null}
        onClose={() => setAttendeeModalActivity(null)}
        userInterests={interests}
      />
    </div>
  );
}
