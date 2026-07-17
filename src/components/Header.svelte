<script lang="ts">
  /**
   * Sticky header with scroll-aware bg, active-section tracking,
   * smooth scroll nav, mobile menu, and theme toggle.
   */
  import { onMount } from "svelte";
  import { navigation } from "../data/site";
  import Icon from "@iconify/svelte";
  import LogoMark from "./LogoMark.svelte";

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
  class="fixed inset-x-0 top-0 z-50 h-16 border border-primary/20 bg-muted shadow-md transition-all duration-300"
>
  <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
    <!-- Logo -->
    <a href="/#home" class="flex items-center gap-3">
      <LogoMark size={32} />
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