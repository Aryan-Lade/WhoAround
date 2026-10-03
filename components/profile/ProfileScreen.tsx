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
    <div className="flex-1 flex flex-col w-full h-full pb-28 px-4 md:px-8 pt-4 md:pt-6 max-w-6xl mx-auto overflow-y-auto no-scrollbar">
      <div className="w-full lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
        {/* Left Column: Profile Card & MVP Info */}
        <div className="lg:col-span-5 space-y-4 mb-5 lg:mb-0">
          {/* Header Profile Card in Apple continuous depth */}
          <div className="apple-card p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-black/10 bg-zinc-200 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80"
                  alt="Guest Explorer"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div>
                <div className="apple-badge bg-orange-500/10 text-orange-600 border-orange-500/20 text-[10px] py-0.5 px-2 mb-1">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                  <span>Guest Demo Mode</span>
                </div>
                <h2 className="text-xl apple-heading">Guest Explorer</h2>
                <p className="apple-caption text-xs flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-orange-500" />
                  <span>{city}, India</span>
                </p>
              </div>
            </div>

            {/* Stats Row in Apple Grouped Metrics */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-black/6 text-center">
              <div className="p-2.5 rounded-2xl bg-black/[0.03] border border-black/6">
                <p className="text-lg font-black text-zinc-900">{joinedCount}</p>
                <p className="apple-caption text-[10px]">Plans Joined</p>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/[0.03] border border-black/6">
                <p className="text-lg font-black text-zinc-900">{createdCount}</p>
                <p className="apple-caption text-[10px]">Plans Created</p>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/[0.03] border border-black/6">
                <p className="text-lg font-black text-zinc-900">{interests.length}</p>
                <p className="apple-caption text-[10px]">Interests</p>
              </div>
            </div>
          </div>

          {/* Safety & Hackathon Box (Desktop Side Info) */}
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/6 text-center">
            <p className="apple-caption text-[11px] font-bold text-zinc-500">
              WHO AROUND · Hackathon MVP
            </p>
            <p className="apple-caption text-[10px] text-zinc-400 mt-0.5">
              Find your people. Find your plans.
            </p>
          </div>
        </div>

        {/* Right Column: Active Interests & Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Interests Card */}
          <div className="apple-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="apple-caption uppercase font-bold text-zinc-500">
                Your Active Interests
              </h3>
              <button
                onClick={() => setShowEditInterests(true)}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 apple-pressable"
              >
                Edit
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {interests.map((cat) => (
                <span
                  key={cat}
                  className="apple-badge bg-black/[0.04] text-zinc-800 border-black/8"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* App & Demo Settings Actions in Apple Grouped Table Style */}
          <div className="apple-card p-5 space-y-2.5">
            <h3 className="apple-caption uppercase font-bold text-zinc-500 mb-2">
              Demo Settings
            </h3>

            <button
              onClick={() => setShowEditInterests(true)}
              className="w-full p-3.5 rounded-2xl bg-black/[0.02] border border-black/6 hover:border-black/12 text-left flex items-center justify-between text-xs font-semibold text-zinc-800 transition-colors apple-pressable"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Edit Interests & Recommendations</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => setShowCityModal(true)}
              className="w-full p-3.5 rounded-2xl bg-black/[0.02] border border-black/6 hover:border-black/12 text-left flex items-center justify-between text-xs font-semibold text-zinc-800 transition-colors apple-pressable"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Change City (Current: {city})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full p-3.5 rounded-2xl bg-black/[0.02] border border-black/6 hover:border-black/12 text-left flex items-center justify-between text-xs font-semibold text-zinc-800 transition-colors apple-pressable"
            >
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-orange-500" />
                <span>About Who Around</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full p-3.5 rounded-2xl bg-rose-50 border border-rose-200 hover:border-rose-300 hover:bg-rose-100/60 text-left flex items-center justify-between text-xs font-semibold text-rose-600 transition-colors apple-pressable"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>Reset Demo (Judges Friendly)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 font-bold">
                Wipe Storage
              </span>
            </button>
          </div>
        </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/40 backdrop-blur-md">
          <div className="w-full max-w-xs apple-glass-heavy border border-black/10 rounded-3xl p-5 text-center space-y-3 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200">
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
