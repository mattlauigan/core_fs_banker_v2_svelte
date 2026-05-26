<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "$components/inputs/Button.svelte";
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
    message,
    boxState = BoxState.OK,
    onSubmit = () => {},
    actions = [{ label: "Ok", handler: close }],
  }: DialogWindowProps = $props();

  function close() {
    show = false;
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
      actions = [{ label: "Ok", handler: onSubmit, primary: true }];
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
          {#each actions as action}
            <Button
              type="button"
              label={action.label}
              onClick={action.handler}
              primary={action.primary}
            />
          {/each}
        </div>
      </div>
    </dialog>
  </div>
{/if}
