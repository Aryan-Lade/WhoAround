"use client";

import React, { useState } from "react";
import { MapPin, ChevronDown, Sparkles } from "lucide-react";
import { City } from "@/types";
import { CitySwitcherModal } from "./CitySwitcherModal";

interface HeaderProps {
  currentCity: City;
  onCityChange: (city: City) => void;
  onOpenAbout?: () => void;
}

export function Header({ currentCity, onCityChange, onOpenAbout }: HeaderProps) {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full apple-glass px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Brand with Apple Optical Tracking */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse glow-accent" />
            <span className="font-black text-sm tracking-[-0.03em] text-zinc-900 uppercase flex items-center">
              WHO AROUND
            </span>
          </div>
          <span className="hidden md:inline-block text-xs text-zinc-400 font-medium pl-3 border-l border-black/10">
            Find your people. Find your plans.
          </span>
        </div>

        {/* City Selector Pill with Instant Pointer-Down Feedback */}
        <button
          onClick={() => setIsCityModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/8 border border-black/8 text-xs font-semibold text-zinc-800 shadow-sm transition-all apple-pressable group"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
          <span className="tracking-tight uppercase">{currentCity}</span>
          <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-zinc-900 transition-colors" />
        </button>

        {/* Info button */}
        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-black/5 transition-colors apple-pressable"
            title="About Who Around"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
          </button>
        )}
      </header>

      <CitySwitcherModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        currentCity={currentCity}
        onSelectCity={onCityChange}
      />
    </>
  );
}
