<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#607D8B",
    className = "",
    containerClassName = "",
  }: IconProps = $props();
</script>

<div class={containerClassName}>
  <svg
    x="0px"
    y="0px"
    viewBox="-5 -8 110 110"
    style="enable-background:new 0 0 110 110;"
    xml:space="preserve"
    {fill}
    {width}
    {height}
    class={"block shrink-0" + className}
  >
    <path
      d="M96.8,55.7L77.9,22.1c-0.8-1.4-2.3-2.3-4-2.3H36.1c-1.7,0-3.2,0.9-4,2.3L13.2,55.7c-0.8,1.4-0.8,3.1,0,4.5l18.9,33.7
	c0.8,1.4,2.3,2.3,4,2.3h37.7c1.7,0,3.2-0.9,4-2.3l18.9-33.7C97.6,58.9,97.6,57.1,96.8,55.7z M94.2,58.7L75.2,92.4
	c-0.3,0.5-0.8,0.8-1.3,0.8H36.1c-0.6,0-1.1-0.3-1.3-0.8L15.8,58.7c-0.3-0.5-0.3-1,0-1.5l18.9-33.7c0.3-0.5,0.8-0.8,1.3-0.8h37.7
	c0.6,0,1.1,0.3,1.3,0.8l18.9,33.7C94.4,57.7,94.4,58.3,94.2,58.7z"
    />
    <path
      d="M55,42.2c-8.7,0-15.8,7.1-15.8,15.8c0.9,21,30.7,20.9,31.6,0C70.8,49.3,63.7,42.2,55,42.2z M55,70.6
	c-7,0-12.6-5.7-12.6-12.6c0.7-16.8,24.6-16.8,25.3,0C67.6,65,62,70.6,55,70.6L55,70.6z"
    />
  </svg>
</div>
