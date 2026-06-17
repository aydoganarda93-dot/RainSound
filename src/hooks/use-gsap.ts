"use client";

import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
