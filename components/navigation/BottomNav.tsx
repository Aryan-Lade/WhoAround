"use client";

import React from "react";
import { Compass, Calendar, Plus, User } from "lucide-react";
import { ActiveTab } from "@/types";

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  plansCount?: number;
}

export function BottomNav({ activeTab, onChangeTab, plansCount = 0 }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-[480px] mx-auto pointer-events-none p-3 pb-5">
      <div className="pointer-events-auto glass-nav rounded-2xl border border-white/10 px-4 py-2 flex items-center justify-around shadow-2xl backdrop-blur-xl bg-zinc-950/85">
        {/* Explore */}
        <button
          onClick={() => onChangeTab("explore")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
            activeTab === "explore"
              ? "text-orange-400 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform ${activeTab === "explore" ? "scale-110" : ""}`} />
          <span className="text-[10px] tracking-wide">Explore</span>
          {activeTab === "explore" && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
          )}
        </button>

        {/* Plans */}
        <button
          onClick={() => onChangeTab("plans")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
            activeTab === "plans"
              ? "text-orange-400 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 transition-transform ${activeTab === "plans" ? "scale-110" : ""}`} />
            {plansCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 min-w-4 text-[9px] font-bold rounded-full bg-orange-500 text-white text-center shadow-sm">
                {plansCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wide">Plans</span>
          {activeTab === "plans" && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
          )}
        </button>

        {/* Create (Prominent center button) */}
        <button
          onClick={() => onChangeTab("create")}
          className="flex flex-col items-center group -mt-4"
          title="Make a plan"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 group-active:scale-95 transition-transform border-2 border-zinc-950">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className={`text-[10px] mt-1 tracking-wide ${activeTab === "create" ? "text-orange-400 font-semibold" : "text-zinc-400"}`}>
            Create
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onChangeTab("profile")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
            activeTab === "profile"
              ? "text-orange-400 font-semibold"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <User className={`w-5 h-5 transition-transform ${activeTab === "profile" ? "scale-110" : ""}`} />
          <span className="text-[10px] tracking-wide">Profile</span>
          {activeTab === "profile" && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
          )}
        </button>
      </div>
    </nav>
  );
}
