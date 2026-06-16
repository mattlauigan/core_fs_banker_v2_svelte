<script lang="ts">
  import { page } from "$app/state";

  type Props = {
    label: string;
  };

  let { label }: Props = $props();

  console.log(page.url.pathname);

  const pathArray = page.url.pathname.split("/").filter(Boolean);

  const route = pathArray.at(-1);

  const newPathString = pathArray.slice(1, -1).join("/");
</script>

<fragment>
  <h1 class="_card_label">{label}</h1>
  <p class="_card_subtitle">
    {newPathString}/<strong>{route}</strong>
  </p>
</fragment>

<style>
  @import "tailwindcss";

  ._card_label {
    @apply text-2xl font-semibold text-slate-800 mb-1;
  }

  ._card_subtitle {
    @apply text-sm text-slate-500 mb-5;
  }
</style>
