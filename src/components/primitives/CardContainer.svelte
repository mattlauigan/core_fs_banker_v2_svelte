<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  let { children }: Props = $props();
</script>

<div class="_card_container">
  {@render children()}
</div>

<style>
  @import "tailwindcss";

  ._card_container {
    @apply min-h-screen bg-slate-100 flex-col items-center justify-center w-full font-sans mx-auto;
  }
</style>
