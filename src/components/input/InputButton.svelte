<script lang="ts">
  type ButtonProps = {
    label?: string;
    isPrimary?: boolean;
    isLoading?: boolean;
    isReadonly?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
  };

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

<style>
  @import "tailwindcss";
  @import "$css/app.css";

  ._input_button {
    @apply px-4 py-2 rounded-md cursor-pointer transition-colors duration-300;
  }

  ._input_button {
    @apply bg-gray-200 text-primary-800 rounded-md hover:bg-primary-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed;
  }

  ._input_button._primary {
    @apply bg-purple-700 text-white hover:bg-primary-300 hover:text-primary-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed;
  }


</style>
