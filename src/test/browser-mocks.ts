import { vi } from "vitest";

type MatchMediaConfig = Record<string, boolean>;

type ConnectionConfig = {
  effectiveType?: string;
  saveData?: boolean;
};

const createMediaQueryList = (query: string, matches: boolean) => ({
  matches,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

export const mockMatchMedia = (config: MatchMediaConfig) => {
  window.matchMedia = vi.fn((query: string) =>
    createMediaQueryList(query, config[query] ?? false),
  );
};

export const mockNavigatorConnection = (config: ConnectionConfig) => {
  const connection = {
    effectiveType: config.effectiveType,
    saveData: config.saveData ?? false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };

  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: connection,
  });

  return connection;
};

export const mockDesktopRichMotionEnvironment = () => {
  mockMatchMedia({
    "(prefers-reduced-motion: reduce)": false,
    "(max-width: 767px)": false,
    "(pointer: coarse)": false,
  });
  mockNavigatorConnection({ effectiveType: "4g", saveData: false });
  Object.defineProperty(navigator, "deviceMemory", {
    configurable: true,
    value: 8,
  });
  Object.defineProperty(navigator, "hardwareConcurrency", {
    configurable: true,
    value: 8,
  });
};
