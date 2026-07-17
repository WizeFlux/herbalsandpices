<script lang="ts">
  /**
   * Hero section — three synced carousels at the top of the page.
   *
   * Architecture:
   * 1. Main image carousel — auto-advances every 3s, loops infinitely
   * 2. Thumbnail strip — clickable, horizontally scrollable, syncs with main
   * 3. Comments display — shows the comment for the current slide
   *
   * All three are driven by a single `current` state variable.
   * When `current` changes, the main carousel slides, the thumbnail strip
   * auto-scrolls to center the active item, and the comment text updates.
   *
   * The <section> wrapper is in HeroSectionWrapper.astro (needed for
   * CSS nth-of-type — Svelte client:load wraps content in <astro-island>
   * which breaks nth-child but not nth-of-type).
   *
   * Rendered with client:load (needs JS for autoplay + interactions).
   */
  import { onMount } from "svelte";
  import { heroSlides, asset } from "../data";
  import PlateFrame from "./PlateFrame.svelte";

  // ── State ──
  /** Index of the currently displayed slide (0-based). */
  let current = $state(0);
  /** Autoplay timer handle — stored so we can reset it on user interaction. */
  let timer: ReturnType<typeof setInterval> | null = null;
  /** Reference to the thumbnail scroll container (for auto-scroll). */
  let thumbStrip: HTMLElement;
  /** References to each thumbnail button (for scroll-to-center calculation). */
  let thumbButtons: HTMLElement[] = [];

  /**
   * Navigate to a specific slide index with wrap-around.
   * (e.g. goTo(8) with 8 slides → wraps to 0)
   */
  const goTo = (i: number) => {
    current = (i + heroSlides.length) % heroSlides.length;
  };

  /** Advance to the next slide (used by autoplay timer). */
  const next = () => goTo(current + 1);

  // ── Lifecycle: start autoplay ──
  onMount(() => {
    timer = setInterval(next, 3000);
    return () => { if (timer) clearInterval(timer); };
  });

  // ── Auto-scroll thumbnail strip when `current` changes ──
  // Uses a custom requestAnimationFrame easing (easeInOutCubic, 600ms)
  // instead of native scrollBy({ behavior: "smooth" }) for more
  // control and a buttery feel.
  $effect(() => {
    const btn = thumbButtons[current];
    if (!btn || !thumbStrip) return;

    // Calculate the scroll position that centers the active thumbnail
    const stripRect = thumbStrip.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const targetScrollLeft = thumbStrip.scrollLeft
      + (btnRect.left - stripRect.left)    // distance from strip start
      - stripRect.width / 2                 // center of strip
      + btnRect.width / 2;                  // adjust for button width

    smoothScrollTo(thumbStrip, targetScrollLeft, 600);
  });

  /**
   * Smoothly scroll an element to a target scrollLeft position
   * using requestAnimationFrame and easeInOutCubic easing.
   *
   * @param el        — The scrollable element
   * @param target    — Target scrollLeft value in pixels
   * @param duration  — Animation duration in milliseconds
   */
  function smoothScrollTo(el: HTMLElement, target: number, duration: number) {
    const start = el.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    /** easeInOutCubic: slow start, fast middle, slow end */
    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /** Animation frame callback — advances scroll position */
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + distance * easeInOutCubic(progress);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /**
   * User clicked a thumbnail — jump to that slide and reset the
   * autoplay timer so it doesn't advance immediately after.
   */
  function select(index: number) {
    goTo(index);
    if (timer) clearInterval(timer);
    timer = setInterval(next, 3000);
  }
</script>

<!-- ── Hero content (no <section> here — wrapper handles it) ── -->
<div class="flex h-full flex-col gap-16">
    <!-- ── Top row: marketing text + main image carousel ── -->
    <div class="grid grid-cols-1 gap-6 gap-y-12 md:gap-y-16 lg:grid-cols-5">
      <!-- Left column: heading, description, CTA buttons -->
      <div class="flex w-full flex-col justify-center gap-5 max-lg:items-center lg:col-span-3">
        <h1 class="text-3xl font-semibold leading-tight text-balance max-lg:text-center sm:text-4xl lg:text-5xl">
          Зелень, которая вдохновляет шефов.
        </h1>
        <p class="max-w-xl text-xl text-muted-foreground max-lg:text-center">
          В Шерегеше, на нашей ферме, 365 дней в году созревают возможности для вашей кухни. От
          лимонного базилика для редких десертов до перечной мяты с ледяным ароматом — мы выращиваем
          в 5 минутах от вас то, что раньше было доступно только по предзаказу из столиц.
        </p>
        <!-- CTA buttons: primary (filled) + secondary (outline) -->
        <div class="flex items-center gap-3.5">
          <a href="#greens" class="group rounded-full bg-primary px-6 py-2.5 text-base text-primary-foreground transition-colors hover:bg-primary/90">
            Травы
            <span class="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#microgreens" class="group rounded-full bg-primary px-6 py-2.5 text-base text-primary-foreground transition-colors hover:bg-primary/90">
            Микрозелень
            <span class="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
          <a href="#contact-us" class="rounded-full bg-primary/10 px-6 py-2.5 text-base text-primary transition-colors hover:bg-primary/20">
            Контакты
          </a>
        </div>
      </div>

      <!-- Right column: main image carousel.
           Uses CSS transform translateX to slide between images.
           The flex container is wider than its parent; each image
           takes 100% width with shrink-0. -->
      <div class="relative w-full overflow-hidden lg:col-span-2">
        <div
          class="flex transition-transform duration-500 ease-out"
          style="transform: translateX(-{current * 100}%)"
        >
          {#each heroSlides as slide (slide.id)}
            <div class="flex w-full shrink-0 items-center justify-center">
              <img src={asset(slide.img)} alt={slide.imgAlt} class="size-95 object-contain" loading="lazy" />
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- ── Bottom row: thumbnail strip + comments ── -->
    <div class="grid grid-cols-1 gap-12 md:gap-y-16 lg:grid-cols-5">
      <!-- Thumbnail strip — horizontally scrollable, auto-centers active item.
           min-w-0 allows the flex container to shrink within the grid cell.
           Fade gradients on left/right edges for a polished look. -->
      <div class="relative w-full min-w-0 max-lg:order-2 lg:col-span-3">
        <!-- Left edge fade -->
        <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"></div>
        <!-- Right edge fade -->
        <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"></div>

        <!-- Scrollable thumbnail container.
             scrollbar-width: none hides the scrollbar (Webkit needs
             a separate ::-webkit-scrollbar rule, omitted for brevity).
             -webkit-overflow-scrolling: touch enables momentum on iOS. -->
        <div
          bind:this={thumbStrip}
          class="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style="scrollbar-width: none; -webkit-overflow-scrolling: touch;"
        >
          {#each heroSlides as slide, index (slide.id)}
            <!-- Each thumbnail: plate frame (z-0) behind image (z-1).
                 Active frame uses text-primary, inactive uses text-border. -->
            <button
              bind:this={thumbButtons[index]}
              onclick={() => select(index)}
              class="relative flex h-32 w-28 shrink-0 items-end justify-center pb-1"
            >
              <!-- Plate frame: decorative SVG behind the food image -->
              <div
                class="absolute inset-x-0 bottom-0 mx-auto w-full z-0 {current === index ? 'text-primary' : 'text-border'}"
              >
                <PlateFrame class="w-full h-auto" />
              </div>
              <!-- Food image: sits on top of the plate frame -->
              <img src={asset(slide.img)} alt={slide.imgAlt} class="size-24 relative z-1" loading="lazy" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Comments: shows the current slide's testimonial text.
           A vertical accent bar separates it from thumbnails (sm+). -->
      <div class="flex w-full items-center justify-center lg:col-span-2">
        <div class="flex h-full min-h-14 w-full items-center justify-center gap-4 px-6">
          <div class="hidden h-6 w-0.5 rounded-full bg-primary sm:block"></div>
          <p class="text-card-foreground">
            {heroSlides[current]?.comment}
          </p>
        </div>
      </div>
    </div>
  </div>