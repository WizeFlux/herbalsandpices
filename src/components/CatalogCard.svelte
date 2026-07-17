<script lang="ts">
  /**
   * Catalog card with image gallery.
   * Left/right arrow buttons navigate through images.
   * Pure state: current index → which image shows.
   */
  import { asset, type CatalogItem } from "../data/site";
  import Icon from "@iconify/svelte";

  interface Props {
    item: CatalogItem;
  }

  let { item }: Props = $props();

  let activeIndex = $state(0);

  function prev() {
    activeIndex = (activeIndex - 1 + item.images.length) % item.images.length;
  }

  function next() {
    activeIndex = (activeIndex + 1) % item.images.length;
  }
</script>

<article
  class="overflow-hidden border transition-colors duration-300 hover:border-primary"
>
  <!-- Gallery -->
  <div class="group relative bg-muted">
    <!-- Main image -->
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

    {#if item.images.length > 1}
      <!-- Left button -->
      <button
        onclick={prev}
        class="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border bg-background/80 text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
        aria-label="Previous image"
      >
        <Icon icon="lucide:chevron-left" width="16" height="16" />
      </button>

      <!-- Right button -->
      <button
        onclick={next}
        class="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border bg-background/80 text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
        aria-label="Next image"
      >
        <Icon icon="lucide:chevron-right" width="16" height="16" />
      </button>

      <!-- Dots indicator -->
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

  <!-- Text content -->
  <div class="space-y-3 px-6 py-5">
    <h3 class="text-lg font-semibold">{item.name}</h3>
    <hr class="border-border" />
    <div class="text-muted-foreground">
      <p class="mb-1 text-base font-medium">{item.type}</p>
      <p>{item.description}</p>
    </div>
  </div>
</article>