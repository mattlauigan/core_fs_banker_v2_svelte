<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "$components/primitives/Button.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import type { Component } from "svelte";
  import InfoIcon from "$components/primitives/icons/InfoIcon.svelte";
  import type { DialogWindowProps, IconProps } from "$lib/ts/components";
  import { getModalSetup } from "../../utils/modalConfig";

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

  let setup = $derived(getModalSetup(modalType, onSubmit, close));

  $effect(() => {
    if (show) dialogElement?.showModal();
    else dialogElement?.close();
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
        {#if !!setup.Icon}
          <IconComponent class="modal-icon" />
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
