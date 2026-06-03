<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    show: boolean;
    children: Snippet;
  }

  let { show = $bindable(false), children }: Props = $props();

  let dialogElement: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (show) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  });
</script>

<dialog bind:this={dialogElement} onclose={() => (show = false)}>
  {@render children()}
</dialog>
