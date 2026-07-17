/**
 * Customer testimonials — reviews shown in the Testimonials carousel.
 *
 * Each testimonial has a name, avatar, star rating (0–5, halves
 * supported), and review text. The carousel scrolls horizontally
 * with prev/next buttons and snap scrolling.
 *
 * Rendered by TestimonialsSection.svelte.
 * Star ratings are rendered as filled/half/empty lucide:star icons.
 */

import type { Testimonial } from "./lib/types";

export const testimonials: Testimonial[] = [
  {
    name: "Craig Bator",
    avatar: "/images/hero-section/avatar-01.webp",
    rating: 4.5,
    content:
      "I've been visiting this restaurant for months, and every experience has been amazing! The atmosphere is warm, and the food is always delicious. A must-try for anyone in the area.",
  },
  {
    name: "Martin Dorwart",
    avatar: "/images/hero-section/avatar-02.webp",
    rating: 4,
    content:
      "If you love authentic dishes made from fresh ingredients, this place is for you. The staff is friendly, and the flavours are spot on. Perfect for any occasion.",
  },
  {
    name: "Sarah Johnson",
    avatar: "/images/hero-section/avatar-03.webp",
    rating: 5,
    content:
      "Delicious food made with care and fresh ingredients. The atmosphere is cozy, and the staff makes you feel right at home. Ideal for casual dinners or special moments.",
  },
  {
    name: "Alex Chen",
    avatar: "/images/hero-section/avatar-04.webp",
    rating: 4.5,
    content:
      "Fresh ingredients, balanced flavors, and excellent presentation define this bistro. The staff is polite and always smiling. Perfect for a pleasant dining experience.",
  },
  // ── Russian-language reviews from local customers ──
  {
    name: "Elena Volkova",
    avatar: "/images/hero-section/avatar-01.webp",
    rating: 5,
    content:
      "Лучшая зелень, что я пробовала в Шерегеше! Базилик пахнет так, будто сорвала его с грядки пять минут назад. Доставку привезли прямо на кухню ресторана — всё аккуратно, в многоразовых контейнерах.",
  },
  {
    name: "Dmitri Sokolov",
    avatar: "/images/hero-section/avatar-02.webp",
    rating: 4.5,
    content:
      "Заказываем микрозелень каждую неделю. Качество стабильно высокое, срок хранения реально 10-14 дней. Особенно понравился редбазил и горчица — аромат концентрированный, как надо.",
  },
  {
    name: "Olga Kremen",
    avatar: "/images/hero-section/avatar-03.webp",
    rating: 5,
    content:
      "Тестовый набор получила бесплатно, как и обещали. Через неделю стали постоянным клиентом. Мята и кинза — просто находка для наших десертов и соусов.",
  },
];