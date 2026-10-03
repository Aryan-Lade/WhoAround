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
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Sheet / Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-[480px] bg-zinc-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Change City
              </h3>
              <p className="text-xs text-zinc-400">
                Pick your city to discover local activities
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-800/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* City list */}
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
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_-3px_rgba(249,115,22,0.2)]"
                      : "bg-zinc-800/50 border-white/5 hover:border-white/20 hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-base">
                        {city.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-700/60 text-zinc-300">
                        {city.state}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">{city.tagline}</p>
                    <div className="flex gap-1.5 mt-2">
                      {city.popularCategories.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900/60 border border-white/5"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 ml-3">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-zinc-500">
              Demo preference · No browser geolocation required
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
