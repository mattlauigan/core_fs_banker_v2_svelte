<script lang="ts">
  import type { IconProps } from "$lib/ts/components";

  let {
    width = 24,
    height = 24,
    fill = "#F44336",
    className,
    containerClass,
  }: IconProps = $props();
</script>

<div class="{containerClass ?? "flex justify-center bg-error-bg w-fit mx-auto rounded-sm p-1.5" }">
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
      d="m50 10.938c-21.539 0-39.062 17.523-39.062 39.062s17.523 39.062 39.062 39.062 39.062-17.523 39.062-39.062-17.523-39.062-39.062-39.062zm0 75c-19.812 0-35.938-16.125-35.938-35.938s16.125-35.938 35.938-35.938 35.938 16.125 35.938 35.938-16.125 35.938-35.938 35.938zm3.125-53.125v21.875c0 1.7266-1.3984 3.125-3.125 3.125s-3.125-1.3984-3.125-3.125v-21.875c0-1.7266 1.3984-3.125 3.125-3.125s3.125 1.3984 3.125 3.125zm0 32.812v1.5625c0 1.7266-1.3984 3.125-3.125 3.125s-3.125-1.3984-3.125-3.125v-1.5625c0-1.7266 1.3984-3.125 3.125-3.125s3.125 1.3984 3.125 3.125z"
    />
  </svg>
</div>
