/**
 * Centralized site data — all editable content lives here.
 * Components import from this file; non-devs edit one file to change the site.
 */

// ─── Asset path helper ──────────────────────────────────────────
// Astro's `base` config prepends to page routes, but NOT to raw <img src>
// values from data files. This helper fixes that.
const BASE = import.meta.env.BASE_URL; // "/herbalsandpices" in prod, "" in dev
export function asset(path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

// ─── Site Metadata ──────────────────────────────────────────────

export const site = {
  title: "Травы – Приправы",
  description:
    "Зелень, которая вдохновляет шефов. Свежие травы и микрозелень с фермы в Шерегеше.",
  url: "https://wizeflux.github.io",
  basePath: "/herbalsandpices",
} as const;

// ─── Navigation ─────────────────────────────────────────────────

export const navigation = [
  { title: "Травы", href: "#greens" },
  { title: "Микрозелень", href: "#microgreens" },
  { title: "Технологии", href: "#tech" },
  { title: "Качество", href: "#quality" },
] as const;

export const footerLinks = [
  { title: "Травы", href: "#greens" },
  { title: "Микрозелень", href: "#microgreens" },
  { title: "Технологии", href: "#tech" },
  { title: "Качество", href: "#quality" },
] as const;

// ─── Hero ───────────────────────────────────────────────────────

export interface HeroSlide {
  id: number;
  img: string;
  imgAlt: string;
  comment: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    img: "/images/hero-section/dish-01.webp",
    imgAlt: "plate-1",
    comment: "The ambiance is perfect and the food is absolutely delicious. Highly recommended!",
  },
  {
    id: 2,
    img: "/images/hero-section/dish-02.webp",
    imgAlt: "plate-2",
    comment: "Best dining experience in town. The staff is friendly and the menu is exceptional.",
  },
  {
    id: 3,
    img: "/images/hero-section/dish-03.webp",
    imgAlt: "plate-3",
    comment: "Best dining experience in town. The staff is friendly and the menu is exceptional.",
  },
  {
    id: 4,
    img: "/images/hero-section/dish-04.webp",
    imgAlt: "plate-4",
    comment: "Great atmosphere and incredible flavors. A must-visit restaurant!",
  },
  {
    id: 5,
    img: "/images/hero-section/dish-05.webp",
    imgAlt: "plate-5",
    comment: "Best dining experience in town. The staff is friendly and the menu is exceptional.",
  },
  {
    id: 6,
    img: "/images/popular-dishes/grilled-herb-chicken.webp",
    imgAlt: "grilled herb chicken",
    comment: "Juicy chicken grilled with herbs and served with garlic sauce.",
  },
  {
    id: 7,
    img: "/images/popular-dishes/classic-margherita-pizza.webp",
    imgAlt: "margherita pizza",
    comment: "Crispy crust, fresh mozzarella, and basil — a true classic.",
  },
  {
    id: 8,
    img: "/images/new-items/new-items-01.webp",
    imgAlt: "lemon herb salmon",
    comment: "Perfect balance of zesty lemon and savoury herbs with fresh garden salad.",
  },
];

// ─── Catalog (Greens & Microgreens) ─────────────────────────────

export interface CatalogItem {
  name: string;
  type: string;
  description: string;
  images: { src: string; alt: string }[];
}

export interface CatalogSection {
  name: string;
  text: string;
  id: string;
  items: CatalogItem[];
}

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

// ─── Technologies ───────────────────────────────────────────────

export interface Technology {
  img: string;
  alt: string;
  title: string;
  description: string;
  blogLink: string;
}

export const technologies: Technology[] = [
  {
    img: "/images/new-items/new-items-01.webp",
    alt: "Lemon Herb Grilled Salmon",
    title: "Lemon Herb Grilled Salmon",
    description:
      "Delight in the perfect balance of zesty lemon and savoury herbs, beautifully paired with a fresh garden salad.",
    blogLink: "#",
  },
  {
    img: "/images/new-items/new-items-02.webp",
    alt: "Spicy Mango Chicken",
    title: "Spicy Mango Chicken",
    description:
      "A sweet and spicy fusion of tender chicken breast combined with ripe mango and a delightful chili kick.",
    blogLink: "#",
  },
  {
    img: "/images/new-items/new-items-03.webp",
    alt: "Vegetarian Tempeh Stir Fry",
    title: "Vegetarian Tempeh Stir Fry",
    description:
      "A healthy, hearty and nutritious dish featuring tempeh, fresh seasonal vegetables, and a light, flavourful sauce.",
    blogLink: "#",
  },
  {
    img: "/images/new-items/new-items-03.webp",
    alt: "Vegetarian Tempeh Stir Fry",
    title: "Vegetarian Tempeh Stir Fry",
    description:
      "A healthy, hearty and nutritious dish featuring tempeh, fresh seasonal vegetables, and a light, flavourful sauce.",
    blogLink: "#",
  },
];

// ─── Quality / Stats ────────────────────────────────────────────

export interface QualityStat {
  icon: "sparkles" | "chef-hat" | "users" | "trophy";
  value: string;
  description: [string, string];
}

export const qualityStats: QualityStat[] = [
  { icon: "sparkles", value: "20+", description: ["Years of Culinary", "Expertise"] },
  { icon: "chef-hat", value: "70+", description: ["Signature Dishes", "Perfected"] },
  { icon: "users", value: "500+", description: ["Happy Guests", "Every Month"] },
  { icon: "trophy", value: "25", description: ["Prestigious", "Culinary Awards"] },
];

// ─── Testimonials ───────────────────────────────────────────────

export interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  content: string;
}

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
];

// ─── Contact Info ───────────────────────────────────────────────

export interface ContactCard {
  title: string;
  icon: "clock" | "phone" | "mail" | "telegram";
  description: string;
}

export const contactInfo: ContactCard[] = [
  {
    title: "Принимаем заказы",
    icon: "clock",
    description: "Понедельник – Суббота\nс 9:00 до 20:00",
  },
  {
    title: "Телефон",
    icon: "phone",
    description: "+7 932 632 1232",
  },
  {
    title: "Email",
    icon: "mail",
    description: "greens@realto.be",
  },
  {
    title: "Telegram",
    icon: "telegram",
    description: "@travipripravi",
  },
];