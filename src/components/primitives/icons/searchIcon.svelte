<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#9E9E9E",
    className,
    containerClass,
  }: IconProps = $props();
</script>

<div class="{containerClass ?? "flex justify-center bg-info-bg w-fit mx-auto rounded-sm p-1.5" }">
  <svg
    x="0px"
    y="0px"
    viewBox="0 0 110 110"
    style="enable-background:new 0 0 110 110;"
    xml:space="preserve"
    {fill}
    {width}
    {height}
    class={"block shrink-0" + className}
  >
    <style type="text/css">
      .st0 {
        fill-rule: evenodd;
        clip-rule: evenodd;
      }
    </style>
    <path
      class="st0"
      d="M49.1,19.7c17.9,0,32.4,14.5,32.4,32.4c0,7.9-2.9,15.2-7.6,20.9c0.3,0.1,0.6,0.3,0.9,0.6l17.7,17.7
	c1.1,1.1,1.1,3,0,4.2c-1.1,1.1-3,1.1-4.2,0L70.6,77.7c-0.3-0.3-0.5-0.6-0.6-0.9c-5.6,4.8-12.9,7.6-20.9,7.6
	c-17.9,0-32.4-14.5-32.4-32.4S31.2,19.7,49.1,19.7L49.1,19.7z M49.2,24.5c-15.3,0-27.7,12.4-27.7,27.7s12.4,27.7,27.7,27.7
	s27.7-12.4,27.7-27.7S64.4,24.5,49.2,24.5z"
    />
  </svg>
</div>
