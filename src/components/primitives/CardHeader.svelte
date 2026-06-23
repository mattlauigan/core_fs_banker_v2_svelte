<script lang="ts">
  import { page } from "$app/state";

  type Props = {
    label: string;
  };

  let { label }: Props = $props();
  let scrolled = $state(false);

  const pathArray = page.url.pathname.split("/").filter(Boolean);
  const route = pathArray.at(-1);
  const newPathString = pathArray.slice(1, -1).join("/");

  function handleScroll() {
    scrolled = window.scrollY > 0;
  }
</script>

<svelte:window onscroll={handleScroll} />

<div class="_card_header_wrapper" class:_scrolled={scrolled}>
  <h1 class="_card_header_label">{label}</h1>
  <p class="_card_header_subtitle">
    {newPathString}/<strong>{route}</strong>
  </p>
</div>

<style>
  @import "tailwindcss";

  ._card_header_wrapper {
    @apply sticky top-16 transition-all duration-300 ease-linear px-34 py-2.5;
  }

  ._card_header_wrapper._scrolled {
    @apply bg-slate-50/80 top-12;
  }

  ._card_header_label {
    @apply text-2xl font-semibold text-slate-800 mb-1;
  }

  ._card_header_subtitle {
    @apply text-sm text-slate-500;
  }
</style>
