<script lang="ts">
  /**
   * Hero section with three synced carousels:
   * - Main image carousel (autoplay 3s, loop)
   * - Thumbnail strip (clickable, horizontally scrollable, syncs main)
   * - Comments carousel (syncs with main)
   */
  import { onMount } from "svelte";
  import { heroSlides, asset } from "../data/site";

  let current = $state(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  const goTo = (i: number) => {
    current = (i + heroSlides.length) % heroSlides.length;
  };

  const next = () => goTo(current + 1);

  onMount(() => {
    timer = setInterval(next, 3000);
    return () => { if (timer) clearInterval(timer); };
  });

  function select(index: number) {
    goTo(index);
    if (timer) clearInterval(timer);
    timer = setInterval(next, 3000);
  }
</script>

<section id="home" class="relative flex-1">
  <div class="mx-auto flex h-full max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
    <!-- Hero header: text + main carousel -->
    <div class="grid grid-cols-1 gap-6 gap-y-12 md:gap-y-16 lg:grid-cols-5">
      <div class="flex w-full flex-col justify-center gap-5 max-lg:items-center lg:col-span-3">
        <h1 class="text-3xl font-semibold leading-tight text-balance max-lg:text-center sm:text-4xl lg:text-5xl">
          Зелень, которая вдохновляет шефов.
        </h1>
        <p class="max-w-xl text-xl text-muted-foreground max-lg:text-center">
          В Шерегеше, на нашей ферме, 365 дней в году созревают возможности для вашей кухни. От
          лимонного базилика для редких десертов до перечной мяты с ледяным ароматом — мы выращиваем
          в 5 минутах от вас то, что раньше было доступно только по предзаказу из столиц.
        </p>
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

      <!-- Main carousel -->
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

    <!-- Bottom row: thumbnails + comments -->
    <div class="grid grid-cols-1 gap-12 md:gap-y-16 lg:grid-cols-5">
      <!-- Thumbnail strip — horizontally scrollable -->
      <div class="relative w-full max-lg:order-2 lg:col-span-3">
        <!-- Fade gradients -->
        <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"></div>

        <div
          class="flex gap-4 overflow-x-auto scroll-smooth pb-2"
          style="scrollbar-width: none;"
        >
          {#each heroSlides as slide, index (slide.id)}
            <button
              onclick={() => select(index)}
              class="relative flex h-32 w-28 shrink-0 items-end justify-center pb-1"
            >
              <!-- Plate frame -->
              <div
                class="absolute inset-x-0 bottom-0 mx-auto w-full {current === index ? 'text-primary' : 'text-border'}"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161 92" fill="none" class="w-full h-auto">
                  <path
                    d="M0.682517 80.6118L0.501193 39.6946C0.480127 34.9409 3.80852 30.8294 8.46241 29.8603L148.426 0.713985C154.636 -0.579105 160.465 4.16121 160.465 10.504V80.7397C160.465 86.2674 155.98 90.7465 150.453 90.7397L10.6701 90.5674C5.16936 90.5607 0.706893 86.1125 0.682517 80.6118Z"
                    stroke="currentColor"
                  />
                </svg>
              </div>
              <img src={asset(slide.img)} alt={slide.imgAlt} class="size-24" loading="lazy" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Comments -->
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
</section>