"use client";

import React from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, ChevronRight, Trash2 } from "lucide-react";
import { Activity } from "@/types";
import { getCategoryInfo } from "@/data/interests";

interface PlanCardProps {
  activity: Activity;
  isUserCreated?: boolean;
  onOpenDetails: () => void;
  onRemove?: () => void;
}

export function PlanCard({
  activity,
  isUserCreated = false,
  onOpenDetails,
  onRemove,
}: PlanCardProps) {
  const categoryInfo = getCategoryInfo(activity.category);

  return (
    <div
      onClick={onOpenDetails}
      className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-white/20 transition-all cursor-pointer relative overflow-hidden group shadow-lg"
    >
      <div className="flex items-start gap-3.5">
        {/* Thumbnail Image */}
        <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            unoptimized
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span
            className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
            style={{
              backgroundColor: categoryInfo.bgLight,
              color: "#ffffff",
            }}
          >
            {categoryInfo.emoji}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
              {activity.category}
            </span>
            {isUserCreated ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Created by you
              </span>
            ) : (
              <span className="text-[10px] text-zinc-400 font-medium">
                {activity.distance}
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-white truncate leading-tight group-hover:text-orange-400 transition-colors">
            {activity.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-zinc-300 mt-1">
            <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">{activity.date}</span>
            <span className="text-zinc-500">·</span>
            <span>{activity.time.split(" - ")[0]}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{activity.location.split(",")[0]}</span>
          </div>

          {/* Social status footer */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <Users className="w-3 h-3 text-orange-400" />
              <span>{activity.interestedCount} interested</span>
            </div>

            <div className="flex items-center gap-2">
              {onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  className="p-1 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                  title="Remove plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="flex items-center text-xs font-semibold text-orange-400 group-hover:translate-x-0.5 transition-transform">
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
