<script lang="ts">
  import { fade } from "svelte/transition";

  import ButtonLink from "$components/inputs/ButtonLink.svelte";

  type Props = {
    title?: string;
    show?: boolean;
    message: string;

    route: string;
  };

  let {
    title = "Information",
    show = $bindable(false),
    message,
    route = "",
  }: Props = $props();

  function close() {
    show = false;
    dialogElement?.close();
  }

  let dialogElement: HTMLDialogElement | undefined = $state();
</script>

{#if show}
  <div
    class="_modal_backdrop"
    onkeydown={close}
    transition:fade
    role="button"
    tabindex="0"
    style="color:red"
  >
    <dialog class="_dialog_box" bind:this={dialogElement} onclose={close}>
      <div class="_modal_content" transition:fade>
        <h2>{title}</h2>

        <article>
          <p>{message}</p>
        </article>

        <div class="_modal_actions">
          <ButtonLink {route} label="Ok" />
        </div>
      </div>
    </dialog>
  </div>
{/if}
