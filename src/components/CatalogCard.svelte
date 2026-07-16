<script lang="ts">
  /**
   * Catalog card with image gallery.
   * Thumbnail buttons on top switch the main image.
   * Pure state: current index → which image shows.
   */
  import { asset, type CatalogItem } from "../data/site";

  interface Props {
    item: CatalogItem;
  }

  let { item }: Props = $props();

  let activeIndex = $state(0);

  function selectImage(index: number) {
    activeIndex = index;
  }
</script>

<article
  class="overflow-hidden border transition-colors duration-300 hover:border-primary"
>
  <!-- Gallery -->
  <div class="bg-muted">
    <!-- Thumbnail nav buttons -->
    {#if item.images.length > 1}
      <div class="flex gap-1 p-2">
        {#each item.images as image, i (i)}
          <button
            onclick={() => selectImage(i)}
            class="relative shrink-0 overflow-hidden border-2 transition-all duration-200 {activeIndex === i
              ? 'border-primary opacity-100'
              : 'border-transparent opacity-60 hover:opacity-100'}"
            aria-label="Image {i + 1}"
          >
            <img
              src={asset(image.src)}
              alt={image.alt}
              class="h-12 w-16 object-cover"
              loading="lazy"
            />
          </button>
        {/each}
      </div>
    {/if}

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