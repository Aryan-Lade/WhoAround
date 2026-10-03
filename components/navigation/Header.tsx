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
      <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse glow-accent" />
          <span className="font-extrabold text-base tracking-tight text-white uppercase flex items-center">
            WHO AROUND
          </span>
        </div>

        {/* City Selector Pill */}
        <button
          onClick={() => setIsCityModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/90 border border-white/10 hover:border-orange-500/40 hover:bg-zinc-800 transition-all text-xs font-semibold text-zinc-200 shadow-sm group"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-500 group-hover:scale-110 transition-transform" />
          <span className="tracking-wide uppercase">{currentCity}</span>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
        </button>

        {/* How it works / quick hint */}
        {onOpenAbout && (
          <button
            onClick={onOpenAbout}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800/80 transition-colors"
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
