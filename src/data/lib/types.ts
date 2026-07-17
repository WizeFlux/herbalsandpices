/**
 * Shared type definitions for site data.
 */

export interface NavItem {
  title: string;
  href: string;
}

export interface HeroSlide {
  id: number;
  img: string;
  imgAlt: string;
  comment: string;
}

export interface CatalogImage {
  src: string;
  alt: string;
}

export interface CatalogItem {
  name: string;
  type: string;
  description: string;
  images: CatalogImage[];
}

export interface CatalogSection {
  name: string;
  text: string;
  id: string;
  items: CatalogItem[];
}

export interface Technology {
  img: string;
  alt: string;
  title: string;
  description: string;
  blogLink: string;
}

export interface QualityStat {
  icon: string;
  value: string;
  description: [string, string];
}

export interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface ContactCard {
  title: string;
  icon: string;
  description: string;
}