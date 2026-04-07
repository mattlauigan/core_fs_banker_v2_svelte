<script lang="ts">
  import type { ToggleSwitchProps } from "$lib/ts/components";

  let {
    name,
    label,

    checked = false,
    disabled = false,
    onCheck,
  }: ToggleSwitchProps = $props();

  function toggle(e: Event) {
    if (disabled) return;
	const target = e.currentTarget as HTMLInputElement;
	onCheck?.(target.checked);
  }
</script>

<div class="flex items-center justify-between gap-3">
  {#if label}
    <label for={name} class="text-sm font-medium text-gray-700">
      {label}
    </label>
  {/if}

  <label class="relative inline-flex items-center cursor-pointer">
    <input
      id={name}
      {name}
      type="checkbox"
      class="sr-only peer"
      bind:checked
      onchange={toggle}
    />

    <!-- track -->
    <div
      class="w-11 h-6 bg-gray-300 rounded-full
			peer-checked:bg-green-400
			transition-colors duration-200"
    ></div>

    <!-- thumb -->
    <div
      class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow
			transition-transform duration-200
			peer-checked:translate-x-5"
    ></div>
  </label>
</div>
