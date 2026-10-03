"use client";

import React, { useState } from "react";
import { City, Category, Vibe, OnboardingState } from "@/types";
import { storage, DEFAULT_ONBOARDING } from "@/lib/storage";
import { WelcomeScreen } from "./WelcomeScreen";
import { CitySelection } from "./CitySelection";
import { InterestSelection } from "./InterestSelection";
import { VibeSelection } from "./VibeSelection";
import { TransitionScreen } from "./TransitionScreen";

type OnboardingStep = "welcome" | "city" | "interests" | "vibes" | "transition";

interface OnboardingFlowProps {
  onComplete: (state: OnboardingState) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [selectedCity, setSelectedCity] = useState<City>("Nagpur");
  const [selectedInterests, setSelectedInterests] = useState<Category[]>([
    "Technology",
    "Sports",
    "Music",
  ]);
  const [selectedVibes, setSelectedVibes] = useState<Vibe[]>([
    "Meet new people",
    "Weekend plans",
  ]);

  const handleToggleInterest = (category: Category) => {
    setSelectedInterests((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleToggleVibe = (vibe: Vibe) => {
    setSelectedVibes((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  const handleFinish = () => {
    const finalState: OnboardingState = {
      city: selectedCity,
      interests: selectedInterests.length > 0 ? selectedInterests : ["Technology", "Sports"],
      vibes: selectedVibes.length > 0 ? selectedVibes : ["Meet new people"],
      completed: true,
    };
    storage.setOnboarding(finalState);
    onComplete(finalState);
  };

  const handleQuickGuest = () => {
    const guestState: OnboardingState = {
      ...DEFAULT_ONBOARDING,
      completed: true,
    };
    storage.setOnboarding(guestState);
    onComplete(guestState);
  };

  if (step === "welcome") {
    return (
      <WelcomeScreen
        onStart={() => setStep("city")}
        onQuickGuest={handleQuickGuest}
      />
    );
  }

  if (step === "city") {
    return (
      <CitySelection
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        onNext={() => setStep("interests")}
        onBack={() => setStep("welcome")}
      />
    );
  }

  if (step === "interests") {
    return (
      <InterestSelection
        selectedInterests={selectedInterests}
        onToggleInterest={handleToggleInterest}
        onNext={() => setStep("vibes")}
        onBack={() => setStep("city")}
      />
    );
  }

  if (step === "vibes") {
    return (
      <VibeSelection
        selectedVibes={selectedVibes}
        onToggleVibe={handleToggleVibe}
        onNext={() => setStep("transition")}
        onBack={() => setStep("interests")}
      />
    );
  }

  if (step === "transition") {
    return (
      <TransitionScreen
        city={selectedCity}
        interests={selectedInterests}
        onComplete={handleFinish}
      />
    );
  }

  return null;
}
