<script lang="ts">
  import type { ButtonProps } from "$lib/ts/components";

  let {
    label = "Button",
    type = "button",
    onClick = () => {},
    isLoading = false,
    isReadonly = false,
    isDisabled = false,
    variant,
    class: customClass = "",
  }: ButtonProps = $props();
</script>

<button
  {type}
  aria-label={label}
  value={label}
  onclick={onClick}
  disabled={isDisabled || isReadonly || isLoading}
  class="_input_button {variant && `_btn_${variant}`} {customClass}"
>
  {label}
</button>
