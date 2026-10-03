"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import { Category } from "@/types";
import { CATEGORIES } from "@/data/interests";

interface EditInterestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInterests: Category[];
  onSaveInterests: (interests: Category[]) => void;
}

export function EditInterestsModal({
  isOpen,
  onClose,
  currentInterests,
  onSaveInterests,
}: EditInterestsModalProps) {
  const [selected, setSelected] = useState<Category[]>(currentInterests);

  if (!isOpen) return null;

  const toggle = (cat: Category) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = () => {
    if (selected.length >= 1) {
      onSaveInterests(selected);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-[480px] bg-zinc-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                Edit Interests
              </h3>
              <p className="text-xs text-zinc-400">
                Update what activities you want to see
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto no-scrollbar py-3 grid grid-cols-2 gap-2 max-h-[50vh]">
            {CATEGORIES.map((cat) => {
              const isChecked = selected.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggle(cat.id)}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isChecked
                      ? "bg-zinc-800 border-orange-500 text-white"
                      : "bg-zinc-800/40 border-white/5 text-zinc-400 hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.emoji}</span>
                    <span className="text-xs font-semibold">{cat.label}</span>
                  </div>
                  {isChecked && (
                    <Check className="w-3.5 h-3.5 text-orange-400 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex gap-2">
            <button
              onClick={onClose}
              className="w-1/2 py-3 rounded-xl bg-zinc-800 text-xs font-bold text-zinc-300 hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={selected.length === 0}
              className="w-1/2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white shadow-lg shadow-orange-500/20 disabled:opacity-50"
            >
              Save ({selected.length})
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
