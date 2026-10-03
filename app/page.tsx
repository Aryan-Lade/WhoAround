"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  ActiveTab,
  Activity,
  Category,
  City,
  OnboardingState,
  Vibe,
} from "@/types";
import { storage, DEFAULT_ONBOARDING } from "@/lib/storage";
import { SAMPLE_ACTIVITIES } from "@/data/activities";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Header } from "@/components/navigation/Header";
import { BottomNav } from "@/components/navigation/BottomNav";
import { ExploreScreen } from "@/components/explore/ExploreScreen";
import { PlansScreen } from "@/components/plans/PlansScreen";
import { CreatePlanScreen } from "@/components/create/CreatePlanScreen";
import { ProfileScreen } from "@/components/profile/ProfileScreen";
import { AboutModal } from "@/components/profile/AboutModal";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [onboarding, setOnboarding] = useState<OnboardingState>(DEFAULT_ONBOARDING);
  const [activeTab, setActiveTab] = useState<ActiveTab>("explore");
  const [swipedIds, setSwipedIds] = useState<string[]>([]);
  const [interestedIds, setInterestedIds] = useState<string[]>([]);
  const [createdActivities, setCreatedActivities] = useState<Activity[]>([]);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Initialize from localStorage safely on client mount
  useEffect(() => {
    const savedOnboarding = storage.getOnboarding();
    const savedSwiped = storage.getSwipedIds();
    const savedInterested = storage.getInterestedIds();
    const savedCreated = storage.getCreatedActivities();

    setOnboarding(savedOnboarding);
    setSwipedIds(savedSwiped);
    setInterestedIds(savedInterested);
    setCreatedActivities(savedCreated);
    setMounted(true);
  }, []);

  // Combined activities pool (User-created activities always prepended)
  const allActivities = useMemo(() => {
    return [...createdActivities, ...SAMPLE_ACTIVITIES];
  }, [createdActivities]);

  // Interested activities objects for Plans screen
  const interestedActivities = useMemo(() => {
    return allActivities.filter((act) => interestedIds.includes(act.id));
  }, [allActivities, interestedIds]);

  // Handlers
  const handleOnboardingComplete = (finalState: OnboardingState) => {
    setOnboarding(finalState);
    setActiveTab("explore");
  };

  const handleCityChange = (newCity: City) => {
    const updated = { ...onboarding, city: newCity };
    setOnboarding(updated);
    storage.setActiveCity(newCity);
  };

  const handleInterestsChange = (newInterests: Category[]) => {
    const updated = { ...onboarding, interests: newInterests };
    setOnboarding(updated);
    storage.setOnboarding(updated);
  };

  const handleSwipeLeft = (activity: Activity) => {
    storage.addSwipedId(activity.id);
    setSwipedIds((prev) => (prev.includes(activity.id) ? prev : [...prev, activity.id]));
  };

  const handleSwipeRight = (activity: Activity) => {
    storage.addInterestedId(activity.id);
    setSwipedIds((prev) => (prev.includes(activity.id) ? prev : [...prev, activity.id]));
    setInterestedIds((prev) =>
      prev.includes(activity.id) ? prev : [...prev, activity.id]
    );
  };

  const handleToggleInterested = (activity: Activity) => {
    if (interestedIds.includes(activity.id)) {
      storage.removeInterestedId(activity.id);
      setInterestedIds((prev) => prev.filter((id) => id !== activity.id));
    } else {
      handleSwipeRight(activity);
    }
  };

  const handleUndoSwipe = () => {
    const undoneId = storage.undoLastSwipe();
    if (undoneId) {
      setSwipedIds((prev) => prev.filter((id) => id !== undoneId));
      setInterestedIds((prev) => prev.filter((id) => id !== undoneId));
    }
  };

  const handleResetSwipes = () => {
    // Reset swiped cards for fresh stack browsing
    localStorage.removeItem("whoaround_swiped_activities_v1");
    setSwipedIds([]);
  };

  const handleCreateActivity = (newActivity: Activity) => {
    storage.addCreatedActivity(newActivity);
    setCreatedActivities((prev) => [newActivity, ...prev]);
    setInterestedIds((prev) => [newActivity.id, ...prev]);
  };

  const handleResetDemo = () => {
    storage.resetDemo();
    setOnboarding({ ...DEFAULT_ONBOARDING, completed: false });
    setSwipedIds([]);
    setInterestedIds([]);
    setCreatedActivities([]);
    setActiveTab("explore");
  };

  // Prevent SSR hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-dvh w-full flex items-center justify-center bg-[#f2f2f7]">
        <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // If user hasn't completed onboarding, render the onboarding experience
  if (!onboarding.completed) {
    return (
      <main className="app-container">
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </main>
    );
  }

  // Main App Shell
  return (
    <main className="app-container relative flex flex-col justify-between">
      {/* Top Header */}
      <Header
        currentCity={onboarding.city}
        onCityChange={handleCityChange}
        onOpenAbout={() => setShowAboutModal(true)}
      />

      {/* Tab Screen Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {activeTab === "explore" && (
          <ExploreScreen
            city={onboarding.city}
            interests={onboarding.interests}
            vibes={onboarding.vibes}
            activities={allActivities}
            swipedIds={swipedIds}
            interestedIds={interestedIds}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onToggleInterested={handleToggleInterested}
            onUndoSwipe={handleUndoSwipe}
            onResetSwipes={handleResetSwipes}
            onCreatePlan={() => setActiveTab("create")}
          />
        )}

        {activeTab === "plans" && (
          <PlansScreen
            interestedActivities={interestedActivities}
            createdActivities={createdActivities}
            onRemoveInterested={(id) => {
              storage.removeInterestedId(id);
              setInterestedIds((prev) => prev.filter((item) => item !== id));
            }}
            onExplore={() => setActiveTab("explore")}
            onCreatePlan={() => setActiveTab("create")}
            userInterests={onboarding.interests}
          />
        )}

        {activeTab === "create" && (
          <CreatePlanScreen
            city={onboarding.city}
            onCreateActivity={handleCreateActivity}
            onPlanCreatedAndNavigate={() => setActiveTab("explore")}
          />
        )}

        {activeTab === "profile" && (
          <ProfileScreen
            city={onboarding.city}
            interests={onboarding.interests}
            vibes={onboarding.vibes}
            joinedCount={interestedActivities.length}
            createdCount={createdActivities.length}
            onCityChange={handleCityChange}
            onInterestsChange={handleInterestsChange}
            onResetDemo={handleResetDemo}
          />
        )}
      </div>

      {/* Floating Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        plansCount={interestedActivities.length}
      />

      {/* About Who Around Modal */}
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </main>
  );
}
