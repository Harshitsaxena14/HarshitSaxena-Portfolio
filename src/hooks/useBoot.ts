"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "harshitos_boot_complete_v2";

export function useBoot() {
  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [hasBooted, setHasBooted] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setIsBooting(false);
      setShowIntro(false);
      setHasBooted(true);
    }
  }, []);

  // Called when Phase 1 (Terminal Boot) completes
  const completeTerminalBoot = useCallback(() => {
    setIsBooting(false);
    setShowIntro(true);
  }, []);

  // Called when Phase 2 & 3 (Cinematic Intro & Transition) complete
  const completeCinematicIntro = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
    setShowIntro(false);
    setHasBooted(true);
  }, []);

  return {
    isBooting,
    showIntro,
    hasBooted,
    completeTerminalBoot,
    completeCinematicIntro,
  };
}

export default useBoot;

