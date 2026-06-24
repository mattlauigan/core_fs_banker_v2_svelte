<script lang="ts">
  import Button from "$components/primitives/Button.svelte";
  import type { ButtonProps } from "$lib/ts/components";

  let {
    label = "Button",

    onClick = () => {},
    isLoading = false,
    isReadonly = false,
    isDisabled = false,
    variant = "primary",
    class: customClass = "",
  }: Omit<ButtonProps, "type"> = $props();
</script>

<Button
  type="submit"
  {label}
  {variant}
  class={customClass}
  isDisabled={isLoading || isReadonly || isDisabled}
  {onClick}
/>
