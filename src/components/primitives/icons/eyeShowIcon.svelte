<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "none",
    className,
    containerClass,
  }: IconProps = $props();
</script>

<div
  class={containerClass ?? "flex justify-center w-fit mx-auto rounded-sm p-1.5"}
>
  <svg
    viewBox="0 0 24 24"
    style="enable-background:new 0 0 24 24;"
    stroke="currentColor"
    stroke-width="1.75"
    xml:space="preserve"
    {fill}
    {width}
    {height}
    class={"block shrink-0" + className}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
            9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
</div>
