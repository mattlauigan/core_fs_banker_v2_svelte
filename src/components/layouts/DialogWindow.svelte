<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "$components/primitives/Button.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal-type";
  import type { Component } from "svelte";
  import InfoIcon from "$components/primitives/icons/InfoIcon.svelte";
  import type { IconProps } from "$lib/ts/components";

  type DialogAction = {
    label: string;
    handler: () => void;
    primary?: boolean;
  };

  type DialogWindowProps<T> = {
    title?: string;
    show?: boolean;
    message: string;
    modalType?: ModalTypeEnum;
    onSubmit?: () => void;
    actions?: DialogAction[];
    icon?: (object: T) => Component;
  };

  let {
    title = "Information",
    show = $bindable(false),
    message,
    modalType = ModalTypeEnum.INFO,
    onSubmit = () => {},
    actions = [{ label: "Ok", handler: close }],
    icon = () => InfoIcon,
  }: DialogWindowProps<IconProps> = $props();

  function close() {
    show = false;
    dialogElement?.close();
  }

  const IconComponent = $derived(
    icon?.({
      width: 48,
      height: 48,
      className: "rounded-sm bg-red",
    }),
  );

  let dialogElement: HTMLDialogElement | undefined = $state();

  $effect(() => {
    switch (modalType) {
      case ModalTypeEnum.SUBMIT:
        actions = [
          { label: "Submit", handler: onSubmit, primary: true },
          { label: "Close", handler: close },
        ];
        break;
      case ModalTypeEnum.CONFIRM:
        actions = [
          { label: "Yes", handler: onSubmit, primary: true },
          { label: "No", handler: close },
        ];
        break;
      case ModalTypeEnum.PROCEED:
        actions = [
          { label: "Proceed", handler: onSubmit, primary: true },
          { label: "Cancel", handler: close },
        ];
        break;
      case ModalTypeEnum.DELETE:
        actions = [
          { label: "Delete", handler: onSubmit, primary: true },
          { label: "Cancel", handler: close },
        ];
        break;
      default:
        actions = [{ label: "Ok", handler: onSubmit, primary: true }];
    }

    show ? dialogElement?.showModal() : dialogElement?.close();
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
        {#if IconComponent}
          <IconComponent
            width={48}
            height={48}
            containerClass="bg-gray-300"
            className="bg-red-200"
          />
        {/if}

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
