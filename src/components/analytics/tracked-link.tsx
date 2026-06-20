"use client";

import type { ComponentProps, MouseEvent } from "react";

import {
  trackDirectionsClick,
  trackPhoneClick,
  trackWhatsAppClick,
  type AnalyticsPlacement,
  type WhatsAppClickContext,
} from "@/lib/analytics";

type TrackedLinkBaseProps = Omit<ComponentProps<"a">, "onClick"> & {
  placement: AnalyticsPlacement;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type TrackedWhatsAppLinkProps = TrackedLinkBaseProps & {
  event: "whatsapp_click";
  context?: WhatsAppClickContext;
  serviceSlug?: string;
  projectSlug?: string;
};

type TrackedPhoneLinkProps = TrackedLinkBaseProps & {
  event: "phone_click";
};

type TrackedDirectionsLinkProps = TrackedLinkBaseProps & {
  event: "directions_click";
};

export type TrackedLinkProps =
  | TrackedWhatsAppLinkProps
  | TrackedPhoneLinkProps
  | TrackedDirectionsLinkProps;

const getAnchorProps = (props: TrackedLinkProps): ComponentProps<"a"> => {
  const anchorProps = { ...props } as ComponentProps<"a"> &
    Partial<TrackedWhatsAppLinkProps>;

  delete anchorProps.event;
  delete anchorProps.placement;
  delete anchorProps.onClick;
  delete anchorProps.context;
  delete anchorProps.serviceSlug;
  delete anchorProps.projectSlug;

  return anchorProps;
};

export function TrackedLink(props: TrackedLinkProps) {
  const handleClick = (clickEvent: MouseEvent<HTMLAnchorElement>) => {
    if (props.event === "whatsapp_click") {
      trackWhatsAppClick({
        placement: props.placement,
        context: props.context,
        serviceSlug: props.serviceSlug,
        projectSlug: props.projectSlug,
      });
    } else if (props.event === "phone_click") {
      trackPhoneClick({ placement: props.placement });
    } else {
      trackDirectionsClick({ placement: props.placement });
    }

    props.onClick?.(clickEvent);
  };

  return <a {...getAnchorProps(props)} onClick={handleClick} />;
}
