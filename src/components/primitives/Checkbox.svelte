<script lang="ts">
  import type { CheckboxProps } from "$lib/ts/components";
  import { CheckBoxEnum } from "$lib/ts/enums/primitives";

  let {
    id = `chk-${Math.random().toString(36).slice(2, 8)}`,
    label = "Checkbox 1",
    checked = false,
    indeterminate = false,
    disabled = false,
    size = "md",
    variant,
    change,
  }: CheckboxProps & { variant?: keyof typeof CheckBoxEnum } = $props();

  function handleToggle() {
    change?.({ checked });
  }

  let inputEl: HTMLInputElement;
  $effect(() => {
    if (inputEl) inputEl.indeterminate = indeterminate;
  });
</script>

<label
  class="_checkbox_wrapper _size-{size} {variant === CheckBoxEnum.right
    ? 'flex-row-reverse'
    : 'inline-flex'}"
  class:_disabled={disabled}
  for={id}
>
  <span
    class="_checkbox_track"
    class:_checked={checked}
    class:_indeterminate={indeterminate}
    class:_disabled={disabled}
  >
    <input
      type="checkbox"
      bind:this={inputEl}
      {id}
      bind:checked
      onchange={handleToggle}
      class:_disabled={disabled}
      class="sr-only"
    />

    <svg
      class="_checkbox_icon"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      {#if indeterminate}
        <line
          x1="2.5"
          y1="6"
          x2="9.5"
          y2="6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      {:else}
        <polyline
          points="2,6 5,9 10,3"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      {/if}
    </svg>
  </span>

  {#if label}
    <span class="_label_text">{label}</span>
  {/if}
</label>
