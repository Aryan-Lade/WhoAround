"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { Activity } from "@/types";
import { getCategoryInfo } from "@/data/interests";

interface ActivityCardProps {
  activity: Activity;
  matchReason?: string;
  onOpenDetails: () => void;
  onOpenAttendees: () => void;
}

export function ActivityCard({
  activity,
  matchReason,
  onOpenDetails,
  onOpenAttendees,
}: ActivityCardProps) {
  const [imgError, setImgError] = useState(false);
  const categoryInfo = getCategoryInfo(activity.category);

  return (
    <div
      onClick={onOpenDetails}
      className="relative w-full h-full rounded-[32px] overflow-hidden cursor-pointer select-none bg-zinc-950 border border-white/12 border-t-white/25 shadow-2xl flex flex-col justify-between group will-change-transform"
    >
      {/* Background Image / Fallback Gradient */}
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            unoptimized
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
            priority
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${
              activity.gradient || "from-zinc-800 to-zinc-950"
            }`}
          />
        )}

        {/* Multi-layered Apple Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />
      </div>

      {/* Top Bar on Card */}
      <div className="relative z-10 p-5 flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5 items-start">
          {/* Category Pill with Apple translucency */}
          <span
            className="apple-badge text-white shadow-md"
            style={{
              backgroundColor: categoryInfo.bgLight,
              borderColor: `${categoryInfo.accent}60`,
            }}
          >
            <span>{categoryInfo.emoji}</span>
            <span>{activity.category}</span>
          </span>

          {/* Personalization / Match Reason Badge */}
          {matchReason && (
            <span className="apple-badge bg-orange-500/20 text-orange-200 border-orange-500/35">
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>{matchReason}</span>
            </span>
          )}
        </div>

        {/* Distance Badge */}
        <span className="apple-badge bg-black/50 text-zinc-200 border-white/12">
          <MapPin className="w-3 h-3 text-orange-400" />
          <span>{activity.distance}</span>
        </span>
      </div>

      {/* Bottom Information Container */}
      <div className="relative z-10 p-5 pt-0 space-y-3">
        {/* Title in Apple Display Typography with high contrast over photo */}
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-[1.06] tracking-tight drop-shadow-md">
          {activity.title}
        </h2>

        {/* Date, Time & Venue */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold text-white">{activity.date}</span>
            <span className="text-zinc-400">·</span>
            <span>{activity.time.split(" - ")[0]}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate max-w-[140px] text-zinc-200">
              {activity.location.split(",")[0]}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 leading-relaxed font-normal">
          &ldquo;{activity.description}&rdquo;
        </p>

        {/* Attendee / Social Proof Stack with Apple blur layer */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onOpenAttendees();
          }}
          className="pt-2.5 border-t border-white/10 flex items-center justify-between group/attendees apple-pressable"
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar Stack */}
            <div className="flex -space-x-2 overflow-hidden items-center">
              {activity.attendees.slice(0, 3).map((att) => (
                <div
                  key={att.id}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-zinc-950 overflow-hidden relative bg-zinc-800"
                >
                  <Image
                    src={att.avatar}
                    alt={att.name}
                    width={28}
                    height={28}
                    unoptimized
                    className="object-cover h-full w-full"
                  />
                </div>
              ))}
              {activity.interestedCount > 3 && (
                <div className="flex items-center justify-center h-7 w-7 rounded-full ring-2 ring-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-200">
                  +{activity.interestedCount - 3}
                </div>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-white group-hover/attendees:text-orange-400 transition-colors">
                {activity.interestedCount} people interested
              </span>
              <p className="apple-caption text-[10px] text-zinc-400">
                Hosted by {activity.host}
              </p>
            </div>
          </div>

          {/* View Plan CTA */}
          <div className="flex items-center gap-1 text-xs font-bold text-orange-400 group-hover/attendees:translate-x-0.5 transition-transform">
            <span>View plan</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
