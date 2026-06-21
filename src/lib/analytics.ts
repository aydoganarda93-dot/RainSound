import { track } from "@vercel/analytics";

export const ANALYTICS_EVENTS = {
  WHATSAPP_CLICK: "whatsapp_click",
  PHONE_CLICK: "phone_click",
  DIRECTIONS_CLICK: "directions_click",
  SERVICE_VIEW: "service_view",
  PROJECT_VIEW: "project_view",
  BEFORE_AFTER_INTERACTION: "before_after_interaction",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsPlacement =
  | "header_cta"
  | "header_mobile_cta"
  | "footer_contact"
  | "footer_bottom"
  | "hero"
  | "home_cta"
  | "home_contact"
  | "home_testimonials"
  | "services_page"
  | "service_detail"
  | "project_detail"
  | "contact_page"
  | "about_page"
  | "status_view"
  | "legal_page";

export type WhatsAppClickContext = "general" | "service" | "project";

export type AnalyticsEventPayload = Record<
  string,
  string | number | boolean | null
>;

const emitAnalyticsEvent = (
  name: AnalyticsEventName,
  data?: AnalyticsEventPayload,
) => {
  if (typeof window === "undefined") {
    return;
  }

  track(name, data);
};

export const trackWhatsAppClick = ({
  placement,
  context = "general",
  serviceSlug,
  projectSlug,
}: {
  placement: AnalyticsPlacement;
  context?: WhatsAppClickContext;
  serviceSlug?: string;
  projectSlug?: string;
}) => {
  emitAnalyticsEvent(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
    placement,
    context,
    ...(serviceSlug ? { service_slug: serviceSlug } : {}),
    ...(projectSlug ? { project_slug: projectSlug } : {}),
  });
};

export const trackPhoneClick = ({
  placement,
}: {
  placement: AnalyticsPlacement;
}) => {
  emitAnalyticsEvent(ANALYTICS_EVENTS.PHONE_CLICK, { placement });
};

export const trackDirectionsClick = ({
  placement,
}: {
  placement: AnalyticsPlacement;
}) => {
  emitAnalyticsEvent(ANALYTICS_EVENTS.DIRECTIONS_CLICK, { placement });
};

export const trackServiceView = ({
  serviceId,
  slug,
  title,
}: {
  serviceId: string;
  slug: string;
  title: string;
}) => {
  emitAnalyticsEvent(ANALYTICS_EVENTS.SERVICE_VIEW, {
    service_id: serviceId,
    slug,
    title,
  });
};

export const trackProjectView = ({
  projectId,
  slug,
  title,
}: {
  projectId: string;
  slug: string;
  title: string;
}) => {
  emitAnalyticsEvent(ANALYTICS_EVENTS.PROJECT_VIEW, {
    project_id: projectId,
    slug,
    title,
  });
};

export const trackBeforeAfterInteraction = ({
  projectSlug,
  pairId,
  position,
  action,
}: {
  projectSlug: string;
  pairId: string;
  position: number;
  action: "slide" | "keyboard";
}) => {
  emitAnalyticsEvent(ANALYTICS_EVENTS.BEFORE_AFTER_INTERACTION, {
    project_slug: projectSlug,
    pair_id: pairId,
    position,
    action,
  });
};
