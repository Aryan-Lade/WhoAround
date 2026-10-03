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
      className="p-4 rounded-[26px] bg-white/95 hover:bg-white border border-black/8 hover:border-black/16 transition-all cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-md apple-pressable"
    >
      <div className="flex items-start gap-3.5">
        {/* Thumbnail Image */}
        <div className="relative w-20 h-24 rounded-2xl overflow-hidden shrink-0 bg-zinc-100 border border-black/6">
          <Image
            src={activity.image}
            alt={activity.title}
            fill
            unoptimized
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span
            className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase backdrop-blur-md"
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
              {activity.category}
            </span>
            {isUserCreated ? (
              <span className="apple-badge bg-orange-500/15 text-orange-700 border-orange-500/25 text-[9px] py-0.5 px-2 font-bold">
                Created by you
              </span>
            ) : (
              <span className="apple-caption text-[10px] text-zinc-500 font-medium">
                {activity.distance}
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-zinc-900 truncate leading-tight tracking-tight group-hover:text-orange-600 transition-colors">
            {activity.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-zinc-600 mt-1">
            <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span className="truncate font-medium">{activity.date}</span>
            <span className="text-zinc-400">·</span>
            <span>{activity.time.split(" - ")[0]}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate">{activity.location.split(",")[0]}</span>
          </div>

          {/* Social status footer */}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/6">
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-600">
              <Users className="w-3 h-3 text-orange-500" />
              <span>{activity.interestedCount} interested</span>
            </div>

            <div className="flex items-center gap-2">
              {onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  className="p-1 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-colors apple-pressable"
                  title="Remove plan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="flex items-center text-xs font-semibold text-orange-600 group-hover:translate-x-0.5 transition-transform">
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
