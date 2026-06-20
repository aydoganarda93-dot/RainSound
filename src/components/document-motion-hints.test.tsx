import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DocumentMotionHints } from "@/components/document-motion-hints";
import {
  mockDesktopRichMotionEnvironment,
  mockMatchMedia,
  mockNavigatorConnection,
} from "@/test/browser-mocks";

describe("DocumentMotionHints", () => {
  it("mirrors mounted motion preferences onto the document root for CSS hooks", async () => {
    mockDesktopRichMotionEnvironment();

    render(<DocumentMotionHints />);

    await waitFor(() => {
      expect(document.documentElement.dataset.motionMode).toBe("rich-motion");
    });

    expect(document.documentElement.dataset.reducedMotion).toBeUndefined();
    expect(document.documentElement.dataset.saveData).toBeUndefined();
    expect(document.documentElement.dataset.slowConnection).toBeUndefined();
    expect(document.documentElement.dataset.lowPower).toBeUndefined();
  });

  it("exposes save-data and slow-connection flags without enabling SiteFx reveal", async () => {
    mockMatchMedia({
      "(prefers-reduced-motion: reduce)": false,
      "(max-width: 767px)": false,
      "(pointer: coarse)": false,
    });
    mockNavigatorConnection({ effectiveType: "3g", saveData: true });

    render(<DocumentMotionHints />);

    await waitFor(() => {
      expect(document.documentElement.dataset.motionMode).toBe("save-data");
    });

    expect(document.documentElement.dataset.saveData).toBe("true");
    expect(document.documentElement.dataset.reducedMotion).toBe("true");
    expect(document.documentElement.dataset.slowConnection).toBe("true");
    expect(document.documentElement).not.toHaveAttribute("data-fx");
  });
});
