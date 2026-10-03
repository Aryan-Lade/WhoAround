import { Activity, Category, City, Vibe } from "@/types";

interface RecommendationParams {
  activities: Activity[];
  city: City;
  interests: Category[];
  vibes: Vibe[];
  selectedCategory?: Category | "All" | "For You";
  excludeIds?: string[];
}

export interface ScoredActivity {
  activity: Activity;
  score: number;
  matchReasons: string[];
}

export function scoreAndFilterActivities({
  activities,
  city,
  interests,
  vibes,
  selectedCategory = "For You",
  excludeIds = [],
}: RecommendationParams): ScoredActivity[] {
  // First, filter by city (fallback to all if few)
  let pool = activities.filter((act) => act.city === city);
  if (pool.length === 0) {
    pool = activities; // fallback
  }

  // Filter out swiped or excluded IDs
  if (excludeIds.length > 0) {
    const excludeSet = new Set(excludeIds);
    pool = pool.filter((act) => !excludeSet.has(act.id));
  }

  // If a specific category is chosen (other than 'All' or 'For You'), filter by that category
  if (selectedCategory !== "All" && selectedCategory !== "For You") {
    pool = pool.filter((act) => act.category === selectedCategory);
  }

  const scored: ScoredActivity[] = pool.map((act) => {
    let score = 0;
    const matchReasons: string[] = [];

    // User created gets top priority
    if (act.isUserCreated) {
      score += 100;
      matchReasons.push("Created by you");
    }

    // +10 if category matches selected interest
    if (interests.includes(act.category)) {
      score += 10;
      matchReasons.push(`Matches your interest in ${act.category}`);
    }

    // +5 for each matching vibe
    let vibeMatches = 0;
    if (act.vibes && vibes) {
      act.vibes.forEach((vibe) => {
        if (vibes.includes(vibe)) {
          vibeMatches++;
        }
      });
    }
    if (vibeMatches > 0) {
      score += vibeMatches * 5;
      matchReasons.push("Matches your vibe");
    }

    // +3 if happening this weekend
    if (act.isWeekend) {
      score += 3;
      matchReasons.push("This weekend");
    }

    // +2 if nearby (< 3.0 km)
    const distNum = parseFloat(act.distance);
    if (!isNaN(distNum) && distNum <= 3.0) {
      score += 2;
      matchReasons.push("Near you");
    }

    // Social momentum score: slight bump for activities with more people interested
    score += Math.min(act.interestedCount, 10);

    return {
      activity: act,
      score,
      matchReasons,
    };
  });

  // Sort descending by score. If equal score, sort by created date or interestedCount
  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return (b.activity.interestedCount || 0) - (a.activity.interestedCount || 0);
  });

  return scored;
}
