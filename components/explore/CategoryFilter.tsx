"use client";

import React from "react";
import { Category } from "@/types";
import { CATEGORIES } from "@/data/interests";

interface CategoryFilterProps {
  selectedCategory: Category | "All" | "For You";
  onSelectCategory: (category: Category | "All" | "For You") => void;
}

export function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const filterOptions: Array<{ id: Category | "All" | "For You"; label: string; emoji?: string }> = [
    { id: "For You", label: "For You", emoji: "✨" },
    { id: "All", label: "All Plans", emoji: "🔥" },
    ...CATEGORIES.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji })),
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2.5 px-4 flex items-center gap-2">
      {filterOptions.map((item) => {
        const isSelected = selectedCategory === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              isSelected
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]"
                : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/5"
            }`}
          >
            {item.emoji && <span className="text-xs">{item.emoji}</span>}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
