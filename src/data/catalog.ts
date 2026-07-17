/**
 * Catalog data — two product sections: greens (Пряные травы) and
 * microgreens (Микрозелень).
 *
 * Each section is rendered by CatalogSection.astro, which maps over
 * `items` and renders a CatalogCard.svelte for each product.
 *
 * Each card has a multi-image gallery navigable with left/right arrows.
 * The first image is shown by default.
 *
 * Note: product data is currently placeholder (restaurant dishes).
 * In production these would be actual herb/microgreen products.
 */

import type { CatalogSection } from "./lib/types";

/** Пряные травы — herbs section (odd position in page, section #2). */
export const greens: CatalogSection = {
  name: "Пряные травы",
  text: "Мы выращиваем сорта, которые задают тон всему блюду. Наш базилик и мята — это концентрат эфирных масел. Доставляем в день срезки в многоразовых контейнерах: вы получаете идеально свежий лист со сроком хранения 7-14 дней.",
  id: "greens",
  items: [
    {
      name: "Grilled Herb Chicken",
      type: "Main course 🥘",
      description: "Juicy chicken grilled with herbs and served with garlic sauce.",
      images: [
        { src: "/images/popular-dishes/grilled-herb-chicken.webp", alt: "Grilled Herb Chicken" },
        { src: "/images/hero-section/dish-01.webp", alt: "Plate 1" },
        { src: "/images/hero-section/dish-03.webp", alt: "Plate 3" },
        { src: "/images/new-items/new-items-01.webp", alt: "Salmon close-up" },
      ],
    },
    {
      name: "Classic Margherita Pizza",
      type: "Main course 🍕",
      description: "Crispy crust, fresh mozzarella, and basil a true classic.",
      images: [
        { src: "/images/popular-dishes/classic-margherita-pizza.webp", alt: "Margherita Pizza" },
        { src: "/images/hero-section/dish-02.webp", alt: "Plate 2" },
        { src: "/images/hero-section/dish-04.webp", alt: "Plate 4" },
        { src: "/images/new-items/new-items-02.webp", alt: "Mango Chicken" },
      ],
    },
    {
      name: "Spicy Shrimp Linguine",
      type: "Main course 🥘",
      description: "Shrimp, chili, and creamy tomato sauce tossed to perfection.",
      images: [
        { src: "/images/popular-dishes/spicy-shrimp-linguine.webp", alt: "Shrimp Linguine" },
        { src: "/images/hero-section/dish-03.webp", alt: "Plate 3" },
        { src: "/images/hero-section/dish-05.webp", alt: "Plate 5" },
        { src: "/images/new-items/new-items-03.webp", alt: "Tempeh Stir Fry" },
      ],
    },
    {
      name: "Chocolate Lava Cake",
      type: "Desert 🍫",
      description: "Warm molten cake with a scoop of vanilla ice cream.",
      images: [
        { src: "/images/popular-dishes/chocolate-lava-cake.webp", alt: "Lava Cake" },
        { src: "/images/hero-section/dish-04.webp", alt: "Plate 4" },
        { src: "/images/hero-section/dish-01.webp", alt: "Plate 1" },
        { src: "/images/offers/offers-image-01.webp", alt: "Launch deal" },
      ],
    },
  ],
};

/** Микрозелень — microgreens section (even position in page, section #3). */
export const microgreens: CatalogSection = {
  name: "Микрозелень",
  text: "Идеальный финальный штрих для ваших гастрономических шедевров. Мы поставляем микрозелень в многоразовых контейнерах на подложке из нетканой сетки: это гарантирует чистоту листа без песка и увеличивает срок хранения.",
  id: "microgreens",
  items: [
    {
      name: "Grilled Herb Chicken",
      type: "Main course 🥘",
      description: "Juicy chicken grilled with herbs and served with garlic sauce.",
      images: [
        { src: "/images/popular-dishes/grilled-herb-chicken.webp", alt: "Grilled Herb Chicken" },
        { src: "/images/hero-section/dish-02.webp", alt: "Plate 2" },
        { src: "/images/hero-section/dish-05.webp", alt: "Plate 5" },
        { src: "/images/new-items/new-items-02.webp", alt: "Mango Chicken" },
      ],
    },
    {
      name: "Classic Margherita Pizza",
      type: "Main course 🍕",
      description: "Crispy crust, fresh mozzarella, and basil a true classic.",
      images: [
        { src: "/images/popular-dishes/classic-margherita-pizza.webp", alt: "Margherita Pizza" },
        { src: "/images/hero-section/dish-01.webp", alt: "Plate 1" },
        { src: "/images/hero-section/dish-04.webp", alt: "Plate 4" },
        { src: "/images/offers/offers-image-02.webp", alt: "Bogo special" },
      ],
    },
    {
      name: "Spicy Shrimp Linguine",
      type: "Main course 🥘",
      description: "Shrimp, chili, and creamy tomato sauce tossed to perfection.",
      images: [
        { src: "/images/popular-dishes/spicy-shrimp-linguine.webp", alt: "Shrimp Linguine" },
        { src: "/images/hero-section/dish-03.webp", alt: "Plate 3" },
        { src: "/images/hero-section/dish-01.webp", alt: "Plate 1" },
        { src: "/images/offers/offers-image-03.webp", alt: "Family meal" },
      ],
    },
    {
      name: "Chocolate Lava Cake",
      type: "Desert 🍫",
      description: "Warm molten cake with a scoop of vanilla ice cream.",
      images: [
        { src: "/images/popular-dishes/chocolate-lava-cake.webp", alt: "Lava Cake" },
        { src: "/images/hero-section/dish-05.webp", alt: "Plate 5" },
        { src: "/images/hero-section/dish-02.webp", alt: "Plate 2" },
        { src: "/images/new-items/new-items-03.webp", alt: "Tempeh Stir Fry" },
      ],
    },
  ],
};