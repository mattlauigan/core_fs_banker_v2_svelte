<script lang="ts">
  import "./layout.css";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import Header from "../components/layouts/Header.svelte";
  import { AuthPath } from "$lib/ts/enums/path/auth";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import { authStore, registrationStore } from "$stores/authStore";
  import { utilCore } from "../utils/core";
  import { getAccessInfo } from "$stores/authStore";
  import { onMount } from "svelte";
  import type { DialogWindowBaseProps } from "$lib/ts/components";

  let isRegistered = $derived($registrationStore.isRegistered);
  let isAuthenticated = $derived($authStore.is_authenticated);
  // let isExpired: boolean = $state(!$authStore.is_authenticated);

  let DialogElement: DialogWindowBaseProps = {
    title: "Session Expired",
    message: "our session has expired. Please login again to continue.",
    show: false,
  };

  let { children } = $props();

  onMount(async () => getAccessInfo());

  $effect(() => {
    let curPath = utilCore.getPath();
    DialogElement.show =
      !$authStore.is_authenticated &&
      curPath !== AuthPath.register &&
      curPath !== AuthPath.login;
  });

  function onSessionExpired() {
    DialogElement.show = false;
    utilCore.navigatePath(AuthPath.login);
  }
</script>

{#if isRegistered && isAuthenticated}
  <Header />
{/if}

{@render children()}

<DialogWindow
  title={DialogElement.title}
  bind:show={DialogElement.show}
  modalType={ModalTypeEnum.USER}
  message={DialogElement.message}
  onSubmit={onSessionExpired}
/>
