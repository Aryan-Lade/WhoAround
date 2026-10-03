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
    <div className="w-full overflow-x-auto no-scrollbar py-2.5 px-4 md:px-8 flex items-center gap-2 md:justify-center">
      {filterOptions.map((item) => {
        const isSelected = selectedCategory === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 apple-pressable ${
              isSelected
                ? "bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                : "bg-black/5 hover:bg-black/8 text-zinc-700 hover:text-zinc-950 border border-black/6"
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
