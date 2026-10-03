"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Check } from "lucide-react";
import { CITIES } from "@/data/cities";
import { City } from "@/types";

interface CitySwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: City;
  onSelectCity: (city: City) => void;
}

export function CitySwitcherModal({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
}: CitySwitcherModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Apple Dimming Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Sheet / Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[480px] apple-sheet rounded-t-[36px] sm:rounded-[36px] p-5 pt-3 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* iOS Grab Handle */}
          <div className="apple-grab-handle" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="apple-heading text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-400" />
                Change City
              </h3>
              <p className="apple-subheadline text-xs mt-0.5">
                Pick your city to discover local activities
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-white/10 apple-pressable transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* City list with Apple continuous rounded cards */}
          <div className="overflow-y-auto no-scrollbar py-3 space-y-2.5">
            {CITIES.map((city) => {
              const isSelected = city.id === currentCity;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between apple-pressable group ${
                    isSelected
                      ? "bg-orange-500/15 border-orange-500/60 shadow-[0_0_20px_-4px_rgba(249,115,22,0.25)]"
                      : "bg-white/5 border-white/8 hover:border-white/18 hover:bg-white/8"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base tracking-tight">
                        {city.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-medium">
                        {city.state}
                      </span>
                    </div>
                    <p className="apple-subheadline text-xs mt-0.5">{city.tagline}</p>
                    <div className="flex gap-1.5 mt-2">
                      {city.popularCategories.map((cat) => (
                        <span
                          key={cat}
                          className="apple-caption text-[10px] px-2 py-0.5 rounded-md bg-white/6 border border-white/8 text-zinc-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 ml-3 shadow-md shadow-orange-500/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <p className="apple-caption text-[11px]">
              Demo preference · No browser geolocation required
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
