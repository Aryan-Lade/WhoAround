"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Shield,
  Check,
  Share2,
  Sparkles,
  Coins,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Activity, Category } from "@/types";
import { getCategoryInfo } from "@/data/interests";

interface ActivityDetailsModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  isInterested: boolean;
  onToggleInterested: (activity: Activity) => void;
  userInterests: Category[];
  onOpenAttendees: () => void;
}

export function ActivityDetailsModal({
  activity,
  isOpen,
  onClose,
  isInterested,
  onToggleInterested,
  userInterests,
  onOpenAttendees,
}: ActivityDetailsModalProps) {
  const [showSafetySheet, setShowSafetySheet] = useState(false);
  const [reported, setReported] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !activity) return null;

  const categoryInfo = getCategoryInfo(activity.category);

  const handleInterestedClick = () => {
    onToggleInterested(activity);
    if (!isInterested) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#f97316", "#10b981", "#3b82f6", "#f59e0b"],
        });
      } catch (e) {}
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out "${activity.title}" on Who Around in ${activity.city}: Find your people. Find your plans!`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Apple Dimming Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        {/* Apple Modal Sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[480px] sm:max-w-xl md:max-w-2xl apple-sheet rounded-t-[36px] sm:rounded-[36px] z-10 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* iOS Grab Handle */}
          <div className="apple-grab-handle" />

          {/* Scrollable Content */}
          <div className="overflow-y-auto no-scrollbar pb-24">
            {/* Hero Image Header */}
            <div className="relative h-64 sm:h-72 w-full bg-zinc-900">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                unoptimized
                sizes="(max-width: 480px) 100vw, 480px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/60" />

              {/* Close & Action Buttons */}
              <div className="absolute top-3 inset-x-4 flex items-center justify-between z-10">
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-white flex items-center justify-center apple-pressable"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="h-9 px-3 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-white flex items-center gap-1.5 text-xs font-semibold apple-pressable"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied!" : "Share"}</span>
                  </button>

                  <button
                    onClick={() => setShowSafetySheet(true)}
                    className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center apple-pressable"
                    title="Safety & Reporting"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Category & City floating badges */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <span
                  className="apple-badge text-white shadow-md"
                  style={{
                    backgroundColor: categoryInfo.bgLight,
                    borderColor: `${categoryInfo.accent}70`,
                  }}
                >
                  <span>{categoryInfo.emoji}</span>
                  <span>{activity.category}</span>
                </span>

                <span className="apple-badge bg-black/60 text-zinc-200 border-white/15">
                  📍 {activity.distance} away
                </span>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-5 space-y-5">
              {/* Title & Host header */}
              <div>
                <h1 className="text-2xl sm:text-3xl apple-heading">
                  {activity.title}
                </h1>

                {/* Host profile info */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/8">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-orange-500/30">
                    <Image
                      src={activity.hostAvatar}
                      alt={activity.host}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="apple-caption uppercase">Hosted by</p>
                    <p className="text-sm font-bold text-zinc-900">{activity.host}</p>
                  </div>
                </div>
              </div>

              {/* Key Logistics Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="apple-caption">Date & Time</p>
                    <p className="text-xs font-bold text-zinc-900 mt-0.5">
                      {activity.date}
                    </p>
                    <p className="text-[11px] text-zinc-600">{activity.time}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="apple-caption">Public Venue</p>
                    <p className="text-xs font-bold text-zinc-900 mt-0.5 truncate">
                      {activity.location}
                    </p>
                    <p className="text-[11px] text-zinc-600">{activity.city}</p>
                  </div>
                </div>

                {activity.cost && (
                  <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 flex items-start gap-2.5">
                    <Coins className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="apple-caption">Estimated Cost</p>
                      <p className="text-xs font-bold text-zinc-900 mt-0.5">
                        {activity.cost}
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="apple-caption">Group Capacity</p>
                    <p className="text-xs font-bold text-zinc-900 mt-0.5">
                      Up to {activity.capacity} people
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="apple-caption uppercase mb-2">About this plan</h4>
                <p className="text-sm text-zinc-700 leading-relaxed bg-black/[0.03] p-4 rounded-2xl border border-black/6">
                  {activity.description}
                </p>
              </div>

              {/* Tags / Vibes */}
              {activity.tags && activity.tags.length > 0 && (
                <div>
                  <h4 className="apple-caption uppercase mb-2">Vibe & Focus</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="apple-badge bg-black/[0.04] text-zinc-700 border-black/8"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Proof: People Interested & Shared Matching */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="apple-caption uppercase flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    People you might meet ({activity.interestedCount})
                  </h4>
                  <button
                    onClick={onOpenAttendees}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 apple-pressable"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-2">
                  {activity.attendees.map((attendee) => {
                    const shared = attendee.interests.filter((i) =>
                      userInterests.includes(i)
                    );
                    return (
                      <div
                        key={attendee.id}
                        className="p-3 rounded-2xl bg-black/[0.03] border border-black/8 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-200">
                            <Image
                              src={attendee.avatar}
                              alt={attendee.name}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-zinc-900">
                              {attendee.name.split(" ")[0]}
                            </p>
                            <p className="apple-caption text-[11px] text-zinc-500">
                              {attendee.role || attendee.bio?.slice(0, 30)}
                            </p>
                          </div>
                        </div>

                        {shared.length > 0 ? (
                          <span className="apple-badge bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px]">
                            You both like {shared[0]}
                          </span>
                        ) : (
                          <span className="apple-caption text-[11px] text-zinc-500">
                            {attendee.interests.slice(0, 2).join(" · ")}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety notice banner */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-zinc-900">Safety First</p>
                  <p className="apple-caption text-[11px] text-zinc-600 mt-0.5 leading-relaxed">
                    Always meet in public places. Stay aware. You control what you share. Never share financial or sensitive details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Action Bar with Apple Translucency */}
          <div className="absolute bottom-0 inset-x-0 p-4 apple-nav-dock border-t border-black/8 flex flex-col gap-2">
            <button
              onClick={handleInterestedClick}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 apple-pressable ${
                isInterested
                  ? "bg-emerald-600 text-white shadow-md"
                  : "apple-btn-primary"
              }`}
            >
              {isInterested ? (
                <>
                  <Check className="w-5 h-5 stroke-[2.5]" />
                  <span>You&apos;re interested ✓</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>I&apos;m interested</span>
                </>
              )}
            </button>

            {isInterested && (
              <p className="text-center text-[11px] font-semibold text-emerald-700 animate-fadeIn">
                Nice. You won&apos;t be going alone. Added to My Plans.
              </p>
            )}
          </div>

          {/* Safety & Report Bottom Sheet */}
          <AnimatePresence>
            {showSafetySheet && (
              <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <h3 className="apple-heading text-base flex items-center gap-2">
                      <Shield className="w-4 h-4 text-orange-500" />
                      Trust & Safety Options
                    </h3>
                    <button
                      onClick={() => setShowSafetySheet(false)}
                      className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 apple-pressable"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="py-4 space-y-3">
                    <p className="apple-subheadline text-xs">
                      Who Around is built for open public social discovery. If an activity seems suspicious, unsafe, or violates guidelines, let us know.
                    </p>

                    <button
                      onClick={() => {
                        setReported(true);
                        setTimeout(() => setShowSafetySheet(false), 1500);
                      }}
                      className="w-full text-left p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-100 apple-pressable"
                    >
                      {reported ? "Activity Reported ✓" : "Report this activity"}
                    </button>

                    <button
                      onClick={() => {
                        setShowSafetySheet(false);
                        onClose();
                      }}
                      className="w-full text-left p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 text-xs font-semibold text-zinc-800 hover:bg-black/[0.06] apple-pressable"
                    >
                      Block host & hide plans
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowSafetySheet(false)}
                  className="apple-btn-secondary w-full"
                >
                  Done
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
