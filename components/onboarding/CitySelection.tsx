"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { CITIES } from "@/data/cities";
import { City } from "@/types";

interface CitySelectionProps {
  selectedCity: City;
  onSelectCity: (city: City) => void;
  onNext: () => void;
  onBack: () => void;
}

export function CitySelection({
  selectedCity,
  onSelectCity,
  onNext,
  onBack,
}: CitySelectionProps) {
  return (
    <div className="relative min-h-dvh flex flex-col justify-between p-6 bg-gradient-to-b from-[#0e0e13] via-[#070709] to-[#020204]">
      {/* Top Header / Step indicator */}
      <div>
        <div className="flex items-center justify-between pt-4 pb-6">
          <button
            onClick={onBack}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 -ml-2 transition-colors apple-pressable"
          >
            ← Back
          </button>
          <span className="text-[11px] font-bold tracking-wider text-orange-400 uppercase">
            Step 1 of 3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
        >
          <div className="apple-badge bg-orange-500/15 text-orange-300 border-orange-500/30 mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>Location Discovery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl apple-heading">
            Where are you around?
          </h2>
          <p className="apple-subheadline text-xs sm:text-sm mt-1.5 leading-relaxed">
            Pick your city and we&apos;ll find things happening around you.
          </p>
        </motion.div>
      </div>

      {/* City Options List with Apple continuous rounded cards */}
      <div className="my-auto py-4 space-y-2.5 overflow-y-auto no-scrollbar max-h-[50vh]">
        {CITIES.map((city, idx) => {
          const isSelected = selectedCity === city.id;
          return (
            <motion.button
              key={city.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: idx * 0.04 }}
              onClick={() => onSelectCity(city.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between apple-pressable group ${
                isSelected
                  ? "bg-orange-500/12 border-orange-500/60 shadow-[0_0_24px_-4px_rgba(249,115,22,0.25)]"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base tracking-tight">
                    {city.name}
                  </span>
                  {city.id === "Nagpur" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/35">
                      Demo Default
                    </span>
                  )}
                </div>
                <p className="apple-subheadline text-xs mt-0.5">{city.tagline}</p>
                <p className="apple-caption text-[11px] mt-1">📍 {city.landmark}</p>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-3 transition-colors ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                    : "border border-white/20 bg-white/5"
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="pb-6 pt-2">
        <button
          onClick={onNext}
          className="apple-btn-primary w-full py-4 text-base shadow-xl flex items-center justify-center gap-2"
        >
          <span>Continue with {selectedCity}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center apple-caption text-[11px] mt-2.5">
          No precise GPS needed · You can change this anytime
        </p>
      </div>
    </div>
  );
}
