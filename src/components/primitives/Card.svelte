<script lang="ts">
  import type { Snippet } from "svelte";

  type Props = {
    className?: string;
    children: Snippet;
  };

  let { children, className }: Props = $props();
</script>

<div class={className || "_card_wrapper"}>
  {@render children()}
</div>

<style>
  @import "tailwindcss";

  ._card_wrapper {
    @apply px-32;
  }
</style>
