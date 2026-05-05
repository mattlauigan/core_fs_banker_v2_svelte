<script lang="ts">
  // import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import InputButton from "$components/input/InputButton.svelte";

  type DialogWindowProps = {
    title?: string;
    show?: boolean;
    message?: string | null;
    isSubmit?: boolean;
    isConfirm?: boolean;
    onSubmit?: () => void;
  };

  // type DialogAction = {
  //   label: string;
  //   handler: () => void;
  //   primary?: boolean;
  // };

  let {
    title = "Information",
    show = false,
    message = null,
    isSubmit = false,
    isConfirm = false,
    onSubmit = () => {},
  }: DialogWindowProps = $props();
  // let actions = [];

  function close() {
    dialogElement?.close();
  }

  // if (isSubmit === true) {
  //   actions = [
  //     { label: "Submit", handler: onSubmit, primary: true },
  //     { label: "Close", handler: close },
  //   ];
  // } else if (isConfirm) {
  //   actions = [
  //     { label: "Yes", handler: onSubmit, primary: true },
  //     { label: "No", handler: close }, // probably should close, not submit
  //   ];
  // } else {
  //   actions = [{ label: "Ok", handler: close }];
  // }

  let dialogElement: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (show) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  });
</script>

{#if show}
  <div
    class="_modal-backdrop"
    onkeydown={close}
    transition:fade
    role="button"
    tabindex="0"
  >
    <dialog bind:this={dialogElement} onclose={() => (show = false)}>
      <div class="_modal-content" transition:fade>
        <h2>{title}</h2>

        <article>
          {#if message !== null}
            <p>{message}</p>
          {:else}
            <p>There seems to be a problem</p>
          {/if}
        </article>

        <div class="_modal-actions">
          <!-- {#each actions as action}
  <InputButton
    label={action.label}
    onClick={action.handler}
    isPrimary={action.primary}
  /> -->
          {#if isSubmit}
            <InputButton label="Submit" onClick={onSubmit} isPrimary />
            <InputButton label="Close" onClick={close} />
          {:else if isConfirm}
            <InputButton label="Yes" onClick={onSubmit} isPrimary />
            <InputButton label="No" onClick={onSubmit} />
          {:else}
            <InputButton label="Ok" onClick={close} />
          {/if}
        </div>
      </div>
    </dialog>
  </div>
{/if}

<!-- <style>
@import "$css/DialogWindow.css";
</style> -->
