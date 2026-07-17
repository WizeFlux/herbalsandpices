/**
 * Contact info cards — shown in the Contact section.
 *
 * Each card has a title, an Iconify icon name (stored directly,
 * no mapping layer), and a description. Descriptions support
 * newlines (\n) which are rendered via CSS `whitespace-pre-line`.
 *
 * Rendered by ContactUsSection.astro in a 4-column grid.
 */

import type { ContactCard } from "./lib/types";

export const contactInfo: ContactCard[] = [
  {
    title: "Принимаем заказы",
    icon: "lucide:clock",
    description: "Понедельник – Суббота\nс 9:00 до 20:00",
  },
  {
    title: "Телефон",
    icon: "lucide:phone",
    description: "+7 932 632 1232",
  },
  {
    title: "Email",
    icon: "lucide:mail",
    description: "greens@realto.be",
  },
  {
    title: "Telegram",
    icon: "lucide:send",
    description: "@travipripravi",
  },
];