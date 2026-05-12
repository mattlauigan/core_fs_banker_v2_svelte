<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#2196F3",
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
      d="M55,19.7c-21.1,0-38.3,17.2-38.3,38.3S33.9,96.3,55,96.3S93.3,79.1,93.3,58S76.1,19.7,55,19.7z M55,91.5
	c-18.5,0-33.5-15-33.5-33.5s15-33.5,33.5-33.5s33.5,15,33.5,33.5S73.5,91.5,55,91.5z"
    />
    <path d="M57,50.4h-6v5.1h2v15.2h-2v5.1h8v-5.1h-2V50.4z" />
    <path d="M53,40.2h4v5.1h-4V40.2z" />
  </svg>
</div>
