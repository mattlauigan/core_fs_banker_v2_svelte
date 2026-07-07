<script lang="ts">
  import "./layout.css";
  import Header from "../components/layouts/Header.svelte";
  import { authStore, registrationStore } from "$stores/authStore";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import { utilCore } from "../utils/core";
  import { AuthPath } from "$lib/ts/enums/path/auth";

  let isRegistered = $derived($registrationStore.isRegistered);
  let isAuthenticated = $derived($authStore.is_authenticated);
  let isExpired: boolean = $state(!$authStore.is_authenticated);
  let { children } = $props();

  $effect(() => {
    let curPath = utilCore.getPath();
    isExpired = !$authStore.is_authenticated && curPath !== AuthPath.login;
  });

  function onSessionExpired() {
    isExpired = false;
    utilCore.navigatePath(AuthPath.login);
  }
</script>

{#if isRegistered && isAuthenticated}
  <Header />
{/if}

{@render children()}

<DialogWindow
  title="Session Expired"
  bind:show={isExpired}
  modalType={ModalTypeEnum.USER}
  message="Your session has expired. Please login again to continue."
  onSubmit={onSessionExpired}
/>
