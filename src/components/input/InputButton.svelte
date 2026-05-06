<script lang="ts">
  import type { ButtonProps } from "$lib/ts/components";

  let {
    label = "Button",
    onClick = () => {},
    isPrimary = false,
    isLoading = false,
    isReadonly = false,
    isDisabled = false,
  }: ButtonProps = $props();
</script>

<button
  type="button"
  aria-label={label}
  value={label}
  onclick={onClick}
  disabled={isDisabled || isReadonly || isLoading}
  class="_input_button {isPrimary ? '_primary' : ''}"
>
  {label}
</button>
