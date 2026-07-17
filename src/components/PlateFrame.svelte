<script lang="ts">
  /**
   * Plate frame — decorative SVG used in Hero thumbnail strip.
   *
   * This is a Svelte wrapper for the plate-frame shape.
   * The same SVG also exists in src/icons/plate-frame.svg (used by
   * astro-icon for Astro components). This Svelte version is needed
   * because HeroSection.svelte can't use astro-icon.
   *
   * The frame is positioned behind the food image (z-0) in
   * HeroSection.svelte, with the image on top (z-1).
   *
   * Uses currentColor for the stroke, so the parent's text color
   * class controls the frame color (text-primary for active,
   * text-border for inactive).
   */
  interface Props {
    /** CSS class — typically "w-full h-auto" for responsive scaling. */
    class?: string;
  }

  let { class: className }: Props = $props();
</script>

<!-- viewBox 161×92: the plate shape's native coordinate system.
     stroke="currentColor" allows color control via Tailwind text-* classes. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161 92" fill="none" class={className}>
  <path
    d="M0.682517 80.6118L0.501193 39.6946C0.480127 34.9409 3.80852 30.8294 8.46241 29.8603L148.426 0.713985C154.636 -0.579105 160.465 4.16121 160.465 10.504V80.7397C160.465 86.2674 155.98 90.7465 150.453 90.7397L10.6701 90.5674C5.16936 90.5607 0.706893 86.1125 0.682517 80.6118Z"
    stroke="currentColor"
  />
</svg>