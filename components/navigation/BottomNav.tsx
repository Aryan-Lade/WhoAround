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
    <nav className="fixed bottom-0 left-0 right-0 z-40 w-full max-w-md md:max-w-lg mx-auto pointer-events-none p-3.5 pb-6">
      <div className="pointer-events-auto apple-nav-dock rounded-[28px] px-3.5 md:px-5 py-2 flex items-center justify-around shadow-xl">
        {/* Explore */}
        <button
          onClick={() => onChangeTab("explore")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all relative apple-pressable ${
            activeTab === "explore"
              ? "text-orange-600 font-semibold"
              : "text-zinc-400 hover:text-zinc-700"
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform ${activeTab === "explore" ? "scale-105" : ""}`} />
          <span className="text-[10px] tracking-tight">Explore</span>
          {activeTab === "explore" && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          )}
        </button>

        {/* Plans */}
        <button
          onClick={() => onChangeTab("plans")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all relative apple-pressable ${
            activeTab === "plans"
              ? "text-orange-600 font-semibold"
              : "text-zinc-400 hover:text-zinc-700"
          }`}
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 transition-transform ${activeTab === "plans" ? "scale-105" : ""}`} />
            {plansCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 min-w-4 text-[9px] font-black rounded-full bg-orange-500 text-white text-center shadow-md">
                {plansCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Plans</span>
          {activeTab === "plans" && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          )}
        </button>

        {/* Create (Prominent center button with Apple depth) */}
        <button
          onClick={() => onChangeTab("create")}
          className="flex flex-col items-center group -mt-5 apple-pressable"
          title="Make a plan"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/35 border-2 border-white">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${activeTab === "create" ? "text-orange-600 font-semibold" : "text-zinc-400"}`}>
            Create
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onChangeTab("profile")}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all relative apple-pressable ${
            activeTab === "profile"
              ? "text-orange-600 font-semibold"
              : "text-zinc-400 hover:text-zinc-700"
          }`}
        >
          <User className={`w-5 h-5 transition-transform ${activeTab === "profile" ? "scale-105" : ""}`} />
          <span className="text-[10px] tracking-tight">Profile</span>
          {activeTab === "profile" && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          )}
        </button>
      </div>
    </nav>
  );
}
