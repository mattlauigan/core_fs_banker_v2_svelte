<script lang="ts">
  import type { Snippet } from "svelte";

  type props = {
    children: Snippet;
  };

  let { children } = $props();
</script>

<div class="_card_container">
  {@render children()}
</div>

<style>
  @import "tailwindcss";

  ._card_container {
    @apply relative min-h-screen bg-slate-100 flex-col items-center justify-center p-8 font-sans overflow-hidden w-[90vw] mx-auto;
  }
</style>
