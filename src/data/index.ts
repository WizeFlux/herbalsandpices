/**
 * Barrel export — single import point for all site data.
 *
 * Instead of importing from individual files:
 *   import { heroSlides } from "../data/hero";
 *   import { asset } from "../data/lib/asset";
 *
 * You can import everything from one place:
 *   import { heroSlides, asset, greens } from "../data";
 *
 * This works because each domain file re-exports its contents here.
 * Types are also re-exported with `export type` for convenient access.
 *
 * Individual file imports still work if you prefer finer granularity.
 */

// ── Site metadata ──
export { site } from "./site";

// ── Navigation ──
export { navigation, footerLinks } from "./navigation";

// ── Hero carousel ──
export { heroSlides } from "./hero";

// ── Catalog (greens + microgreens) ──
export { greens, microgreens } from "./catalog";

// ── Technologies section ──
export { technologies } from "./technologies";

// ── Quality stats ──
export { qualityStats } from "./quality";

// ── Customer testimonials ──
export { testimonials } from "./testimonials";

// ── Contact info cards ──
export { contactInfo } from "./contact";

// ── Utility ──
export { asset } from "./lib/asset";

// ── Type re-exports (for `import type { CatalogItem } from "../data"`) ──
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