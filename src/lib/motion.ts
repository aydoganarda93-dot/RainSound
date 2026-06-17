import { gsap } from "gsap";

export const prefersReducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const slowConnectionTypes = new Set(["slow-2g", "2g"]);

export type GsapContextSetup = Parameters<typeof gsap.context>[0];
export type GsapContextScope = Parameters<typeof gsap.context>[1];
export type GsapTimeline = gsap.core.Timeline;
export type GsapTween = gsap.core.Tween;

export const createGsapCleanup = (
  setup: GsapContextSetup,
  scope?: GsapContextScope,
) => {
  const context = gsap.context(setup, scope);

  return () => {
    context.revert();
  };
};

export const killGsapInstances = (
  instances: Array<GsapTimeline | GsapTween | null | undefined>,
) => {
  for (const instance of instances) {
    instance?.kill();
  }
};

export const isSlowConnectionType = (effectiveType?: string) =>
  Boolean(effectiveType && slowConnectionTypes.has(effectiveType));

export const shouldUseReducedMotion = ({
  prefersReducedMotion,
  isSaveDataEnabled,
  effectiveConnectionType,
}: {
  prefersReducedMotion: boolean;
  isSaveDataEnabled: boolean;
  effectiveConnectionType?: string;
}) =>
  prefersReducedMotion ||
  isSaveDataEnabled ||
  isSlowConnectionType(effectiveConnectionType);

export { gsap };
