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
  @import "$css/base/theme.css";

  ._card_container {
    @apply min-h-screen bg-background-c-01  items-center  w-full mx-auto pt-12;
  }
</style>
