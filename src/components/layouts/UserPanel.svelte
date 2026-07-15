<script lang="ts">
  import ToggleSwitch from "$components/toggleSwitch/ToggleSwitch.svelte";
  import userLogo from "$lib/assets/user.png";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import QuickLink from "$components/primitives/QuickLink.svelte";
  import { ls } from "$lib/services/ls";
  import { authStore, saveAuthFromServer, userStore } from "$stores/authStore";
  import { LSKEY_USER_THEMES } from "$lib/config/constants";
  import type { DialogWindowBaseProps } from "$lib/ts/components";
  import { goto } from "$app/navigation";
  import { AuthPath } from "$lib/ts/enums/path/auth";

  let { isPopOver = false, isDarkmode = false, frequentModules } = $props();

  let username = $derived<string>($userStore.profile?.name || "anonymous");
  let position = $derived<string>($userStore.profile?.role.name || "-");
  let userId = $derived<number | undefined>($userStore.profile?.role.id);
  let isUserOnline = $derived<boolean>($userStore.isOnline);

  let dialogElement: DialogWindowBaseProps & {
    modalType: ModalTypeEnum;
    fn?: () => void;
  } = $state({
    title: "Confirm",
    message: "",
    show: false,
    modalType: ModalTypeEnum.INFO,
    fn: () => {},
  });

  function toggleDarkMode(value: boolean) {
    isDarkmode = value;
    const lsUserId = `user_${userId}`;
    ls.add(
      LSKEY_USER_THEMES,
      JSON.stringify({ [lsUserId]: value ? "dark" : "light" }),
    );
  }

  function handleLogout() {
    if ($userStore.isOnline) {
      dialogElement.title = "Warning";
      dialogElement.modalType = ModalTypeEnum.WARNING;
      dialogElement.message = "Teller is online";
      dialogElement.fn = () => {
        dialogElement.show = false;
      };
    } else {
      dialogElement.message = "Are you sure you want to Logout?";
      dialogElement.fn = onLogout;
    }
    dialogElement.show = !dialogElement.show;
    
  }

  function onLogout() {
    authStore.update((state) => ({
      ...state,
      is_authenicated: false,
      expires_in: null,
    }));
    console.log('gege')
    goto(AuthPath.login, { replaceState: true });
    console.log('sese')
    dialogElement.show = !dialogElement.show;
    
  }

  function toggleShow() {
    if (!isUserOnline) {
      dialogElement.message = "Open Teller?";
    } else {
      dialogElement.message = "Are you sure you want to Close Teller?";
    }
    dialogElement.show = !dialogElement.show;
    dialogElement.fn = DialogSubmit;
  }

  function toggelUserPanel() {
    isPopOver = !isPopOver;
  }

  function closeUserPanel() {
    isPopOver = false;
  }

  function DialogSubmit() {
    userStore.update((s) => ({ ...s, isOnline: !s.isOnline }));
    dialogElement.show = !dialogElement.show;
  }
</script>

<div class="_user_panel_container">
  <div
    class="_user_panel"
    onmouseenter={toggelUserPanel}
    role="button"
    tabindex="0"
  >
    <div class="_user_info" class:_loading={$userStore.isLoading}>
      <p class="_user_fullname">{username}</p>
      <p class="_user_position">{position}</p>
    </div>
    <img
      src={userLogo}
      alt="user logo"
      class="_user_logo {isUserOnline ? '_user_online' : '_user_offline'}"
    />
  </div>

  {#if isPopOver}
    <div
      class="_user_panel_popover"
      onmouseleave={closeUserPanel}
      role="button"
      tabindex="0"
    >
      <div class="_user_panel_popover_content">
        <ToggleSwitch
          name="darkMode"
          label="Dark Mode"
          disabled={false}
          checked={isDarkmode}
          onCheck={(checked) => toggleDarkMode(checked)}
        />
        <hr class="_user_panel_popover_hr" />
        <button
          class="text-left cursor-pointer"
          onclick={toggleShow}
          disabled={isUserOnline}>Open Teller</button
        >

        <QuickLink route="a" label="Teller Journal" />
        <button
          class="text-left cursor-pointer"
          onclick={toggleShow}
          disabled={!isUserOnline}>Balances & Close Teller</button
        >
        <QuickLink route="b" label="Previous Transaction Summary" />

        <hr class="_user_panel_popover_hr" />

        <QuickLink route="c" label="Terminal" />
        <QuickLink route="d" label="Branch" />
        <QuickLink route="e" label="User" />

        <hr class="_user_panel_popover_hr" />

        <QuickLink route="f" label="Current Business Date" />
        <QuickLink route="g" label="Today Transaction" />
        <QuickLink route="h" label="Host Status" />
        <QuickLink route="i" label="Portal Status" />

        <hr class="_user_panel_popover_hr" />

        <QuickLink route="j" label="Change Password" />
        <QuickLink route="k" label="View Login Record" />

        <p class="text-primary-600">Recent Visited Transaction</p>
        <div class="_user_panel_popover_frequent_container pl-6">
          {#each frequentModules as module}
            <QuickLink route={module.route} label={module.name} />
          {/each}
        </div>
        <hr class="_user_panel_popover_hr" />
        <!-- <QuickLink label="Logout" route="l" style="text-red-500" /> -->

        <button
          class="text-left cursor-pointer text-red-500"
          onclick={handleLogout}
          >Logout
        </button>
      </div>
    </div>
  {/if}
</div>
<DialogWindow
  title={dialogElement.title}
  bind:show={dialogElement.show}
  message={dialogElement.message}
  modalType={dialogElement.modalType}
  onSubmit={dialogElement.fn}
/>
