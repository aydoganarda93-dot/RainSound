"use client";

import { useEffect, useRef } from "react";

import { trackProjectView, trackServiceView } from "@/lib/analytics";

export function ServiceViewTracker({
  serviceId,
  slug,
  title,
}: {
  serviceId: string;
  slug: string;
  title: string;
}) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return;
    }

    hasTracked.current = true;
    trackServiceView({ serviceId, slug, title });
  }, [serviceId, slug, title]);

  return null;
}

export function ProjectViewTracker({
  projectId,
  slug,
  title,
}: {
  projectId: string;
  slug: string;
  title: string;
}) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) {
      return;
    }

    hasTracked.current = true;
    trackProjectView({ projectId, slug, title });
  }, [projectId, slug, title]);

  return null;
}
