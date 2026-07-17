/**
 * Barrel export — single import point for all site data.
 *
 * Usage:
 *   import { site, navigation, heroSlides, greens, microgreens,
 *            technologies, qualityStats, testimonials, contactInfo,
 *            asset } from "../data";
 *
 * Or import from individual files:
 *   import { heroSlides } from "../data/hero";
 *   import { asset } from "../data/lib/asset";
 */

export { site } from "./site";
export { navigation, footerLinks } from "./navigation";
export { heroSlides } from "./hero";
export { greens, microgreens } from "./catalog";
export { technologies } from "./technologies";
export { qualityStats } from "./quality";
export { testimonials } from "./testimonials";
export { contactInfo } from "./contact";
export { asset } from "./lib/asset";

// Re-export all types
export type {
  NavItem,
  HeroSlide,
  CatalogImage,
  CatalogItem,
  CatalogSection,
  Technology,
  QualityStat,
  Testimonial,
  ContactCard,
} from "./lib/types";