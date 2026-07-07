<script lang="ts">
  import "./layout.css";
  import Header from "../components/layouts/Header.svelte";
  import { authStore, registrationStore } from "$stores/authStore";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import { goto } from "$app/navigation";
  import { utilCore } from "../utils/core";

  let isRegistered = $derived($registrationStore.isRegistered);
  let isAuthenticated = $derived($authStore.is_authenticated);

  let { children } = $props();

  let isExpired = $state(!$authStore.is_authenticated);

  function onSessionExpired() {
    let here = utilCore.getPath();
    console.log(JSON.stringify(here))
    isExpired = false;
    goto("/auth/login", { replaceState: true });
  }

</script>

{#if isRegistered && isAuthenticated}
  <Header />
{/if}



{@render children()}

<DialogWindow
  title="Session Expired"
  bind:show={isExpired}
  // show={false}
  modalType={ModalTypeEnum.INFO}
  message="Your session has expired. Please login again to continue."
  onSubmit={onSessionExpired}
/>
