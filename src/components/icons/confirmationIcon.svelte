<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#4CAF50",
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
    <g>
      <path
        d="M78.9,40.1L44.9,74l-13-13c-0.4-0.4-1.1-0.4-1.5,0c-0.4,0.4-0.4,1.1,0,1.5l13.8,13.8c0.2,0.2,0.5,0.3,0.7,0.3
		c0.3,0,0.5-0.1,0.7-0.3c0,0,0-0.1,0.1-0.1c0,0,0.1,0,0.1-0.1l34.5-34.5c0.4-0.4,0.4-1.1,0-1.5C79.9,39.7,79.3,39.7,78.9,40.1z"
      />
      <path
        d="M55.4,19.9c-21.1,0-38.3,17.2-38.3,38.3s17.2,38.3,38.3,38.3s38.3-17.2,38.3-38.3S76.5,19.9,55.4,19.9z M55.4,94.4
		c-19.9,0-36.2-16.2-36.2-36.2S35.4,22,55.4,22s36.2,16.2,36.2,36.2S75.3,94.4,55.4,94.4z"
      />
    </g>
  </svg>
</div>
