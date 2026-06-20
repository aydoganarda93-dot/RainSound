import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

const blockingImpacts = new Set(["critical", "serious"]);

export type AxeScanOptions = {
  /** axe rule ids to skip (document known low-impact findings in PROJECT_PLAN). */
  disabledRules?: string[];
};

export async function analyzePageAccessibility(
  page: Page,
  options: AxeScanOptions = {},
) {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
  ]);

  if (options.disabledRules?.length) {
    builder = builder.disableRules(options.disabledRules);
  }

  return builder.analyze();
}

export async function expectNoBlockingA11yViolations(
  page: Page,
  options: AxeScanOptions = {},
) {
  const results = await analyzePageAccessibility(page, options);
  const blockingViolations = results.violations.filter((violation) =>
    blockingImpacts.has(violation.impact ?? ""),
  );

  expect(blockingViolations, formatViolations(blockingViolations)).toEqual([]);
}

const formatViolations = (
  violations: Awaited<
    ReturnType<typeof analyzePageAccessibility>
  >["violations"],
) =>
  violations
    .map(
      (violation) =>
        `[${violation.impact}] ${violation.id}: ${violation.description} (${violation.nodes.length} nodes)`,
    )
    .join("\n");
