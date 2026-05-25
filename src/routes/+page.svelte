<script lang="ts">
  import Hero from "$components/Hero.svelte";
  import TextField from "$components/inputs/TextField.svelte";
  import {
    ConfirmationIcon,
    CycleIcon,
    DeleteIcon,
    ErrorIcon,
    InfoIcon,
    NotificationIcon,
    SearchIcon,
    SettingsIcon,
    SuccessIcon,
    UserIcon,
    WarningIcon,
  } from "$components/icons";
  import DialogWindow from "$components/modal/DialogWindow.svelte";
  import { BoxState } from "$lib/ts/enum";
  import userStore from "$stores/auth";
  import { goto } from "$app/navigation";
  import DialogWindowLink from "$components/modal/DialogWindowLink.svelte";

  const authStore = userStore();

  let isExpired = $state(false);
  let route = $state("/auth/login");

  $effect(() => {
    if ($authStore.isRegistered && !$authStore.isAuthenticated) {
      isExpired = true;
      console.log("session expired");
    } else if (!$authStore.isRegistered && !$authStore.isAuthenticated) {
      isExpired = true;
      route = "/auth/register";
      console.log("for registration");
    }
  });

  const onSessionExpired = () => {
    isExpired = false;

    authStore.logout();

    goto("/auth/login", {
      replaceState: true,
    });
  };
</script>

<div class="_content">
  <Hero />
  <TextField id="trial" name="trial" label="Trial 2" style="w-75" />
  <div class="flex space-around w-full">
    <ConfirmationIcon width={48} height={48} />
    <CycleIcon width={48} height={48} />
    <ErrorIcon width={48} height={48} />
    <InfoIcon width={48} height={48} />
    <NotificationIcon width={48} height={48} />
    <SearchIcon width={48} height={48} />
    <SettingsIcon width={48} height={48} />
    <SuccessIcon width={48} height={48} />
    <UserIcon width={48} height={48} />
    <WarningIcon width={48} height={48} />

    <DeleteIcon width={48} height={48} />
  </div>
  <br />
</div>

<DialogWindowLink
  title="Session Expired"
  bind:show={isExpired}
  message="Your session has expired. Please login again to continue."
  {route}
/>
