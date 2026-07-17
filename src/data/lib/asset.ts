/**
 * Asset path helper.
 * Astro's `base` config prepends to page routes, but NOT to raw <img src>
 * values from data files. This helper fixes that.
 */
const BASE = import.meta.env.BASE_URL;

export function asset(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}