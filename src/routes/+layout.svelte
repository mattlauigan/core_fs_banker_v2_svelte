<script lang="ts">
  const authStore = userStore();
  import "./layout.css";
  import DialogWindow from "$components/modal/DialogWindow.svelte";
  import Header from "../components/header/Header.svelte";
  import userStore from "$stores/auth";
  import { BoxState } from "$lib/ts/enum";
  import { goto } from "$app/navigation";
  let isSessionExpired = $state(false);
  let { children } = $props();

  $effect(() => {
    console.log("authStore state changed:", {
      isAuthenticated: $authStore.isAuthenticated,
      isRegistered: $authStore.isRegistered,
    });

    if ($authStore.isRegistered && !$authStore.isAuthenticated) {
      isSessionExpired = true;
    } else if (!$authStore.isRegistered && !$authStore.isAuthenticated) {
      isSessionExpired = true;
    }
  });
  const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

  const onSessionExpired = async () => {
    isSessionExpired = false;

    authStore.logout();
    await tick();
    goto("/auth/login", { replaceState: true });
  };
</script>

{#if $authStore.isAuthenticated}
  <Header />
{/if}

<DialogWindow
  title="Session Expired"
  bind:show={isSessionExpired}
  message="Your session has expired. Please login again to continue."
  boxState={BoxState.OK}
  onSubmit={onSessionExpired}
/>

{@render children()}
