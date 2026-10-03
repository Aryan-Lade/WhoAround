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
          className="fixed inset-0 bg-black/40 backdrop-blur-md"
        />

        <motion.div
          initial={{ y: "100%", opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative w-full max-w-[480px] apple-sheet rounded-t-[36px] sm:rounded-[36px] p-5 pt-3 shadow-2xl z-10 max-h-[85vh] flex flex-col"
        >
          {/* iOS Grab Handle */}
          <div className="apple-grab-handle" />

          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="apple-heading text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                Edit Interests
              </h3>
              <p className="apple-subheadline text-xs mt-0.5">
                Update what activities you want to see
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full bg-black/5 hover:bg-black/10 apple-pressable transition-colors"
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
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all apple-pressable ${
                    isChecked
                      ? "bg-orange-50 border-orange-500 text-orange-950 shadow-xs ring-1 ring-orange-500/30"
                      : "bg-black/[0.03] border-black/8 text-zinc-700 hover:bg-black/[0.06]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.emoji}</span>
                    <span className="text-xs font-semibold">{cat.label}</span>
                  </div>
                  {isChecked && (
                    <Check className="w-3.5 h-3.5 text-orange-500 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-black/8 flex gap-2">
            <button
              onClick={onClose}
              className="apple-btn-secondary w-1/2 text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={selected.length === 0}
              className="apple-btn-primary w-1/2 text-xs disabled:opacity-50"
            >
              Save ({selected.length})
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
