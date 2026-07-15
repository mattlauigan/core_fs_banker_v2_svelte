<script lang="ts">
  import Button from "$components/primitives/Button.svelte";
  import type { Component } from "svelte";
  import type {
    DialogWindowProps,
    IconProps,
    ModalActionItem,
  } from "$lib/ts/components";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import { fade } from "svelte/transition";
  import { getModalSetup } from "../../utils/modalConfig";

  let dialogElement: HTMLDialogElement | undefined = $state();
  let {
    title = "Information",
    show = $bindable(false),
    message,
    modalType = ModalTypeEnum.INFO,
    onSubmit = () => {},
  }: DialogWindowProps<IconProps> = $props();

  const setup = $derived(getModalSetup(modalType, onSubmit, close));
  const IconComponent = $derived(setup.Icon as Component<IconProps>);
  const actions = $derived(setup.actions as ModalActionItem[]);

  $effect(() => {
    if (show) dialogElement?.showModal();
    else dialogElement?.close();
  });

  function close() {
    show = false;
    dialogElement?.close();
  }
</script>

{#if show}
  <div
    class="_modal_backdrop"
    onkeydown={close}
    transition:fade
    role="button"
    tabindex="0"
  >
    <dialog bind:this={dialogElement} onclose={close}>
      <div class="_modal_content" transition:fade>
        {#if !!setup.Icon}
          <IconComponent width={48} height={48} />
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
            />
          {/each}
        </div>
      </div>
    </dialog>
  </div>
{/if}
