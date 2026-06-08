<script lang="ts">
  import type { ButtonProps } from "$lib/ts/components";

  let {
    label = "Button",
    type = "button",
    onClick = () => {},
    primary = false,
    isLoading = false,
    isReadonly = false,
    isDisabled = false,
    class: customClass = "",
  }: ButtonProps = $props();
</script>

<button
  {type}
  aria-label={label}
  value={label}
  onclick={onClick}
  disabled={isDisabled || isReadonly || isLoading}
  class="_input_button {primary ? '_primary' : ''} {customClass}"
>
  {label}
</button>
