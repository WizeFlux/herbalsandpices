/**
 * Navigation links — shared between header and footer.
 *
 * Each link points to a section id on the same page (anchor links).
 * The header uses smooth-scroll JS; the footer uses plain <a href> links.
 *
 * `navigation` and `footerLinks` are separate exports so they can
 * diverge in the future (e.g. footer might have extra links like
 * "Privacy Policy" that don't appear in the header).
 */

import type { NavItem } from "./lib/types";

/** Header navigation — primary menu items. */
export const navigation: NavItem[] = [
  { title: "Травы", href: "#greens" },
  { title: "Микрозелень", href: "#microgreens" },
  { title: "Технологии", href: "#tech" },
  { title: "Качество", href: "#quality" },
];

/** Footer navigation — currently mirrors header but may diverge. */
export const footerLinks: NavItem[] = [
  { title: "Травы", href: "#greens" },
  { title: "Микрозелень", href: "#microgreens" },
  { title: "Технологии", href: "#tech" },
  { title: "Качество", href: "#quality" },
];