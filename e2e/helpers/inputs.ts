import { expect, type Locator } from "@playwright/test";

export const setRangeValue = async (slider: Locator, value: string) => {
  await slider.evaluate((element, nextValue) => {
    const input = element as HTMLInputElement;
    const valueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    )?.set;

    valueSetter?.call(input, nextValue);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
};

export const expectRangeValue = async (slider: Locator, value: string) => {
  await expect(slider).toHaveValue(value);
};
