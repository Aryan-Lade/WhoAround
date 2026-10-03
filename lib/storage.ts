import { OnboardingState, Activity, Plan, City, Category, Vibe } from "@/types";

const STORAGE_KEYS = {
  ONBOARDING: "whoaround_onboarding_v1",
  SWIPED: "whoaround_swiped_activities_v1", // ids array
  INTERESTED: "whoaround_interested_activities_v1", // ids array
  CREATED_ACTIVITIES: "whoaround_created_activities_v1", // Activity[]
  ACTIVE_CITY: "whoaround_active_city_v1",
} as const;

export const DEFAULT_CITY: City = "Nagpur";

export const DEFAULT_ONBOARDING: OnboardingState = {
  city: "Nagpur",
  interests: ["Technology", "Sports", "Music"],
  vibes: ["Meet new people", "Weekend plans"],
  completed: false,
};

function isClient(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export const storage = {
  // Onboarding
  getOnboarding(): OnboardingState {
    if (!isClient()) return DEFAULT_ONBOARDING;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
      if (!data) return DEFAULT_ONBOARDING;
      return JSON.parse(data) as OnboardingState;
    } catch (e) {
      console.error("Failed to read onboarding from localStorage", e);
      return DEFAULT_ONBOARDING;
    }
  },

  setOnboarding(state: OnboardingState): void {
    if (!isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(state));
      // keep active city synced
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CITY, state.city);
    } catch (e) {
      console.error("Failed to save onboarding to localStorage", e);
    }
  },

  // Active City
  getActiveCity(): City {
    if (!isClient()) return DEFAULT_CITY;
    try {
      const city = localStorage.getItem(STORAGE_KEYS.ACTIVE_CITY) as City;
      return city || this.getOnboarding().city || DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  },

  setActiveCity(city: City): void {
    if (!isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CITY, city);
      const current = this.getOnboarding();
      this.setOnboarding({ ...current, city });
    } catch (e) {
      console.error("Failed to set active city", e);
    }
  },

  // Swiped Activity IDs (either skipped or liked)
  getSwipedIds(): string[] {
    if (!isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SWIPED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addSwipedId(id: string): void {
    if (!isClient()) return;
    try {
      const swiped = this.getSwipedIds();
      if (!swiped.includes(id)) {
        swiped.push(id);
        localStorage.setItem(STORAGE_KEYS.SWIPED, JSON.stringify(swiped));
      }
    } catch (e) {
      console.error("Failed to save swiped id", e);
    }
  },

  // Interested Activity IDs
  getInterestedIds(): string[] {
    if (!isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERESTED);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addInterestedId(id: string): void {
    if (!isClient()) return;
    try {
      const interested = this.getInterestedIds();
      if (!interested.includes(id)) {
        interested.push(id);
        localStorage.setItem(STORAGE_KEYS.INTERESTED, JSON.stringify(interested));
      }
      this.addSwipedId(id);
    } catch (e) {
      console.error("Failed to add interested id", e);
    }
  },

  removeInterestedId(id: string): void {
    if (!isClient()) return;
    try {
      const interested = this.getInterestedIds().filter((itemId) => itemId !== id);
      localStorage.setItem(STORAGE_KEYS.INTERESTED, JSON.stringify(interested));
    } catch (e) {
      console.error("Failed to remove interested id", e);
    }
  },

  // User-created activities
  getCreatedActivities(): Activity[] {
    if (!isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CREATED_ACTIVITIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addCreatedActivity(activity: Activity): void {
    if (!isClient()) return;
    try {
      const created = this.getCreatedActivities();
      created.unshift(activity);
      localStorage.setItem(STORAGE_KEYS.CREATED_ACTIVITIES, JSON.stringify(created));
      // Mark as interested automatically since user created it
      this.addInterestedId(activity.id);
    } catch (e) {
      console.error("Failed to add created activity", e);
    }
  },

  // Undo / rewind last swiped
  undoLastSwipe(): string | null {
    if (!isClient()) return null;
    try {
      const swiped = this.getSwipedIds();
      if (swiped.length === 0) return null;
      const lastId = swiped.pop();
      localStorage.setItem(STORAGE_KEYS.SWIPED, JSON.stringify(swiped));
      
      // Also remove from interested if it was interested
      const interested = this.getInterestedIds().filter((id) => id !== lastId);
      localStorage.setItem(STORAGE_KEYS.INTERESTED, JSON.stringify(interested));
      
      return lastId || null;
    } catch {
      return null;
    }
  },

  // Reset Demo (Judge friendly!)
  resetDemo(): void {
    if (!isClient()) return;
    try {
      localStorage.removeItem(STORAGE_KEYS.ONBOARDING);
      localStorage.removeItem(STORAGE_KEYS.SWIPED);
      localStorage.removeItem(STORAGE_KEYS.INTERESTED);
      localStorage.removeItem(STORAGE_KEYS.CREATED_ACTIVITIES);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_CITY);
    } catch (e) {
      console.error("Failed to reset demo", e);
    }
  },
};
