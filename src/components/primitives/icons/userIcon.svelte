<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#3F51B5",
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
      d="M19.1,94.8c0,0.8,0.7,1.4,1.4,1.4c0.8,0,1.4-0.7,1.4-1.4c0-18.2,14.7-32.9,32.9-32.9s32.9,14.7,32.9,32.9
	c0,0.8,0.7,1.4,1.4,1.4c0.8,0,1.4-0.7,1.4-1.4c0-16.7-11.6-30.9-27.2-34.8C71,56.7,76,49.4,76,40.8c0-11.6-9.5-21-21-21
	s-21,9.5-21,21c0,8.5,5.1,15.9,12.4,19.2C30.7,63.9,19.1,78,19.1,94.8z M36.8,40.8c0-10,8.1-18.2,18.2-18.2s18.2,8.1,18.2,18.2
	S65,59,55,59S36.8,50.8,36.8,40.8z"
    />
  </svg>
</div>
