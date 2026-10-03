"use client";

import React, { useState, useMemo } from "react";
import { Activity, Category, City, Vibe } from "@/types";
import { CategoryFilter } from "./CategoryFilter";
import { ActivitySwipeStack } from "./ActivitySwipeStack";
import { ActivityDetailsModal } from "./ActivityDetailsModal";
import { AttendeeModal } from "./AttendeeModal";
import { scoreAndFilterActivities, ScoredActivity } from "@/lib/recommendations";
import { storage } from "@/lib/storage";

import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Coins,
  Sparkles,
  Share2,
  Shield,
  Check,
  Plus,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { getCategoryInfo } from "@/data/interests";

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
  const [copied, setCopied] = useState(false);

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

  const currentScored = scoredActivities[0];
  const currentActivity = currentScored?.activity;
  const isCurrentInterested = currentActivity ? interestedIds.includes(currentActivity.id) : false;
  const currentCategoryInfo = currentActivity ? getCategoryInfo(currentActivity.category) : null;

  const handleShareCurrent = () => {
    if (!currentActivity || !navigator.clipboard) return;
    navigator.clipboard.writeText(
      `Check out "${currentActivity.title}" on Who Around in ${currentActivity.city}: Find your people. Find your plans!`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDesktopToggleInterested = () => {
    if (!currentActivity) return;
    onToggleInterested(currentActivity);
    if (!isCurrentInterested) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#f97316", "#10b981", "#3b82f6", "#f59e0b"],
        });
      } catch (e) {}
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between w-full h-full pb-20">
      {/* Category Filter Scroll */}
      <div className="pt-2 border-b border-black/[0.06] bg-white/70 backdrop-blur-md">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Main Swipe Stack & Desktop Companion Layout */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-center">
        <div className="w-full lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
          {/* Left Column: Swipe Stack */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center items-center">
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

          {/* Right Column: Desktop Live Companion Panel */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 flex-col gap-4 sticky top-20">
            {currentActivity && currentCategoryInfo ? (
              <div className="apple-card p-5 relative overflow-hidden space-y-4">
                {/* Header Tag and Distance */}
                <div className="flex items-center justify-between">
                  <span
                    className="apple-badge text-white shadow-xs text-xs font-semibold"
                    style={{
                      backgroundColor: currentCategoryInfo.bgLight,
                      borderColor: `${currentCategoryInfo.accent}70`,
                    }}
                  >
                    <span>{currentCategoryInfo.emoji}</span>
                    <span>{currentActivity.category}</span>
                  </span>

                  <span className="apple-badge bg-black/5 text-zinc-600 border-black/8 text-[11px]">
                    📍 {currentActivity.distance} away · {currentActivity.city}
                  </span>
                </div>

                {/* Title & Host Info */}
                <div>
                  <h3 className="text-xl font-bold apple-heading leading-snug">
                    {currentActivity.title}
                  </h3>

                  <div className="flex items-center gap-2.5 mt-2.5 pt-2.5 border-t border-black/6">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-orange-500/30">
                      <Image
                        src={currentActivity.hostAvatar}
                        alt={currentActivity.host}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="apple-caption text-[10px] uppercase">Hosted by</p>
                      <p className="text-xs font-bold text-zinc-900">{currentActivity.host}</p>
                    </div>
                  </div>
                </div>

                {/* Logistics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/[0.03] border border-black/6 flex items-start gap-2">
                    <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="apple-caption text-[10px]">When</p>
                      <p className="font-bold text-zinc-900 text-[11px] truncate">{currentActivity.date}</p>
                      <p className="text-zinc-600 text-[10px]">{currentActivity.time.split(" - ")[0]}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/[0.03] border border-black/6 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="apple-caption text-[10px]">Where</p>
                      <p className="font-bold text-zinc-900 text-[11px] truncate">{currentActivity.location.split(",")[0]}</p>
                      <p className="text-zinc-600 text-[10px]">{currentActivity.city}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/[0.03] border border-black/6 flex items-start gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="apple-caption text-[10px]">Capacity</p>
                      <p className="font-bold text-zinc-900 text-[11px]">Up to {currentActivity.capacity} people</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/[0.03] border border-black/6 flex items-start gap-2">
                    <Coins className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="apple-caption text-[10px]">Cost</p>
                      <p className="font-bold text-zinc-900 text-[11px] truncate">{currentActivity.cost || "Free"}</p>
                    </div>
                  </div>
                </div>

                {/* About description */}
                <div>
                  <p className="apple-caption text-[10px] uppercase font-bold text-zinc-500 mb-1">
                    About this plan
                  </p>
                  <p className="text-xs text-zinc-700 leading-relaxed bg-black/[0.02] p-3 rounded-xl border border-black/6">
                    &ldquo;{currentActivity.description}&rdquo;
                  </p>
                </div>

                {/* People Interested Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="apple-caption text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1">
                      <Users className="w-3 h-3 text-orange-500" />
                      Who&apos;s Interested ({currentActivity.interestedCount})
                    </span>
                    <button
                      onClick={() => setAttendeeModalActivity(currentActivity)}
                      className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 apple-pressable"
                    >
                      View all
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {currentActivity.attendees.slice(0, 2).map((att) => {
                      const shared = att.interests.filter((i) => interests.includes(i));
                      return (
                        <div
                          key={att.id}
                          className="p-2 rounded-xl bg-black/[0.02] border border-black/6 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-zinc-200">
                              <Image
                                src={att.avatar}
                                alt={att.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>
                            <span className="font-bold text-zinc-900 text-xs">
                              {att.name.split(" ")[0]}
                            </span>
                          </div>
                          {shared.length > 0 ? (
                            <span className="apple-badge bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] py-0.2 px-1.5">
                              Both like {shared[0]}
                            </span>
                          ) : (
                            <span className="text-[10px] text-zinc-500">{att.interests[0]}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={handleDesktopToggleInterested}
                    className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 apple-pressable ${
                      isCurrentInterested
                        ? "bg-emerald-600 text-white shadow-md"
                        : "apple-btn-primary"
                    }`}
                  >
                    {isCurrentInterested ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>You&apos;re interested ✓</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>I&apos;m interested</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShareCurrent}
                    className="apple-btn-secondary py-3 px-3 text-xs"
                    title="Share activity"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copied ? "Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Desktop Empty State Card */
              <div className="apple-card p-6 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="apple-heading text-base mb-1">
                  Ready for more?
                </h4>
                <p className="apple-subheadline text-xs max-w-xs mb-4">
                  Check out other categories, switch your city, or host a casual activity yourself.
                </p>
                <button
                  onClick={onCreatePlan}
                  className="apple-btn-primary w-full text-xs py-2.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Host a plan</span>
                </button>
              </div>
            )}
          </div>
        </div>
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
