import { Category } from "@/types";

export interface CategoryInfo {
  id: Category;
  label: string;
  emoji: string;
  accent: string;
  bgLight: string;
  badgeBorder: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "Technology",
    label: "Technology",
    emoji: "💻",
    accent: "#3b82f6", // Blue
    bgLight: "rgba(59, 130, 246, 0.12)",
    badgeBorder: "border-blue-500/30 text-blue-400",
    description: "Hackathons, dev meetups, AI labs, and build stations",
  },
  {
    id: "Sports",
    label: "Sports",
    emoji: "🏸",
    accent: "#10b981", // Emerald
    bgLight: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "border-emerald-500/30 text-emerald-400",
    description: "Badminton, turf football, cricket, pickleball, and tennis",
  },
  {
    id: "Music",
    label: "Music",
    emoji: "🎵",
    accent: "#ec4899", // Pink
    bgLight: "rgba(236, 72, 153, 0.12)",
    badgeBorder: "border-pink-500/30 text-pink-400",
    description: "Concerts, open mics, acoustic sessions, and jam circles",
  },
  {
    id: "Dance",
    label: "Dance",
    emoji: "💃",
    accent: "#f59e0b", // Amber
    bgLight: "rgba(245, 158, 11, 0.12)",
    badgeBorder: "border-amber-500/30 text-amber-400",
    description: "Garba nights, salsa socials, hip-hop jams, and workshops",
  },
  {
    id: "Food",
    label: "Food",
    emoji: "🍜",
    accent: "#f97316", // Orange
    bgLight: "rgba(249, 115, 22, 0.12)",
    badgeBorder: "border-orange-500/30 text-orange-400",
    description: "Street food walks, late-night chai, cafe hopping, and dinners",
  },
  {
    id: "Art",
    label: "Art",
    emoji: "🎨",
    accent: "#8b5cf6", // Purple
    bgLight: "rgba(139, 92, 246, 0.12)",
    badgeBorder: "border-purple-500/30 text-purple-400",
    description: "Sketch walks, pottery workshops, galleries, and exhibitions",
  },
  {
    id: "Gaming",
    label: "Gaming",
    emoji: "🎮",
    accent: "#06b6d4", // Cyan
    bgLight: "rgba(6, 182, 212, 0.12)",
    badgeBorder: "border-cyan-500/30 text-cyan-400",
    description: "Board game cafes, Valorant LANs, FIFA nights, and trivia",
  },
  {
    id: "Fitness",
    label: "Fitness",
    emoji: "🏃",
    accent: "#84cc16", // Lime
    bgLight: "rgba(132, 204, 22, 0.12)",
    badgeBorder: "border-lime-500/30 text-lime-400",
    description: "Sunrise lake runs, calisthenics, gym partners, and yoga",
  },
  {
    id: "Movies",
    label: "Movies",
    emoji: "🍿",
    accent: "#e11d48", // Rose
    bgLight: "rgba(225, 29, 72, 0.12)",
    badgeBorder: "border-rose-500/30 text-rose-400",
    description: "IMAX premieres, film club screenings, anime watches",
  },
  {
    id: "Travel",
    label: "Travel",
    emoji: "🎒",
    accent: "#14b8a6", // Teal
    bgLight: "rgba(20, 184, 166, 0.12)",
    badgeBorder: "border-teal-500/30 text-teal-400",
    description: "Weekend treks, waterfall trips, camping, and highway rides",
  },
  {
    id: "Photography",
    label: "Photography",
    emoji: "📸",
    accent: "#64748b", // Slate
    bgLight: "rgba(100, 116, 139, 0.12)",
    badgeBorder: "border-slate-500/30 text-slate-300",
    description: "Heritage photo walks, golden hour shoots, and street snaps",
  },
  {
    id: "Startups",
    label: "Startups",
    emoji: "🚀",
    accent: "#6366f1", // Indigo
    bgLight: "rgba(99, 102, 241, 0.12)",
    badgeBorder: "border-indigo-500/30 text-indigo-400",
    description: "Founder coffee, co-working sprints, pitch practices, and demo days",
  },
  {
    id: "Books",
    label: "Books",
    emoji: "📚",
    accent: "#d97706", // Warm amber
    bgLight: "rgba(217, 119, 6, 0.12)",
    badgeBorder: "border-amber-600/30 text-amber-300",
    description: "Silent reading clubs, book swaps, and cafe discussions",
  },
  {
    id: "Outdoors",
    label: "Outdoors",
    emoji: "🌲",
    accent: "#059669", // Green
    bgLight: "rgba(5, 150, 105, 0.12)",
    badgeBorder: "border-emerald-600/30 text-emerald-300",
    description: "Lake sunsets, cycling trails, stargazing, and park hangouts",
  },
  {
    id: "Networking",
    label: "Networking",
    emoji: "🤝",
    accent: "#a855f7", // Violet
    bgLight: "rgba(168, 85, 247, 0.12)",
    badgeBorder: "border-violet-500/30 text-violet-400",
    description: "Professional mixers, freelance syncs, and industry roundtables",
  },
];

export function getCategoryInfo(category: Category): CategoryInfo {
  return CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
}
