<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#FF9800",
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
      d="M51.2,19.2c1.7-3,6.1-3,7.8,0l39,67.5c1.7,3-0.4,6.8-3.9,6.8h-78c-3.5,0-5.6-3.8-3.9-6.8L51.2,19.2z M57.1,20.3
	c-0.9-1.5-3-1.5-3.9,0l-39,67.5c-0.9,1.5,0.2,3.4,1.9,3.4h78c1.7,0,2.8-1.9,1.9-3.4L57.1,20.3z M53.8,77.3V75c0-0.6,0.5-1.1,1.1-1.1
	c0.6,0,1.1,0.5,1.1,1.1v2.3c0,0.6-0.5,1.1-1.1,1.1C54.3,78.4,53.8,77.9,53.8,77.3z M53.8,67.1V44.6c0-0.6,0.5-1.1,1.1-1.1
	c0.6,0,1.1,0.5,1.1,1.1v22.5c0,0.6-0.5,1.1-1.1,1.1C54.3,68.3,53.8,67.7,53.8,67.1z"
    />
  </svg>
</div>
