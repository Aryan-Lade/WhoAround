"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Sparkles } from "lucide-react";
import { Activity, Category } from "@/types";

interface AttendeeModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  userInterests: Category[];
}

export function AttendeeModal({
  activity,
  isOpen,
  onClose,
  userInterests,
}: AttendeeModalProps) {
  if (!isOpen || !activity) return null;

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

        {/* Sheet / Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[480px] apple-sheet rounded-t-[36px] sm:rounded-[36px] p-5 pt-3 shadow-2xl z-10 max-h-[80vh] flex flex-col"
        >
          {/* iOS Grab Handle */}
          <div className="apple-grab-handle" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="apple-heading text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                People Interested ({activity.interestedCount})
              </h3>
              <p className="apple-subheadline text-xs mt-0.5 truncate max-w-[260px]">
                {activity.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full bg-black/5 hover:bg-black/10 apple-pressable transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Attendee list */}
          <div className="overflow-y-auto no-scrollbar py-3 space-y-2.5">
            {activity.attendees.map((att) => {
              const shared = att.interests.filter((i) =>
                userInterests.includes(i)
              );

              return (
                <div
                  key={att.id}
                  className="p-3.5 rounded-2xl bg-black/[0.03] border border-black/8 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-black/10 bg-zinc-200 shrink-0">
                      <Image
                        src={att.avatar}
                        alt={att.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-zinc-900 tracking-tight">
                          {att.name}
                        </span>
                        {att.id === activity.attendees[0]?.id && (
                          <span className="apple-badge bg-orange-500/10 text-orange-600 border-orange-500/20 text-[9px] py-0.2 px-1.5">
                            Host
                          </span>
                        )}
                      </div>
                      <p className="apple-caption text-[11px] text-zinc-500">
                        {att.bio || att.role}
                      </p>
                    </div>
                  </div>

                  {/* Shared interest badge */}
                  <div className="shrink-0 text-right">
                    {shared.length > 0 ? (
                      <span className="apple-badge bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] py-0.5 px-2">
                        <Sparkles className="w-3 h-3" />
                        <span>You both like {shared[0]}</span>
                      </span>
                    ) : (
                      <span className="apple-caption text-[10px] text-zinc-500">
                        {att.interests.slice(0, 2).join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center border-t border-black/8">
            <p className="apple-caption text-[11px]">
              Discover people by the things you want to do together.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
