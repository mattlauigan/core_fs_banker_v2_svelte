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
      d="M3 3l18 18M10.477 10.477A3 3 0 0013.5 13.5M6.346 6.346A9.96 9.96 0 003.1 12
            c1.272 3.575 4.674 6 8.9 6a9.96 9.96 0 005.654-1.746M9 9a3 3 0 014.243 4.243
            M17.654 17.654A9.96 9.96 0 0020.9 12c-1.272-3.575-4.674-6-8.9-6a9.96 9.96 0
            00-2.654.346"
    />
  </svg>
</div>
