<script lang="ts">
  import ToggleSwitch from "$components/toggleSwitch/ToggleSwitch.svelte";
  import userLogo from "$lib/assets/user.png";
  import type { MenuState } from "$lib/ts/megamenu";
  import DialogWindow from "$components/modal/DialogWindow.svelte";

  let {
    isPopOver = false,
    isDarkmode = false,
    online = false,
    frequentModules,
  } = $props();

  let dialogMessage = $state("");
  let show = $state(false);

  function toggleShow() {
    if (online) {
      dialogMessage = "Are you sure you want to Close teller?";
    } else {
      dialogMessage = "Are you sure you want to Open teller?";
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
    <div style:row-gap="5px">
      <p class="_user_fullname">User full name</p>
      <p class="_user_position">position</p>
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
          onCheck={(checked) => {
            console.log(checked); // boolean ✅
          }}
        />
        <hr class="_user_panel_popover_hr" />
        <button class="text-left cursor-pointer" onclick={toggleShow}
          >Open Teller</button
        >
        <a href="a"> Teller Journal </a>
        <a href="b"> Previous Transaction Summary </a>
        <hr class="_user_panel_popover_hr" />
        <a href="c"> Terminal </a>
        <a href="d"> Branch </a>
        <a href="e"> User </a>
        <hr class="_user_panel_popover_hr" />
        <a href="f"> Current Business Date </a>
        <a href="g"> Today Transaction </a>
        <a href="h"> Host Status </a>
        <a href="i"> Portal Status </a>

        <hr class="_user_panel_popover_hr" />
        <a href="j"> Change Password</a>
        <a href="k"> View Login Record </a>
        <p>Recent Visited Transaction</p>
        <div class="_user_panel_popover_frequent_container pl-6">
          {#each frequentModules as module}
            <a href={module.route}>
              {module.name}
            </a>
          {/each}
        </div>
        <hr class="_user_panel_popover_hr" />
        <a href="l" class="text-red-500"> Logout </a>
      </div>
    </div>
  {/if}
</div>

{#if show}
  <DialogWindow
    title="Teller Open/Close"
    {show}
    message={dialogMessage}
    isSubmit
    onSubmit={DialogSubmit}
  />
{/if}
