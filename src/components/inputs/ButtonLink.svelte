<script lang="ts">
  import type { ButtonProps } from "$lib/ts/components";

  type buttonLinkProps = {
    label: string;
    route: string;
  } & Omit<ButtonProps, "type" | "onClick">;

  let {
    label = "Button",
    route = "/",
    primary = false,
    isLoading = false,
    isReadonly = false,
    isDisabled = false,
    class: customClass = "",
  }: buttonLinkProps = $props();
</script>

<a
  href={route}
  aria-label={label}
  aria-disabled={isDisabled || isReadonly || isLoading}
  class="_input_button _link text-center {customClass} {primary
    ? '_primary'
    : ''} {customClass}"
>
  {label}
</a>
