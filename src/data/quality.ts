/**
 * Quality stats — numeric highlights shown in the Quality section.
 *
 * Each stat has an icon (Iconify name stored directly), a display
 * value (e.g. "20+"), and a two-line description.
 *
 * Rendered by QualitySection.astro as an overlapping card on top
 * of the about-us image.
 */

import type { QualityStat } from "./lib/types";

export const qualityStats: QualityStat[] = [
  { icon: "lucide:sparkles", value: "20+", description: ["Years of Culinary", "Expertise"] },
  { icon: "lucide:chef-hat", value: "70+", description: ["Signature Dishes", "Perfected"] },
  { icon: "lucide:users", value: "500+", description: ["Happy Guests", "Every Month"] },
  { icon: "lucide:trophy", value: "25", description: ["Prestigious", "Culinary Awards"] },
];