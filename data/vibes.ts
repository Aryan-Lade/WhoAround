import { Vibe } from "@/types";

export interface VibeOption {
  id: Vibe;
  label: string;
  emoji: string;
  tagline: string;
}

export const VIBES: VibeOption[] = [
  {
    id: "Meet new people",
    label: "Meet new people",
    emoji: "👋",
    tagline: "Expand your social circle with friendly humans",
  },
  {
    id: "Try something new",
    label: "Try something new",
    emoji: "✨",
    tagline: "Step out of your routine and explore new hobbies",
  },
  {
    id: "Find activity partners",
    label: "Find activity partners",
    emoji: "⚡",
    tagline: "Players for badminton, tennis, gym, or running",
  },
  {
    id: "Attend events",
    label: "Attend events",
    emoji: "🎟️",
    tagline: "Concerts, hackathons, open mics without going solo",
  },
  {
    id: "Weekend plans",
    label: "Weekend plans",
    emoji: "☀️",
    tagline: "Never spend a boring Saturday or Sunday at home",
  },
  {
    id: "Just see what's happening",
    label: "Just see what's happening",
    emoji: "👀",
    tagline: "Casual browse of spontaneous things around town",
  },
];
