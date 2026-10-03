"use client";

import React, { useState } from "react";
import { Plus, Users, Calendar, MapPin, Sparkles, Minus } from "lucide-react";
import confetti from "canvas-confetti";
import { Activity, Category, City, Vibe } from "@/types";
import { CATEGORIES } from "@/data/interests";
import { SAMPLE_USERS } from "@/data/users";
import { CreateSuccessModal } from "./CreateSuccessModal";

interface CreatePlanScreenProps {
  city: City;
  onCreateActivity: (activity: Activity) => void;
  onPlanCreatedAndNavigate: () => void;
}

export function CreatePlanScreen({
  city,
  onCreateActivity,
  onPlanCreatedAndNavigate,
}: CreatePlanScreenProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Sports");
  const [date, setDate] = useState("Saturday, Oct 11");
  const [time, setTime] = useState("6:00 PM - 8:00 PM");
  const [location, setLocation] = useState("Nagpur Sports Club");
  const [capacity, setCapacity] = useState(4);
  const [description, setDescription] = useState(
    "Need 2 more people for a casual game. Beginner or intermediate players welcome!"
  );
  const [cost, setCost] = useState("Split court fee");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdActivity, setCreatedActivity] = useState<Activity | null>(null);

  // Quick preset suggestions
  const presets = [
    { title: "Badminton doubles game", cat: "Sports" as Category, loc: "Nagpur Sports Club" },
    { title: "Weekend AI side-project sprint", cat: "Technology" as Category, loc: "Loft Coworking" },
    { title: "Sitabuldi street food hop", cat: "Food" as Category, loc: "Sitabuldi Market" },
    { title: "Morning run around Futala lake", cat: "Fitness" as Category, loc: "Futala Lake" },
  ];

  const applyPreset = (p: typeof presets[0]) => {
    setTitle(p.title);
    setCategory(p.cat);
    setLocation(p.loc);
  };

  const getCategoryImage = (cat: Category): string => {
    switch (cat) {
      case "Sports":
        return "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80";
      case "Technology":
        return "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80";
      case "Food":
        return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80";
      case "Music":
        return "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80";
      case "Dance":
        return "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80";
      case "Fitness":
        return "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80";
      case "Art":
        return "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80";
      case "Startups":
        return "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80";
      case "Gaming":
        return "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=1200&q=80";
      default:
        return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    const newActivity: Activity = {
      id: `act-user-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim() || `Looking for people to join for ${title.trim()}!`,
      date,
      time,
      location: location.trim() || "Local Public Venue",
      city,
      distance: "0.8 km",
      host: "You (Guest Explorer)",
      hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80",
      attendees: [
        {
          id: "guest-user",
          name: "You (Host)",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80",
          interests: [category],
          city,
        },
        SAMPLE_USERS[0], // Realistic interested peer
      ],
      interestedCount: 2,
      capacity,
      image: getCategoryImage(category),
      tags: [category, "Guest Plan", "Open to join"],
      vibes: ["Meet new people", "Find activity partners"] as Vibe[],
      isWeekend: true,
      isUserCreated: true,
      createdAt: Date.now(),
      cost: cost.trim() || "Free",
    };

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {}

    onCreateActivity(newActivity);
    setCreatedActivity(newActivity);
    setIsSubmitting(false);
  };

  return (
    <div className="flex-1 flex flex-col w-full h-full pb-28 px-4 pt-4 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Host a casual plan</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Make a plan.
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Don&apos;t wait for someone else to make one.
        </p>
      </div>

      {/* Quick inspiration presets */}
      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
          Quick Inspiration
        </p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {presets.map((preset) => (
            <button
              key={preset.title}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs text-left px-3 py-2 rounded-xl bg-zinc-900 border border-white/5 hover:border-orange-500/40 text-zinc-300 hover:text-white shrink-0 whitespace-nowrap transition-colors"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            What are you doing? *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Badminton this Saturday"
            className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Category Pill Selection */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            Category *
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.slice(0, 9).map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all truncate ${
                    isSelected
                      ? "bg-orange-500/20 border-orange-500 text-orange-300 shadow-sm"
                      : "bg-zinc-900 border-white/5 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Saturday, Oct 11"
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
              />
              <Calendar className="w-4 h-4 text-orange-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="6:00 PM"
              className="w-full px-3 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Public Venue Location */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            Public Venue & City *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nagpur Sports Club / Loft Coworking"
              className="w-full pl-9 pr-3 py-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
            <MapPin className="w-4 h-4 text-orange-400 absolute left-3 top-4" />
          </div>
          <p className="text-[11px] text-zinc-500 mt-1">
            City: {city} · Public meeting locations only
          </p>
        </div>

        {/* Capacity Stepper */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            How many people? (1–10)
          </label>
          <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-white/10">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <Users className="w-4 h-4 text-orange-400" />
              <span>Looking for group of:</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCapacity(Math.max(1, capacity - 1))}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-bold text-white w-6 text-center">
                {capacity}
              </span>
              <button
                type="button"
                onClick={() => setCapacity(Math.min(10, capacity + 1))}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Need 2 more people for a casual game."
            className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500 resize-none"
          />
        </div>

        {/* Cost estimate */}
        <div>
          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
            Estimated Cost / Split
          </label>
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="e.g. Free, Split court fee, Buy own beverage"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Post this plan</span>
          </button>
        </div>
      </form>

      {/* Success Modal */}
      <CreateSuccessModal
        isOpen={createdActivity !== null}
        activity={createdActivity}
        onSeeFeed={() => {
          setCreatedActivity(null);
          onPlanCreatedAndNavigate();
        }}
      />
    </div>
  );
}
