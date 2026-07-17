<script lang="ts">
  /**
   * Catalog card — product card with a multi-image gallery.
   *
   * Structure:
   * - Image gallery (4:3 aspect ratio) with left/right arrow navigation
   * - Dot indicators showing current image position
   * - Text section: product name, divider, type, description
   *
   * State is simple: a single `activeIndex` integer controls which
   * image is visible. Images are stacked with absolute positioning
   * and toggled via opacity transitions.
   *
   * Card background is set by CSS in global.css (opposite of section bg):
   * - Cards in odd sections (background) → muted bg
   * - Cards in even sections (muted) → background bg
   *
   * Rendered with client:visible (hydrates when scrolled into view).
   */
  import { asset, type CatalogItem } from "../data";
  import Icon from "@iconify/svelte";

  /** Product data — name, type, description, image array. */
  interface Props {
    item: CatalogItem;
  }

  let { item }: Props = $props();

  /** Currently displayed image index (0-based, wraps around). */
  let activeIndex = $state(0);

  /** Navigate to the previous image (wraps to last if at start). */
  function prev() {
    activeIndex = (activeIndex - 1 + item.images.length) % item.images.length;
  }

  /** Navigate to the next image (wraps to first if at end). */
  function next() {
    activeIndex = (activeIndex + 1) % item.images.length;
  }
</script>

<!-- ── Card container: border + hover effect ──
     Background is set by global.css nth-of-type rule (opposite of section). -->
<article
  class="overflow-hidden border transition-colors duration-300 hover:border-primary"
>
  <!-- ── Gallery: image stack + navigation controls ── -->
  <div class="group relative bg-muted">
    <!-- Image stack: all images are absolutely positioned and overlaid.
         Only the active one has opacity-100, rest are opacity-0.
         Transition creates a crossfade effect. -->
    <div class="relative aspect-[4/3] overflow-hidden">
      {#each item.images as image, i (i)}
        <img
          src={asset(image.src)}
          alt={image.alt}
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 {activeIndex === i
            ? 'opacity-100'
            : 'opacity-0'}"
          loading="lazy"
        />
      {/each}
    </div>

    <!-- Navigation arrows (only if multiple images).
         Positioned at left/right center, semi-transparent with
         backdrop blur. Border + bg make them always visible.
         Hover fills with primary color. -->
    {#if item.images.length > 1}
      <!-- Left arrow: previous image -->
      <button
        onclick={prev}
        class="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-background/60 text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        aria-label="Previous image"
      >
        <Icon icon="lucide:chevron-left" width="16" height="16" />
      </button>

      <!-- Right arrow: next image -->
      <button
        onclick={next}
        class="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-background/60 text-foreground backdrop-blur-sm transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        aria-label="Next image"
      >
        <Icon icon="lucide:chevron-right" width="16" height="16" />
      </button>

      <!-- Dot indicators: show total images and current position.
           Active dot is wider (w-4) and primary colored.
           Inactive dots are smaller (w-1.5) and faded. -->
      <div class="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {#each item.images as _, i (i)}
          <span
            class="h-1.5 rounded-full transition-all duration-200 {activeIndex === i
              ? 'w-4 bg-primary'
              : 'w-1.5 bg-foreground/30'}"
          ></span>
        {/each}
      </div>
    {/if}
  </div>

  <!-- ── Text content: product info below the gallery ── -->
  <div class="space-y-3 px-6 py-5">
    <h3 class="text-lg font-semibold">{item.name}</h3>
    <hr class="border-border" />
    <div class="text-muted-foreground">
      <p class="mb-1 text-base font-medium">{item.type}</p>
      <p>{item.description}</p>
    </div>
  </div>
</article>