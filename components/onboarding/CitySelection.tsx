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
    <div className="relative min-h-dvh flex flex-col justify-between p-6 bg-zinc-950">
      {/* Top Header / Step indicator */}
      <div>
        <div className="flex items-center justify-between pt-4 pb-6">
          <button
            onClick={onBack}
            className="text-xs text-zinc-400 hover:text-white px-2 py-1 -ml-2 transition-colors"
          >
            ← Back
          </button>
          <span className="text-[11px] font-semibold tracking-wider text-orange-400 uppercase">
            Step 1 of 3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Location Discovery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Where are you around?
          </h2>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Pick your city and we&apos;ll find things happening around you.
          </p>
        </motion.div>
      </div>

      {/* City Options List */}
      <div className="my-auto py-4 space-y-2.5 overflow-y-auto no-scrollbar max-h-[50vh]">
        {CITIES.map((city, idx) => {
          const isSelected = selectedCity === city.id;
          return (
            <motion.button
              key={city.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onSelectCity(city.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                isSelected
                  ? "bg-orange-500/10 border-orange-500/60 shadow-[0_0_20px_-4px_rgba(249,115,22,0.25)]"
                  : "bg-zinc-900/60 border-white/5 hover:border-white/20 hover:bg-zinc-900"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">
                    {city.name}
                  </span>
                  {city.id === "Nagpur" && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      Demo Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{city.tagline}</p>
                <p className="text-[11px] text-zinc-500 mt-1">📍 {city.landmark}</p>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-3 transition-colors ${
                  isSelected
                    ? "bg-orange-500 text-white"
                    : "border border-zinc-700 bg-zinc-800 group-hover:border-zinc-500"
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
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Continue with {selectedCity}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-[11px] text-zinc-500 mt-2.5">
          No precise GPS needed · You can change this anytime
        </p>
      </div>
    </div>
  );
}
