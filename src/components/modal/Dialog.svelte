<script lang="ts">
  import type { Snippet } from 'svelte';

  // Define the prop types
  interface Props {
    show: boolean;
    children: Snippet;
  }

  // Use the interface with $props
  let { show = $bindable(false), children }: Props = $props();
  
  // Explicitly type the HTMLDialogElement
  let dialogElement: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (show) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  });
</script>

<dialog 
  bind:this={dialogElement} 
  onclose={() => (show = false)}
>
  {@render children()}
</dialog>
