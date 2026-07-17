<script lang="ts">
  /**
   * Header — fixed top navigation bar.
   *
   * Features:
   * - Sticky positioning (fixed top, z-50, shadow + border)
   * - Active section tracking via IntersectionObserver
   * - Smooth scroll navigation (click → scroll to section)
   * - Mobile hamburger menu (toggle on small screens)
   * - Theme toggle (sun/moon icons, CSS-animated crossfade)
   *
   * Rendered as a Svelte component with client:load in index.astro
   * (needs client-side JS for scroll tracking + theme toggle).
   *
   * Note: The <section> wrapper is NOT here — it's in the page layout.
   * This component only renders the <header> element.
   */
  import { onMount } from "svelte";
  import { navigation } from "../data";
  import Icon from "@iconify/svelte";
  import LogoMark from "./LogoMark.svelte";

  // ── Reactive state ──
  /** Whether the page has been scrolled (currently unused for styling). */
  let isScrolled = $state(false);
  /** Currently visible section id — drives active nav highlighting. */
  let activeSection = $state("");
  /** Mobile menu open/closed state. */
  let mobileOpen = $state(false);
  /** Current theme — synced with localStorage and <html> class. */
  let theme = $state<"light" | "dark">("light");

  // ── Lifecycle: set up observers and event listeners ──
  onMount(() => {
    // Restore theme from localStorage or fall back to system preference
    const stored = localStorage.getItem("theme");
    theme = stored === "light" || stored === "dark"
      ? stored
      : document.documentElement.classList.contains("dark") ? "dark" : "light";

    // Track scroll position (for potential shadow/bg changes)
    const handleScroll = () => (isScrolled = window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // set initial value

    // ── IntersectionObserver: track which section is visible ──
    // Extracts section ids from navigation data (e.g. "#greens" → "greens")
    const sectionIds = navigation.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter to only visible entries
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) { activeSection = ""; return; }
        // Pick the most visible section (highest intersection ratio)
        const best = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a
        );
        activeSection = best.target.id;
      },
      // Multiple thresholds for smoother tracking
      // rootMargin: top offset accounts for fixed header height
      { threshold: [0.1, 0.2, 0.3, 0.4, 0.5], rootMargin: "-100px 0px -50% 0px" }
    );

    // Observe each section element
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  });

  // ── Theme effect: apply to <html> and persist to localStorage ──
  // Runs whenever `theme` changes (including initial restore).
  $effect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  });

  /**
   * Smooth-scroll to a section by anchor href.
   * Accounts for the fixed header height (80px offset).
   * Closes the mobile menu if open.
   */
  function scrollToSection(href: string) {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    mobileOpen = false;
  }
</script>

<!-- ── Header bar: fixed at top, full width, muted background ── -->
<header
  class="fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-400/30 bg-muted shadow-md transition-all duration-300"
>
  <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
    <!-- Logo: clickable link to top of page -->
    <a href="/#home" class="flex items-center gap-3">
      <LogoMark size={32} />
      <span class="text-xl font-semibold text-primary">Травы – Приправы</span>
    </a>

    <!-- ── Desktop navigation (lg+ only) ── -->
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

    <!-- ── Right side: theme toggle, CTA button, mobile menu button ── -->
    <div class="flex items-center gap-3">
      <!-- Theme toggle: sun (dark mode) / moon (light mode).
           CSS classes .theme-icon / .theme-icon-hidden handle the
           crossfade animation (see global.css). -->
      <button
        onclick={() => (theme = theme === "light" ? "dark" : "light")}
        class="relative flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        aria-label="Toggle theme"
      >
        <!-- Sun icon: visible in dark mode (click to switch to light) -->
        <span class="theme-icon {theme === 'light' ? 'theme-icon-hidden' : ''}">
          <Icon icon="lucide:sun" width="16" height="16" />
        </span>
        <!-- Moon icon: visible in light mode (click to switch to dark) -->
        <span class="theme-icon {theme === 'dark' ? 'theme-icon-hidden' : ''}">
          <Icon icon="lucide:moon" width="16" height="16" />
        </span>
      </button>

      <!-- CTA button: scroll to contact section (sm+ only) -->
      <button
        onclick={() => scrollToSection("#contact-us")}
        class="hidden rounded-full bg-primary px-6 py-2 text-base text-primary-foreground transition-colors hover:bg-primary/90 sm:block"
      >
        Контакты
      </button>

      <!-- Mobile menu toggle: hamburger / X icon (lg- only) -->
      <button
        onclick={() => (mobileOpen = !mobileOpen)}
        class="flex size-9 items-center justify-center rounded-full border lg:hidden"
        aria-label="Menu"
      >
        <Icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} width="20" height="20" />
      </button>
    </div>
  </div>

  <!-- ── Mobile dropdown menu (lg- only, toggled by hamburger) ── -->
  {#if mobileOpen}
    <div class="border-t bg-background lg:hidden">
      <ul class="mx-auto max-w-7xl">
        {#each navigation as item (item.title)}
          {@const id = item.href.replace("#", "")}
          {@const active = activeSection === id && activeSection !== ""}
          <li>
            <button
              onclick={() => scrollToSection(item.href)}
              class="block w-full px-4 py-3 text-left text-base transition-colors sm:px-6 {active
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
            class="block w-full px-4 py-3 text-left text-base text-primary sm:px-6"
          >
            Контакты
          </button>
        </li>
      </ul>
    </div>
  {/if}
</header>