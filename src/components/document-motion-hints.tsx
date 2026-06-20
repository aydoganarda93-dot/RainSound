"use client";

import { useEffect } from "react";

import { useMotionPreferences } from "@/hooks/use-motion-preferences";

const setDocumentFlag = (root: HTMLElement, key: string, active: boolean) => {
  if (active) {
    root.dataset[key] = "true";
  } else {
    delete root.dataset[key];
  }
};

/**
 * Mirrors connection and motion preference signals onto <html> so global CSS can
 * degrade decorative motion/media without re-enabling the SiteFx reveal runtime.
 */
export function DocumentMotionHints() {
  const prefs = useMotionPreferences();

  useEffect(() => {
    if (!prefs.isMounted) {
      return;
    }

    const root = document.documentElement;

    setDocumentFlag(root, "reducedMotion", prefs.shouldReduceMotion);
    setDocumentFlag(root, "saveData", prefs.isSaveDataEnabled);
    setDocumentFlag(root, "slowConnection", prefs.isSlowConnection);
    setDocumentFlag(root, "lowPower", prefs.isLowPowerDevice);
    root.dataset.motionMode = prefs.motionMode;
  }, [
    prefs.isLowPowerDevice,
    prefs.isMounted,
    prefs.isSaveDataEnabled,
    prefs.isSlowConnection,
    prefs.motionMode,
    prefs.shouldReduceMotion,
  ]);

  return null;
}
