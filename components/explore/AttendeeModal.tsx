"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Sparkles, Heart } from "lucide-react";
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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Sheet / Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-[480px] bg-zinc-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl z-10 max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-400" />
                People Interested ({activity.interestedCount})
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 truncate max-w-[260px]">
                {activity.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-800 transition-colors"
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
                  className="p-3 rounded-xl bg-zinc-800/60 border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-zinc-700 bg-zinc-900 shrink-0">
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
                        <span className="font-bold text-sm text-white">
                          {att.name}
                        </span>
                        {att.id === activity.attendees[0]?.id && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                            Host
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {att.bio || att.role}
                      </p>
                    </div>
                  </div>

                  {/* Shared interest badge */}
                  <div className="shrink-0 text-right">
                    {shared.length > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <Sparkles className="w-3 h-3" />
                        <span>You both like {shared[0]}</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-zinc-400">
                        {att.interests.slice(0, 2).join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 text-center border-t border-white/5">
            <p className="text-[11px] text-zinc-500">
              Discover people by the things you want to do together.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
