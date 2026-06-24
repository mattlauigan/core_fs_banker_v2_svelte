<script lang="ts">
  import type { TextInputProps } from "$lib/ts/components";

  let {
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    style = "",
    value = $bindable(""),
    max,
    maxlength = 20,
    min,
    minlength = 1,
    required = false,
    readonly = false,
    disabled = false,
    hasError = false,
  }: TextInputProps = $props();
</script>

<div class="relative my-10 {style ? style : 'w-full'}">
  <input
    {type}
    {id}
    {name}
    {placeholder}
    {disabled}
    {readonly}
    {max}
    {maxlength}
    {min}
    {minlength}
    bind:value
    aria-invalid={hasError}
    class="peer h-12 w-full border-b border-accent-002 bg-transparent text-[12px] tracking-[1.5px] text-accent-002 focus:text-accent-002 outline-none transition-colors duration-300 focus:border-primary-700 pl-1.5 disabled:border-accent-002 disabled:text-accent-002 disabled:cursor-not-allowed disabled:bg-linear-to-b disabled:from-transparent disabled:to-gray-200 aria-invalid:border-error-text"
  />

  <label
    for={name}
    aria-invalid={hasError}
    class="pointer-events-none absolute left-0 top-1.5 text-[12px] tracking-[1.5px] text-accent-003 transition-all duration-300 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:text-[12px] peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-primary-700 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[11px] aria-invalid:text-error-text"
    >{label.toLocaleUpperCase()}
    {#if !required}
      <span
        aria-invalid={hasError}
        class="text-gray-400 text-[10px] tracking-[1.5px] aria-invalid:text-error-hover"
      >
        (optional)
      </span>
    {/if}
  </label>
</div>
