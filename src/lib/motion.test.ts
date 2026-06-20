import { describe, expect, it } from "vitest";

import {
  isSlowConnectionType,
  shouldUseReducedMotion,
  slowConnectionTypes,
} from "@/lib/motion";

describe("isSlowConnectionType", () => {
  it.each(["slow-2g", "2g", "3g"])(
    "treats %s as a slow connection",
    (effectiveType) => {
      expect(isSlowConnectionType(effectiveType)).toBe(true);
      expect(slowConnectionTypes.has(effectiveType)).toBe(true);
    },
  );

  it("does not treat 4g or unknown types as slow", () => {
    expect(isSlowConnectionType("4g")).toBe(false);
    expect(isSlowConnectionType("wifi")).toBe(false);
    expect(isSlowConnectionType(undefined)).toBe(false);
  });
});

describe("shouldUseReducedMotion", () => {
  it("returns true when reduced motion, save-data, or slow connection is active", () => {
    expect(
      shouldUseReducedMotion({
        prefersReducedMotion: true,
        isSaveDataEnabled: false,
        effectiveConnectionType: "4g",
      }),
    ).toBe(true);

    expect(
      shouldUseReducedMotion({
        prefersReducedMotion: false,
        isSaveDataEnabled: true,
        effectiveConnectionType: "4g",
      }),
    ).toBe(true);

    expect(
      shouldUseReducedMotion({
        prefersReducedMotion: false,
        isSaveDataEnabled: false,
        effectiveConnectionType: "3g",
      }),
    ).toBe(true);
  });

  it("returns false only when all degradation signals are off", () => {
    expect(
      shouldUseReducedMotion({
        prefersReducedMotion: false,
        isSaveDataEnabled: false,
        effectiveConnectionType: "4g",
      }),
    ).toBe(false);
  });
});
