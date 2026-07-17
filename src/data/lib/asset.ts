/**
 * Asset path helper.
 *
 * Astro's `base` config option (set in astro.config.mjs) prepends
 * a path prefix to all page routes and built assets — e.g. "/herbalsandpices".
 * However, raw <img src="/images/..."> values in data files are NOT
 * automatically prefixed. This helper ensures images work in both
 * development (BASE_URL = "") and production (BASE_URL = "/herbalsandpices").
 *
 * Usage in components:
 *   import { asset } from "../data";
 *   <img src={asset(slide.img)} />
 *
 * If the path is already a full URL (starts with "http") or an anchor
 * (starts with "#"), it passes through unchanged.
 */

/** The base path from Astro config — "" in dev, "/herbalsandpices" in prod. */
const BASE = import.meta.env.BASE_URL;

/**
 * Prepends the Astro base path to a raw asset path.
 * @param path - Image path starting with "/" (e.g. "/images/hero.webp")
 * @returns Full path with base prefix (e.g. "/herbalsandpices/images/hero.webp")
 */
export function asset(path: string): string {
  // Pass through external URLs and anchor links unchanged
  if (path.startsWith("http") || path.startsWith("#")) return path;
  // Ensure exactly one slash between base and path
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}