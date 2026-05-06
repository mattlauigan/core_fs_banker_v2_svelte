<script lang="ts">
  // import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import InputButton from "$components/input/InputButton.svelte";
  import { BoxState } from "$lib/ts/enum";

  type DialogAction = {
    label: string;
    handler: () => void;
    primary?: boolean;
  };

  type DialogWindowProps = {
    title?: string;
    show?: boolean;
    message: string;
    boxState?: BoxState;
    onSubmit?: () => void;
    actions?: DialogAction[];
  };

  let {
    title = "Information",
    show = $bindable(false),
    message = $bindable("This is a dialog message."),
    boxState = $bindable(BoxState.OK),
    onSubmit = $bindable(() => {}),
    actions = [{ label: "Ok", handler: close }],
  }: DialogWindowProps = $props();

  function close() {
    dialogElement?.close();
  }

  let dialogElement: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (boxState === "submit") {
      actions = [
        { label: "Submit", handler: onSubmit, primary: true },
        { label: "Close", handler: close },
      ];
    } else if (boxState === "confirm") {
      actions = [
        { label: "Yes", handler: onSubmit, primary: true },
        { label: "No", handler: close },
      ];
    } else if (boxState === "proceed") {
      actions = [
        { label: "Proceed", handler: onSubmit, primary: true },
        { label: "Cancel", handler: close },
      ];
    } else {
      actions = [{ label: "Ok", handler: close }];
    }

    if (show) {
      dialogElement?.showModal();
    } else {
      dialogElement?.close();
    }
  });
</script>

{#if show}
  <div
    class="_modal_backdrop"
    onkeydown={close}
    role="button"
    tabindex="0"
  >
    <dialog bind:this={dialogElement} onclose={() => (show = false)}>
      <div class="_modal_content" transition:fade>
        <h2>{title}</h2>

        <article>
          <p>{message}</p>
        </article>

        <div class="_modal_actions">
          {#each actions as action}
            <InputButton
              label={action.label}
              onClick={action.handler}
              isPrimary={action.primary}
            />
          {/each}
        </div>
      </div>
    </dialog>
  </div>
{/if}

<!-- <style>
@import "$css/DialogWindow.css";
</style> -->
