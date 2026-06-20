import { describe, expect, it } from "vitest";

import {
  createGeneralWhatsAppMessage,
  createWhatsAppLink,
  encodeWhatsAppMessage,
  generalWhatsAppLink,
  normalizeWhatsAppMessage,
} from "@/content/contact-actions";

describe("normalizeWhatsAppMessage", () => {
  it("trims blank lines and preserves meaningful line breaks", () => {
    expect(
      normalizeWhatsAppMessage(`
        Merhaba RAIN SOUND,

        Hizmetleriniz hakkında bilgi almak istiyorum.
      `),
    ).toBe(
      "Merhaba RAIN SOUND,\nHizmetleriniz hakkında bilgi almak istiyorum.",
    );
  });
});

describe("encodeWhatsAppMessage", () => {
  it("URL-encodes normalized text for wa.me query strings", () => {
    expect(encodeWhatsAppMessage("Merhaba\nRAIN SOUND")).toBe(
      "Merhaba%0ARAIN%20SOUND",
    );
  });
});

describe("createWhatsAppLink", () => {
  it("builds a wa.me href with encoded text parameter", () => {
    const href = createWhatsAppLink("Merhaba RAIN SOUND");

    expect(href).toMatch(/^https:\/\/wa\.me\/905539304575\?text=/);
    expect(href).toContain(encodeURIComponent("Merhaba RAIN SOUND"));
  });
});

describe("generalWhatsAppLink", () => {
  it("exposes a stable CTA label and message body used across the site", () => {
    expect(generalWhatsAppLink.label.length).toBeGreaterThan(0);
    expect(generalWhatsAppLink.message).toContain("RAIN SOUND");
    expect(generalWhatsAppLink.href).toBe(
      createWhatsAppLink(createGeneralWhatsAppMessage()),
    );
  });
});
