<script lang="ts">
  /**
   * Testimonials carousel — horizontally scrolling customer reviews.
   *
   * Architecture:
   * - Left panel: heading + prev/next navigation buttons
   * - Right panel: horizontally scrollable card strip with snap
   *
   * Navigation buttons scroll by one card width at a time.
   * Button disabled state is driven by scroll position tracking
   * (canPrev / canNext) updated via scroll event listener.
   *
   * Star ratings support full, half, and empty states.
   * Half stars use a gradient SVG def for the 50% fill.
   *
   * The <section> wrapper is in TestimonialsSectionWrapper.astro
   * (needed for CSS nth-of-type).
   *
   * Rendered with client:visible (hydrates when scrolled into view).
   */
  import { onMount } from "svelte";
  import { testimonials, asset } from "../data";
  import Icon from "@iconify/svelte";

  // ── DOM references ──
  /** The scrollable card container. */
  let scrollEl: HTMLElement;

  // ── Reactive state ──
  /** Can scroll left? (disabled at scroll position 0). */
  let canPrev = $state(false);
  /** Can scroll right? (disabled at end of scroll). */
  let canNext = $state(true);

  /**
   * Update prev/next button disabled state based on scroll position.
   * 5px tolerance to avoid edge jitter.
   */
  function updateNav() {
    if (!scrollEl) return;
    canPrev = scrollEl.scrollLeft > 5;
    canNext = scrollEl.scrollLeft < scrollEl.scrollWidth - scrollEl.clientWidth - 5;
  }

  /**
   * Scroll the card strip by one card width in the given direction.
   * Measures the first [data-card] element to determine scroll amount.
   * @param dir — 1 for next, -1 for previous
   */
  function scrollBy(dir: 1 | -1) {
    if (!scrollEl) return;
    const w = scrollEl.querySelector("[data-card]")?.getBoundingClientRect().width ?? 320;
    scrollEl.scrollBy({ left: dir * w, behavior: "smooth" });
  }

  // ── Lifecycle: attach scroll listener for nav button state ──
  onMount(() => {
    updateNav();
    scrollEl?.addEventListener("scroll", updateNav, { passive: true });
    return () => scrollEl?.removeEventListener("scroll", updateNav);
  });

  /**
   * Convert a numeric rating (0–5) into an array of star types.
   * @param rating — e.g. 4.5 → ["full","full","full","full","half"]
   * @returns array of "full" | "half" | "empty" (always 5 items)
   */
  function stars(rating: number) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) =>
      i < full ? "full" : i === full && half ? "half" : "empty"
    );
  }
</script>

<!-- ── Testimonials layout: heading (left) + card strip (right) ──
     Stacks vertically on small screens, side-by-side on sm+. -->
<div class="mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8">
    <!-- ── Left panel: badge, heading, description, nav buttons ── -->
    <div class="space-y-4 sm:w-1/2 lg:w-1/3">
      <span class="inline-block rounded-full border px-3 py-1 text-sm font-normal">Testimonials</span>
      <h2 class="text-2xl font-semibold sm:text-3xl lg:text-4xl">
        Customers<br />Feedback
      </h2>
      <p class="text-xl text-muted-foreground">
        Here's how our customers enjoyed our restaurant and the services we offer.
      </p>
      <!-- Prev/Next buttons: disabled state changes style.
           Disabled = muted bg, no pointer. Active = primary bg. -->
      <div class="flex items-center gap-4">
        <button
          onclick={() => scrollBy(-1)}
          disabled={!canPrev}
          class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:bg-primary/10 disabled:text-primary disabled:opacity-100"
          aria-label="Previous"
        >
          <Icon icon="lucide:chevron-left" width="20" height="20" />
        </button>
        <button
          onclick={() => scrollBy(1)}
          disabled={!canNext}
          class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:bg-primary/10 disabled:text-primary disabled:opacity-100"
          aria-label="Next"
        >
          <Icon icon="lucide:chevron-right" width="20" height="20" />
        </button>
      </div>
    </div>

    <!-- ── Right panel: scrollable card strip ──
         snap-x snap-mandatory: cards snap into place when scrolling.
         scrollbar-width: none: hides scrollbar for clean look. -->
    <div class="relative max-w-196 sm:w-1/2 lg:w-2/3">
      <div
        bind:this={scrollEl}
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style="scrollbar-width: none;"
      >
        {#each testimonials as t (t.name)}
          <!-- ── Testimonial card: avatar, stars, review text ──
               data-card attr: used by scrollBy() to measure card width.
               Fixed widths per breakpoint for consistent scroll distance. -->
          <article
            data-card
            class="snap-start shrink-0 border p-6 space-y-5 transition-colors duration-300 hover:border-primary w-[300px] sm:w-[340px] lg:w-[320px]"
          >
            <!-- Avatar + name -->
            <div class="flex items-center gap-3">
              <img src={asset(t.avatar)} alt={t.name} class="size-10 rounded-full object-cover" loading="lazy" />
              <h4 class="flex-1 font-medium">{t.name}</h4>
            </div>

            <!-- ── Star rating: 5 stars, supports full/half/empty ──
                 For half stars, a hidden <svg> with a linearGradient
                 is rendered. The gradient ID uses the reviewer's name
                 (spaces removed) to avoid collisions. -->
            <div class="flex gap-0.5">
              {#each stars(t.rating) as starType}
                {@const fillColor = starType === "empty" ? "#d1d5db" : "#eab308"}
                <Icon
                  icon="lucide:star"
                  width="24"
                  height="24"
                  style="color: {fillColor}; fill: {starType === 'full' ? fillColor : starType === 'half' ? 'url(#half-' + t.name.replace(/\\s/g, '') + ')' : 'none'};"
                />
                {#if starType === "half"}
                  <!-- Gradient definition for half-star fill.
                       50% gold, 50% transparent — left half filled. -->
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="half-{t.name.replace(/\\s/g, '')}">
                        <stop offset="50%" stop-color="#eab308" />
                        <stop offset="50%" stop-color="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                {/if}
              {/each}
            </div>

            <!-- Review text -->
            <p>{t.content}</p>
          </article>
        {/each}
      </div>
    </div>
  </div>