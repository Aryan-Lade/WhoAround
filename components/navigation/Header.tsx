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
      <header className="sticky top-0 z-30 w-full apple-glass px-4 py-3 flex items-center justify-between border-b border-white/10">
        {/* Brand with Apple Optical Tracking */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse glow-accent" />
          <span className="font-black text-sm tracking-[-0.03em] text-white uppercase flex items-center">
            WHO AROUND
          </span>
        </div>

        {/* City Selector Pill with Instant Pointer-Down Feedback */}
        <button
          onClick={() => setIsCityModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/12 text-xs font-semibold text-zinc-100 shadow-sm transition-all apple-pressable group"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="tracking-tight uppercase">{currentCity}</span>
          <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-white transition-colors" />
        </button>

        {/* Info button */}
        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors apple-pressable"
            title="About Who Around"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
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
