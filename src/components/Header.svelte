<script lang="ts">
  /**
   * Sticky header with scroll-aware bg, active-section tracking,
   * smooth scroll nav, mobile menu, and theme toggle.
   */
  import { onMount } from "svelte";
  import { navigation } from "../data/site";
  import Icon from "@iconify/svelte";

  let isScrolled = $state(false);
  let activeSection = $state("");
  let mobileOpen = $state(false);
  let theme = $state<"light" | "dark">("light");

  onMount(() => {
    const stored = localStorage.getItem("theme");
    theme = stored === "light" || stored === "dark"
      ? stored
      : document.documentElement.classList.contains("dark") ? "dark" : "light";

    const handleScroll = () => (isScrolled = window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const sectionIds = navigation.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) { activeSection = ""; return; }
        const best = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a
        );
        activeSection = best.target.id;
      },
      { threshold: [0.1, 0.2, 0.3, 0.4, 0.5], rootMargin: "-100px 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  });

  $effect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  });

  function scrollToSection(href: string) {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    mobileOpen = false;
  }
</script>

<header
  class="fixed inset-x-0 top-0 z-50 h-16 border-b transition-all duration-300 {isScrolled ? 'bg-background shadow-md' : ''}"
>
  <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
    <!-- Logo -->
    <a href="/#home" class="flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="16" transform="matrix(1 0 0 -1 0 32)" fill="var(--primary)" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.6335 9.37402C12.4778 9.37402 14.145 10.1271 15.3467 11.3418L11.8436 14.8456C10.6136 14.0151 8.62354 14.2897 7.48627 17.2828C7.42492 17.4438 7.36357 17.6049 7.30222 17.7659C7.03765 18.4622 7.17875 19.1777 7.67952 19.6785C8.18029 20.1785 8.89578 20.3196 9.59133 20.055L10.0752 19.8717C13.0683 18.7345 13.3429 16.7444 12.5123 15.5144L15.964 12.0627C17.1427 10.884 17.9019 10.0979 19.5499 9.62786C20.1289 9.46298 20.7401 9.37402 21.372 9.37402C25.0338 9.37402 28.0016 12.3426 28.0016 16.0044C28.0016 19.6662 25.0338 22.634 21.372 22.634C19.5545 22.634 17.908 21.9024 16.7102 20.7183L19.961 17.4683C20.237 17.6302 20.5515 17.7007 20.8919 17.6754C21.3804 17.6386 21.7869 17.4139 22.0768 17.019L24.9456 13.1217L24.7892 12.9653L21.8375 15.9162C21.7884 15.966 21.7071 15.966 21.658 15.9162C21.609 15.8671 21.609 15.7858 21.658 15.7368L24.6097 12.7851L24.382 12.5581L21.4311 15.5098C21.3812 15.5588 21.3007 15.5588 21.2508 15.5098C21.2018 15.4599 21.2018 15.3794 21.2508 15.3295L24.2025 12.3779L23.9748 12.1509L21.0238 15.1026C20.974 15.1516 20.8935 15.1516 20.8436 15.1026C20.7945 15.0527 20.7945 14.9722 20.8436 14.9223L23.7953 11.9714L23.6473 11.8234C23.5906 11.8556 23.5346 11.8917 23.4809 11.9308L19.7416 14.6831C19.3467 14.9737 19.122 15.3794 19.0852 15.8679C19.0591 16.2084 19.1297 16.5228 19.2922 16.7996L16.086 20.0059C15.0614 20.953 14.3168 21.6915 13.0177 22.1923C12.2784 22.4776 11.474 22.634 10.6335 22.634C6.97246 22.634 4.00391 19.6662 4.00391 16.0044C4.00391 12.3426 6.97246 9.37402 10.6335 9.37402Z"
          fill="var(--primary-foreground)"
        />
      </svg>
      <span class="text-xl font-semibold text-primary">Травы – Приправы</span>
    </a>

    <!-- Desktop nav -->
    <nav class="hidden lg:block">
      <ul class="flex gap-0">
        {#each navigation as item (item.title)}
          {@const id = item.href.replace("#", "")}
          {@const active = activeSection === id && activeSection !== ""}
          <li>
            <button
              onclick={() => scrollToSection(item.href)}
              class="rounded-full px-3 py-1.5 text-base font-normal transition-colors duration-200 {active
                ? 'bg-primary/5 text-primary dark:bg-primary/10'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10'}"
            >
              {item.title}
            </button>
          </li>
        {/each}
      </ul>
    </nav>

    <div class="flex items-center gap-3">
      <!-- Theme toggle: single CSS animation drives both icons -->
      <button
        onclick={() => (theme = theme === "light" ? "dark" : "light")}
        class="relative flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        aria-label="Toggle theme"
      >
        <span class="theme-icon {theme === 'light' ? 'theme-icon-hidden' : ''}">
          <Icon icon="lucide:sun" width="16" height="16" />
        </span>
        <span class="theme-icon {theme === 'dark' ? 'theme-icon-hidden' : ''}">
          <Icon icon="lucide:moon" width="16" height="16" />
        </span>
      </button>

      <button
        onclick={() => scrollToSection("#contact-us")}
        class="hidden rounded-full bg-primary px-6 py-2 text-base text-primary-foreground transition-colors hover:bg-primary/90 sm:block"
      >
        Контакты
      </button>

      <button
        onclick={() => (mobileOpen = !mobileOpen)}
        class="flex size-9 items-center justify-center rounded-full border lg:hidden"
        aria-label="Menu"
      >
        <Icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} width="20" height="20" />
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  {#if mobileOpen}
    <div class="border-t bg-background lg:hidden">
      <ul class="mx-auto max-w-7xl px-4 sm:px-6">
        {#each navigation as item (item.title)}
          {@const id = item.href.replace("#", "")}
          {@const active = activeSection === id && activeSection !== ""}
          <li>
            <button
              onclick={() => scrollToSection(item.href)}
              class="block w-full py-3 text-left text-base transition-colors {active
                ? 'bg-primary/10 font-medium text-primary'
                : 'text-foreground hover:bg-primary/10 hover:text-primary'}"
            >
              {item.title}
            </button>
          </li>
        {/each}
        <li>
          <button
            onclick={() => scrollToSection("#contact-us")}
            class="block w-full py-3 text-left text-base text-primary"
          >
            Контакты
          </button>
        </li>
      </ul>
    </div>
  {/if}
</header>