import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { track } from "@vercel/analytics";
import { describe, expect, it, vi } from "vitest";

import { TrackedLink } from "@/components/analytics/tracked-link";

describe("TrackedLink", () => {
  it("keeps anchor semantics and fires whatsapp analytics with placement context", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <TrackedLink
        event="whatsapp_click"
        placement="hero"
        href="https://wa.me/905539304575"
        serviceSlug="seramik-kaplama"
        onClick={onClick}
      >
        WhatsApp
      </TrackedLink>,
    );

    const link = screen.getByRole("link", { name: "WhatsApp" });
    expect(link).toHaveAttribute("href", "https://wa.me/905539304575");

    await user.click(link);

    expect(track).toHaveBeenCalledWith("whatsapp_click", {
      placement: "hero",
      context: "general",
      service_slug: "seramik-kaplama",
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("routes phone and directions clicks to the matching analytics events", async () => {
    const user = userEvent.setup();

    render(
      <div>
        <TrackedLink
          event="phone_click"
          placement="home_contact"
          href="tel:+905539304575"
        >
          Ara
        </TrackedLink>
        <TrackedLink
          event="directions_click"
          placement="home_contact"
          href="https://maps.example"
        >
          Yol Tarifi
        </TrackedLink>
      </div>,
    );

    const phoneLink = screen.getByRole("link", { name: "Ara" });
    const directionsLink = screen.getByRole("link", { name: "Yol Tarifi" });

    expect(phoneLink).toHaveAttribute("href", "tel:+905539304575");
    expect(directionsLink).toHaveAttribute("href", "https://maps.example");

    await user.click(phoneLink);
    await user.click(directionsLink);

    expect(track).toHaveBeenNthCalledWith(1, "phone_click", {
      placement: "home_contact",
    });
    expect(track).toHaveBeenNthCalledWith(2, "directions_click", {
      placement: "home_contact",
    });
  });
});
