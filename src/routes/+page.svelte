<script lang="ts">
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
  } from "$components/primitives/icons";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import Hero from "$components/Hero.svelte";
  import TextArea from "$components/primitives/TextArea.svelte";
  import TextInput from "$components/primitives/TextInput.svelte";
  import User from "$components/User.svelte";
  import userStore from "$stores/auth";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import { goto } from "$app/navigation";
  import Tablescroll from "$components/composites/Tablescroll.svelte";

  const authStore = userStore();

  let isExpired = $state(!$authStore.isAuthenticated);

  $effect(() => {
    if ($authStore.isRegistered && !$authStore.isAuthenticated) {
      isExpired = true;
      console.log("session expired");
    } else if (!$authStore.isRegistered && !$authStore.isAuthenticated) {
      isExpired = true;
      console.log("for registration");
    }
  });

  const onSessionExpired = () => {
    isExpired = false;
    console.log("logging out");
    authStore.logout();

    goto("/auth/login", {
      replaceState: true,
    });
  };
</script>

<div class="_content">
  <Hero />
  <TextInput id="trial" name="trial" label="Trial 2" style="w-75" />
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

  <TextArea
    id="trial2"
    name="trial2"
    label="Trial TextArea"
    style="w-64"
    required
  ></TextArea>

  <User />
  <Tablescroll></Tablescroll>
</div>

<DialogWindow
  title="Session Expired"
  bind:show={isExpired}
  modalType={ModalTypeEnum.INFO}
  message="Your session has expired. Please login again to continue."
  onSubmit={onSessionExpired}
/>
