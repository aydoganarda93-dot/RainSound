"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  isSlowConnectionType,
  prefersReducedMotionQuery,
  shouldUseReducedMotion,
} from "@/lib/motion";

type NavigatorConnection = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type MotionPreferenceSnapshot = {
  effectiveConnectionType?: string;
  isCoarsePointer: boolean;
  isLowMemoryDevice: boolean;
  isLowPowerDevice: boolean;
  isMounted: boolean;
  isSaveDataEnabled: boolean;
  isSmallViewport: boolean;
  prefersReducedMotion: boolean;
};

export type MotionMode =
  | "rich-motion"
  | "not-mounted"
  | "reduced-motion"
  | "save-data"
  | "slow-connection"
  | "low-power";

export type MotionPreferences = MotionPreferenceSnapshot & {
  canUseLowCostMotion: boolean;
  canUseRichMotion: boolean;
  isSlowConnection: boolean;
  motionMode: MotionMode;
  motionModeLabel: string;
  shouldReduceMotion: boolean;
};

const defaultSnapshotKey = "1|0||0";

const getNavigatorConnection = () => {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return null;
  }

  return (
    (navigator as Navigator & { connection?: NavigatorConnection })
      .connection ?? null
  );
};

const getMotionPreferenceSnapshotKey = () => {
  if (typeof window === "undefined") {
    return defaultSnapshotKey;
  }

  const reducedMotionQueryList = window.matchMedia(prefersReducedMotionQuery);
  const smallViewportQueryList = window.matchMedia("(max-width: 767px)");
  const coarsePointerQueryList = window.matchMedia("(pointer: coarse)");
  const connection = getNavigatorConnection();
  const navigatorHints = navigator as Navigator & { deviceMemory?: number };
  const prefersReducedMotion = reducedMotionQueryList.matches ? "1" : "0";
  const isSaveDataEnabled = connection?.saveData ? "1" : "0";
  const effectiveConnectionType = connection?.effectiveType ?? "";
  const isSmallViewport = smallViewportQueryList.matches ? "1" : "0";
  const isCoarsePointer = coarsePointerQueryList.matches ? "1" : "0";
  const isLowMemoryDevice =
    typeof navigatorHints.deviceMemory === "number" &&
    navigatorHints.deviceMemory <= 4
      ? "1"
      : "0";
  const isLowCpuDevice =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4
      ? "1"
      : "0";
  const isLowPowerDevice =
    isSmallViewport === "1" ||
    isCoarsePointer === "1" ||
    isLowMemoryDevice === "1" ||
    isLowCpuDevice === "1"
      ? "1"
      : "0";

  return `${prefersReducedMotion}|${isSaveDataEnabled}|${effectiveConnectionType}|1|${isSmallViewport}|${isCoarsePointer}|${isLowMemoryDevice}|${isLowPowerDevice}`;
};

const parseMotionPreferenceSnapshotKey = (
  snapshotKey: string,
): MotionPreferenceSnapshot => {
  const [
    prefersReducedMotion = "1",
    isSaveDataEnabled = "0",
    effectiveConnectionType = "",
    isMounted = "0",
    isSmallViewport = "0",
    isCoarsePointer = "0",
    isLowMemoryDevice = "0",
    isLowPowerDevice = "0",
  ] = snapshotKey.split("|");

  return {
    effectiveConnectionType: effectiveConnectionType || undefined,
    isCoarsePointer: isCoarsePointer === "1",
    isLowMemoryDevice: isLowMemoryDevice === "1",
    isLowPowerDevice: isLowPowerDevice === "1",
    isMounted: isMounted === "1",
    isSaveDataEnabled: isSaveDataEnabled === "1",
    isSmallViewport: isSmallViewport === "1",
    prefersReducedMotion: prefersReducedMotion === "1",
  };
};

const subscribeToMotionPreferences = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  const reducedMotionQueryList = window.matchMedia(prefersReducedMotionQuery);
  const smallViewportQueryList = window.matchMedia("(max-width: 767px)");
  const coarsePointerQueryList = window.matchMedia("(pointer: coarse)");
  const connection = getNavigatorConnection();

  reducedMotionQueryList.addEventListener("change", onStoreChange);
  smallViewportQueryList.addEventListener("change", onStoreChange);
  coarsePointerQueryList.addEventListener("change", onStoreChange);
  connection?.addEventListener("change", onStoreChange);

  return () => {
    reducedMotionQueryList.removeEventListener("change", onStoreChange);
    smallViewportQueryList.removeEventListener("change", onStoreChange);
    coarsePointerQueryList.removeEventListener("change", onStoreChange);
    connection?.removeEventListener("change", onStoreChange);
  };
};

export function useMotionPreferences(): MotionPreferences {
  const snapshotKey = useSyncExternalStore(
    subscribeToMotionPreferences,
    getMotionPreferenceSnapshotKey,
    () => defaultSnapshotKey,
  );

  return useMemo(() => {
    const snapshot = parseMotionPreferenceSnapshotKey(snapshotKey);
    const isSlowConnection = isSlowConnectionType(
      snapshot.effectiveConnectionType,
    );
    const shouldReduce = shouldUseReducedMotion(snapshot);
    const motionMode: MotionMode = !snapshot.isMounted
      ? "not-mounted"
      : snapshot.prefersReducedMotion
        ? "reduced-motion"
        : snapshot.isSaveDataEnabled
          ? "save-data"
          : isSlowConnection
            ? "slow-connection"
            : snapshot.isLowPowerDevice
              ? "low-power"
              : "rich-motion";
    const motionModeLabel: Record<MotionMode, string> = {
      "low-power": "Düşük maliyetli mod: mobil veya düşük donanım algılandı.",
      "not-mounted": "Statik mod: istemci güvenli mount bekleniyor.",
      "reduced-motion": "Statik mod: hareket azaltma tercihi açık.",
      "rich-motion": "Kontrollü motion aktif.",
      "save-data": "Statik mod: veri tasarrufu açık.",
      "slow-connection": "Statik mod: düşük bağlantı algılandı.",
    };

    return {
      ...snapshot,
      canUseLowCostMotion:
        snapshot.isMounted && !shouldReduce && snapshot.isLowPowerDevice,
      canUseRichMotion:
        snapshot.isMounted && !shouldReduce && !snapshot.isLowPowerDevice,
      isSlowConnection,
      motionMode,
      motionModeLabel: motionModeLabel[motionMode],
      shouldReduceMotion: shouldReduce,
    };
  }, [snapshotKey]);
}
