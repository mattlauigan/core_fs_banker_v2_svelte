<script lang="ts">
  import ToggleSwitch from "$components/toggleSwitch/ToggleSwitch.svelte";
  import userLogo from "$lib/assets/user.png";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import QuickLink from "$components/primitives/QuickLink.svelte";
  import { ls } from "$lib/services/ls";

  let {
    username = "anonymous",
    position = "admin",
    isPopOver = false,
    isDarkmode = false,
    online = false,
    frequentModules,
  } = $props();

  let dialogMessage = $state("");
  let show = $state(false);
  let userId = $state("sampleID"); //change when authstore is finish

  function toggleDarkMode(value: boolean) {
    isDarkmode = value;
    ls.add(
      `user_${userId}_pref`,
      JSON.stringify({ theme: value ? "dark" : "light" }),
    );
  }

  function toggleShow() {
    if (online) {
      dialogMessage = "Open Teller?";
    } else {
      dialogMessage = "Close Teller?";
    }
    show = !show;
  }

  function toggelUserPanel() {
    isPopOver = !isPopOver;
  }

  function closeUserPanel() {
    isPopOver = false;
  }

  function DialogSubmit() {
    online = !online;
    show = false;
  }
</script>

<div class="_user_panel_container">
  <div
    class="_user_panel"
    onmouseenter={toggelUserPanel}
    role="button"
    tabindex="0"
  >
    <div class="_user_info">
      <p class="_user_fullname">{username}</p>
      <p class="_user_position">{position}</p>
    </div>
    <img
      src={userLogo}
      alt="user logo"
      class="_user_logo {online ? '_user_online' : '_user_offline'}"
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
          disabled={online}>Open Teller</button
        >

        <QuickLink route="a" label="Teller Journal" />
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
        <QuickLink label="Logout" route="l" style="text-red-500" />
      </div>
    </div>
  {/if}
</div>
<DialogWindow
  title="Confirm"
  bind:show
  message={dialogMessage}
  modalType={ModalTypeEnum.CONFIRM}
  onSubmit={DialogSubmit}
/>
