import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useMotionPreferences } from "@/hooks/use-motion-preferences";
import {
  mockDesktopRichMotionEnvironment,
  mockMatchMedia,
  mockNavigatorConnection,
} from "@/test/browser-mocks";

describe("useMotionPreferences", () => {
  it("defaults to rich-motion when no degradation signals are present", () => {
    mockDesktopRichMotionEnvironment();

    const { result } = renderHook(() => useMotionPreferences());

    expect(result.current.isMounted).toBe(true);
    expect(result.current.motionMode).toBe("rich-motion");
    expect(result.current.shouldReduceMotion).toBe(false);
    expect(result.current.canUseRichMotion).toBe(true);
  });

  it("enters rich-motion on fast desktop connections without degradation signals", () => {
    mockDesktopRichMotionEnvironment();

    const { result } = renderHook(() => useMotionPreferences());

    expect(result.current.motionMode).toBe("rich-motion");
    expect(result.current.shouldReduceMotion).toBe(false);
    expect(result.current.canUseRichMotion).toBe(true);
    expect(result.current.isSlowConnection).toBe(false);
  });

  it("prioritizes save-data over slow-connection and low-power modes", () => {
    mockMatchMedia({
      "(prefers-reduced-motion: reduce)": false,
      "(max-width: 767px)": true,
      "(pointer: coarse)": true,
    });
    mockNavigatorConnection({ effectiveType: "3g", saveData: true });

    const { result } = renderHook(() => useMotionPreferences());

    expect(result.current.motionMode).toBe("save-data");
    expect(result.current.shouldReduceMotion).toBe(true);
    expect(result.current.canUseRichMotion).toBe(false);
  });

  it("maps 3g effectiveType to slow-connection when save-data is off", () => {
    mockDesktopRichMotionEnvironment();
    mockNavigatorConnection({ effectiveType: "3g", saveData: false });

    const { result } = renderHook(() => useMotionPreferences());

    expect(result.current.motionMode).toBe("slow-connection");
    expect(result.current.isSlowConnection).toBe(true);
    expect(result.current.shouldReduceMotion).toBe(true);
  });

  it("keeps 4g connections in rich-motion when no other signals fire", () => {
    mockDesktopRichMotionEnvironment();

    const { result } = renderHook(() => useMotionPreferences());

    expect(result.current.effectiveConnectionType).toBe("4g");
    expect(result.current.motionMode).toBe("rich-motion");
    expect(result.current.isSlowConnection).toBe(false);
  });
});
