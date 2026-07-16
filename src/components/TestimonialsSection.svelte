<script lang="ts">
  /**
   * Testimonials carousel — prev/next navigation through customer reviews.
   * Shows 2 cards on desktop, 1 on mobile.
   */
  import { onMount } from "svelte";
  import { testimonials, asset } from "../data/site";

  let scrollContainer: HTMLElement;
  let canPrev = $state(false);
  let canNext = $state(true);

  function updateNavState() {
    if (!scrollContainer) return;
    canPrev = scrollContainer.scrollLeft > 5;
    canNext = scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 5;
  }

  function scrollBy(direction: 1 | -1) {
    if (!scrollContainer) return;
    const cardWidth = scrollContainer.querySelector("[data-card]")?.getBoundingClientRect().width ?? 320;
    scrollContainer.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  onMount(() => {
    updateNavState();
    scrollContainer?.addEventListener("scroll", updateNavState, { passive: true });
    return () => scrollContainer?.removeEventListener("scroll", updateNavState);
  });

  function renderStars(rating: number) {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < full) return "full";
      if (i === full && hasHalf) return "half";
      return "empty";
    });
  }
</script>

<section
  id="testimonials"
  class="relative py-14 before:absolute before:inset-0 before:-z-10 before:-skew-y-3 before:border-b before:border-primary/20 sm:py-28 lg:py-36"
>
  <div class="mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8">
    <!-- Left content -->
    <div class="space-y-4 sm:w-1/2 lg:w-1/3">
      <span class="inline-block rounded-full border px-3 py-1 text-sm font-normal">
        Testimonials
      </span>
      <h2 class="text-2xl font-semibold sm:text-3xl lg:text-4xl">
        Customers<br />Feedback
      </h2>
      <p class="text-xl text-muted-foreground">
        Here's how our customers enjoyed our restaurant and the services we offer.
      </p>
      <div class="flex items-center gap-4">
        <button
          onclick={() => scrollBy(-1)}
          disabled={!canPrev}
          class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:bg-primary/10 disabled:text-primary disabled:opacity-100"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onclick={() => scrollBy(1)}
          disabled={!canNext}
          class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:bg-primary/10 disabled:text-primary disabled:opacity-100"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Right: scrollable testimonial cards -->
    <div class="relative max-w-196 sm:w-1/2 lg:w-2/3">
      <div
        bind:this={scrollContainer}
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style="scrollbar-width: none;"
      >
        {#each testimonials as t (t.name)}
          <article
            data-card
            class="snap-start shrink-0 border p-6 space-y-5 transition-colors duration-300 hover:border-primary w-[300px] sm:w-[340px] lg:w-[320px]"
          >
            <div class="flex items-center gap-3">
              <img
                src={asset(t.avatar)}
                alt={t.name}
                class="size-10 rounded-full object-cover"
                loading="lazy"
              />
              <h4 class="flex-1 font-medium">{t.name}</h4>
            </div>

            <!-- Star rating -->
            <div class="flex gap-0.5">
              {#each renderStars(t.rating) as starType}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={starType === "full" ? "#eab308" : "none"}
                  stroke={starType === "empty" ? "#d1d5db" : "#eab308"}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {#if starType === "half"}
                    <defs>
                      <linearGradient id="half-{t.name}">
                        <stop offset="50%" stop-color="#eab308" />
                        <stop offset="50%" stop-color="transparent" />
                      </linearGradient>
                    </defs>
                    <polygon fill="url(#half-{t.name})" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  {:else}
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  {/if}
                </svg>
              {/each}
            </div>

            <p>{t.content}</p>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>