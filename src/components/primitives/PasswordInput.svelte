<script lang="ts">
  import type { TextInputProps } from "$lib/ts/components";

  let {
    id,
    name,
    label,
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
    show = false,
  }: Omit<TextInputProps, "type"> & { show?: Boolean } = $props();

  function toggle() {
    show = !show;
  }
</script>

<div class="relative {style ? style : 'w-full'} max-w-sm">
  <div class="relative my-10">
    <input
      type={show ? "text" : "password"}
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
      class="peer h-12 w-full border-b border-accent-002 bg-transparent text-[12px] tracking-[1.5px] text-scripts focus:text-accent-002  outline-none transition-colors duration-300 focus:border-primary-700 pl-1.5 disabled:border-accent-002 disabled:text-accent-002 disabled:cursor-not-allowed disabled:bg-linear-to-b disabled:from-transparent disabled:to-gray-200 aria-invalid:border-error-text"
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

  <button
    type="button"
    onclick={toggle}
    aria-label={show ? "Hide password" : "Show password"}
    class="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400
           transition hover:text-zinc-700 focus:outline-none focus-visible:ring-2
           focus-visible:ring-indigo-400 focus-visible:ring-offset-1
           dark:hover:text-zinc-200"
  >
    {#if show}
      <!-- Eye-off icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.75"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 3l18 18M10.477 10.477A3 3 0 0013.5 13.5M6.346 6.346A9.96 9.96 0 003.1 12
             c1.272 3.575 4.674 6 8.9 6a9.96 9.96 0 005.654-1.746M9 9a3 3 0 014.243 4.243
             M17.654 17.654A9.96 9.96 0 0020.9 12c-1.272-3.575-4.674-6-8.9-6a9.96 9.96 0
             00-2.654.346"
        />
      </svg>
    {:else}
      <!-- Eye icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.75"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943
             9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    {/if}
  </button>
</div>
