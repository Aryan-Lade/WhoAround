"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Sparkles,
  RotateCcw,
  Info,
  ChevronRight,
} from "lucide-react";
import { City, Category, Vibe } from "@/types";
import { EditInterestsModal } from "./EditInterestsModal";
import { AboutModal } from "./AboutModal";
import { CitySwitcherModal } from "../navigation/CitySwitcherModal";

interface ProfileScreenProps {
  city: City;
  interests: Category[];
  vibes: Vibe[];
  joinedCount: number;
  createdCount: number;
  onCityChange: (city: City) => void;
  onInterestsChange: (interests: Category[]) => void;
  onResetDemo: () => void;
}

export function ProfileScreen({
  city,
  interests,
  vibes,
  joinedCount,
  createdCount,
  onCityChange,
  onInterestsChange,
  onResetDemo,
}: ProfileScreenProps) {
  const [showEditInterests, setShowEditInterests] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="flex-1 flex flex-col w-full h-full pb-28 px-4 pt-4 overflow-y-auto no-scrollbar">
      {/* Header Profile Card in Apple continuous depth */}
      <div className="apple-card p-5 relative overflow-hidden mb-5">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/15 bg-zinc-800 shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80"
              alt="Guest Explorer"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div>
            <div className="apple-badge bg-orange-500/15 text-orange-300 border-orange-500/30 text-[10px] py-0.5 px-2 mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Guest Demo Mode</span>
            </div>
            <h2 className="text-xl apple-heading">Guest Explorer</h2>
            <p className="apple-caption text-xs flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>{city}, India</span>
            </p>
          </div>
        </div>

        {/* Stats Row in Apple Grouped Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-white/8 text-center">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/8">
            <p className="text-lg font-black text-white">{joinedCount}</p>
            <p className="apple-caption text-[10px]">Plans Joined</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/8">
            <p className="text-lg font-black text-white">{createdCount}</p>
            <p className="apple-caption text-[10px]">Plans Created</p>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/8">
            <p className="text-lg font-black text-white">{interests.length}</p>
            <p className="apple-caption text-[10px]">Interests</p>
          </div>
        </div>
      </div>

      {/* Active Interests Chips */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="apple-caption uppercase">
            Your Active Interests
          </h3>
          <button
            onClick={() => setShowEditInterests(true)}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 apple-pressable"
          >
            Edit
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {interests.map((cat) => (
            <span
              key={cat}
              className="apple-badge bg-white/6 text-zinc-200 border-white/10"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* App & Demo Settings Actions in Apple Grouped Table Style */}
      <div className="space-y-2 mb-6">
        <h3 className="apple-caption uppercase mb-2">
          Demo Settings
        </h3>

        <button
          onClick={() => setShowEditInterests(true)}
          className="w-full p-3.5 rounded-2xl bg-white/6 border border-white/8 hover:border-white/15 text-left flex items-center justify-between text-xs font-semibold text-zinc-200 transition-colors apple-pressable"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Edit Interests & Recommendations</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        <button
          onClick={() => setShowCityModal(true)}
          className="w-full p-3.5 rounded-2xl bg-white/6 border border-white/8 hover:border-white/15 text-left flex items-center justify-between text-xs font-semibold text-zinc-200 transition-colors apple-pressable"
        >
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Change City (Current: {city})</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        <button
          onClick={() => setShowAboutModal(true)}
          className="w-full p-3.5 rounded-2xl bg-white/6 border border-white/8 hover:border-white/15 text-left flex items-center justify-between text-xs font-semibold text-zinc-200 transition-colors apple-pressable"
        >
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-orange-400" />
            <span>About Who Around</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={() => setShowResetConfirm(true)}
          className="w-full p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 hover:border-rose-500/50 hover:bg-rose-500/15 text-left flex items-center justify-between text-xs font-semibold text-rose-400 transition-colors apple-pressable"
        >
          <div className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Reset Demo (Judges Friendly)</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
            Wipe Storage
          </span>
        </button>
      </div>

      {/* Safety & Hackathon Footer */}
      <div className="mt-auto p-4 rounded-2xl bg-white/4 border border-white/6 text-center">
        <p className="apple-caption text-[11px] font-bold text-zinc-400">
          WHO AROUND · Hackathon MVP
        </p>
        <p className="apple-caption text-[10px] text-zinc-500 mt-0.5">
          Find your people. Find your plans.
        </p>
      </div>

      {/* Modals */}
      <EditInterestsModal
        isOpen={showEditInterests}
        onClose={() => setShowEditInterests(false)}
        currentInterests={interests}
        onSaveInterests={onInterestsChange}
      />

      <CitySwitcherModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
        currentCity={city}
        onSelectCity={onCityChange}
      />

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />

      {/* Reset Confirmation Dialog with Apple Sheet styling */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xs apple-glass-heavy border border-white/15 rounded-3xl p-5 text-center space-y-3 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="apple-heading text-base">Reset Demo?</h4>
            <p className="apple-subheadline text-xs leading-relaxed">
              This will clear your swiped cards, created plans, and preferences, returning to the onboarding experience.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="apple-btn-secondary w-1/2 py-2.5 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  onResetDemo();
                }}
                className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white shadow-lg shadow-rose-500/30 apple-pressable"
              >
                Reset Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
