<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  type DialogWindowProps = {
    title?: string;
    show?: boolean;
    message?: string | null;
    isSubmit?: boolean;
    onSubmit?: () => void;
  };

  let {
    title = "Information",
    show = false,
    message = null,
    isSubmit = false,
    onSubmit = () => {},
  }: DialogWindowProps = $props();

  const dispatch = createEventDispatcher();

  function close() {
    dispatch("close");
  }
</script>

{#if show}
  <div
    class="_modal-backdrop"
    onkeydown={(e) => (e.key === "Enter" || e.key === " " ? close() : null)}
    transition:fade
    role="button"
    tabindex="0"
  >
    <div class="_modal-content" transition:fade>
      <h2>{title}</h2>
      {#if message !== null}
        <p>{message}</p>
      {:else}
        <p>There seems to be a problem</p>
      {/if}

      {#if isSubmit}
        <button onclick={() => onSubmit()}>Submit</button>
        <button onclick={close}>Close</button>
      {:else}
        <button onclick={close}>Ok</button>
      {/if}
    </div>
  </div>
{/if}

<!-- <style>
@import "$css/DialogWindow.css";
</style> -->