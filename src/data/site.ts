/**
 * Site metadata — global information about the website.
 *
 * Used by:
 * - Layout.astro → <title>, meta tags, structured data
 * - Any component needing the site name or URL
 */

export const site = {
  /** Page <title> and Open Graph title. */
  title: "Травы – Приправы",
  /** Meta description for SEO and social sharing. */
  description:
    "Зелень, которая вдохновляет шефов. Свежие травы и микрозелень с фермы в Шерегеше.",
  /** Canonical site URL (for Open Graph and structured data). */
  url: "https://wizeflux.github.io",
  /** GitHub Pages subpath — must match `base` in astro.config.mjs. */
  basePath: "/herbalsandpices",
} as const;