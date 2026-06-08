<script lang="ts">
  import { fade } from "svelte/transition";
  import Button from "$components/primitives/Button.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import type { Component } from "svelte";
  import type { DialogWindowProps, IconProps } from "$lib/ts/components";
  import { getModalSetup } from "../../utils/modalConfig";

  let {
    title = "Information",
    show = $bindable(false),
    message,
    modalType = ModalTypeEnum.INFO,
    onSubmit = () => {},
    actions = [{ label: "Ok", handler: close }],
  }: DialogWindowProps<IconProps> = $props();

  function close() {
    show = false;
    dialogElement?.close();
  }

  let dialogElement: HTMLDialogElement | undefined = $state();

  const setup = $derived(getModalSetup(modalType, onSubmit, close));

  const IconComponent = $derived(setup.Icon as Component<IconProps>);

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
              primary={action.primary}
            />
          {/each}
        </div>
      </div>
    </dialog>
  </div>
{/if}
