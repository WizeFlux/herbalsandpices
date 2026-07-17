<script lang="ts">
  /**
   * Testimonials carousel — prev/next navigation through customer reviews.
   */
  import { onMount } from "svelte";
  import { testimonials, asset } from "../data/site";
  import Icon from "@iconify/svelte";

  let scrollEl: HTMLElement;
  let canPrev = $state(false);
  let canNext = $state(true);

  function updateNav() {
    if (!scrollEl) return;
    canPrev = scrollEl.scrollLeft > 5;
    canNext = scrollEl.scrollLeft < scrollEl.scrollWidth - scrollEl.clientWidth - 5;
  }

  function scrollBy(dir: 1 | -1) {
    if (!scrollEl) return;
    const w = scrollEl.querySelector("[data-card]")?.getBoundingClientRect().width ?? 320;
    scrollEl.scrollBy({ left: dir * w, behavior: "smooth" });
  }

  onMount(() => {
    updateNav();
    scrollEl?.addEventListener("scroll", updateNav, { passive: true });
    return () => scrollEl?.removeEventListener("scroll", updateNav);
  });

  function stars(rating: number) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) =>
      i < full ? "full" : i === full && half ? "half" : "empty"
    );
  }
</script>

<section id="testimonials">
  <div class="mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8">
    <div class="space-y-4 sm:w-1/2 lg:w-1/3">
      <span class="inline-block rounded-full border px-3 py-1 text-sm font-normal">Testimonials</span>
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

    <div class="relative max-w-196 sm:w-1/2 lg:w-2/3">
      <div
        bind:this={scrollEl}
        class="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style="scrollbar-width: none;"
      >
        {#each testimonials as t (t.name)}
          <article
            data-card
            class="snap-start shrink-0 border p-6 space-y-5 transition-colors duration-300 hover:border-primary w-[300px] sm:w-[340px] lg:w-[320px]"
          >
            <div class="flex items-center gap-3">
              <img src={asset(t.avatar)} alt={t.name} class="size-10 rounded-full object-cover" loading="lazy" />
              <h4 class="flex-1 font-medium">{t.name}</h4>
            </div>

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
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="half-{t.name.replace(/\s/g, '')}">
                        <stop offset="50%" stop-color="#eab308" />
                        <stop offset="50%" stop-color="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                {/if}
              {/each}
            </div>

            <p>{t.content}</p>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>