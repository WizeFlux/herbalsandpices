/**
 * Shared type definitions for all site data.
 *
 * Every data file (hero.ts, catalog.ts, etc.) imports its interface
 * from here. This keeps types in one place — no duplication, easy
 * to find, easy to extend.
 *
 * Convention: interface names are singular nouns describing one item.
 * Data arrays in the domain files use the pluralized export name.
 */

/** A single navigation link — used in header and footer. */
export interface NavItem {
  /** Display text shown to the user. */
  title: string;
  /** Anchor href pointing to a section id (e.g. "#greens"). */
  href: string;
}

/** One slide in the Hero carousel — image + testimonial comment. */
export interface HeroSlide {
  /** Unique numeric id — used as Svelte {#each} key for efficient DOM diffing. */
  id: number;
  /** Path to the dish image, relative to /public (e.g. "/images/hero-section/dish-01.webp"). */
  img: string;
  /** Alt text for accessibility and SEO. */
  imgAlt: string;
  /** Short customer comment shown alongside the slide. */
  comment: string;
}

/** A single image inside a catalog card's gallery. */
export interface CatalogImage {
  /** Path to the image file. */
  src: string;
  /** Alt text for accessibility. */
  alt: string;
}

/** One product card in the catalog (greens or microgreens section). */
export interface CatalogItem {
  /** Product name — shown as the card heading. */
  name: string;
  /** Category label with emoji (e.g. "Main course 🥘"). */
  type: string;
  /** Short description shown under the divider. */
  description: string;
  /** Array of images — the first is shown by default, rest are navigable via arrows. */
  images: CatalogImage[];
}

/** A full catalog section — heading + description + grid of product cards. */
export interface CatalogSection {
  /** Section heading (e.g. "Пряные травы"). */
  name: string;
  /** Descriptive paragraph shown under the heading. */
  text: string;
  /** HTML id for anchor navigation (e.g. "greens" → #greens). */
  id: string;
  /** Product cards rendered in the grid. */
  items: CatalogItem[];
}

/** One technology/process card in the Technologies section. */
export interface Technology {
  /** Path to the card image. */
  img: string;
  /** Alt text for the image. */
  alt: string;
  /** Card heading (e.g. "Lemon Herb Grilled Salmon"). */
  title: string;
  /** Description of the technology or process. */
  description: string;
  /** Link to a blog post or article (placeholder "#" for now). */
  blogLink: string;
}

/** A single quality statistic shown in the Quality section's stats card. */
export interface QualityStat {
  /**
   * Iconify icon name (e.g. "lucide:sparkles").
   * Stored directly — no mapping layer needed.
   * Used by astro-icon: <Icon name={stat.icon} />
   */
  icon: string;
  /** Display value (e.g. "20+", "500+"). */
  value: string;
  /** Two-line description: [line1, line2] — rendered with <br /> between. */
  description: [string, string];
}

/** One customer testimonial shown in the Testimonials carousel. */
export interface Testimonial {
  /** Customer name — shown as the card heading and used as Svelte {#each} key. */
  name: string;
  /** Path to the avatar image. */
  avatar: string;
  /** Star rating from 0 to 5 (supports halves, e.g. 4.5). */
  rating: number;
  /** Review text shown in the card body. */
  content: string;
}

/** One contact info card in the Contact section. */
export interface ContactCard {
  /** Card heading (e.g. "Телефон", "Email"). */
  title: string;
  /**
   * Iconify icon name (e.g. "lucide:clock").
   * Stored directly — no mapping layer needed.
   * Used by astro-icon: <Icon name={info.icon} />
   */
  icon: string;
  /** Contact value. Supports \n for multi-line (rendered via whitespace-pre-line). */
  description: string;
}