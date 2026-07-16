<script lang="ts">
  // Placeholder interactive component — Svelte 5 runes
  let count = $state(0);
</script>

<button
  class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  onclick={() => count++}
>
  Clicks: {count}
</button>