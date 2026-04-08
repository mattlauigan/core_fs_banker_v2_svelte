<script lang="ts">

  import ToggleSwitch from "$components/toggleSwitch/ToggleSwitch.svelte";
  import companyLogo from "$lib/assets/msp-logo.svg";
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import type { MenuState } from "$lib/ts/megamenu";
  import userLogo from "$lib/assets/user.png";
  import { MenuCategory } from "$lib/ts/enum";

  let menuStates: MenuState = $state({
    category: MenuCategory.default,
    root: null,
    online: false,
    darkmode: false,
    popover: {
      userPanel: false,
    },
  });

  let Categories = megamenu.categories;
  let frequentModules = megamenu.frequentModules;

  let activeCategory = $derived(
    Categories.find((c) => c.name.toLowerCase() === menuStates.category),
  );

  let activeRoot = $derived(
    activeCategory?.roots.find((r) => r.name.toLowerCase() === menuStates.root),
  );

  function toggelUserPanel() {
    menuStates.popover.userPanel = !menuStates.popover.userPanel;
  }

  function closeUserPanel() {
    menuStates.popover.userPanel = false;
  }

  function openCategory(name: string) {
    menuStates.category = name.toLowerCase() as MenuCategory;
    menuStates.root = null;
  }

  function openRoot(name: string) {
    menuStates.root = name.toLowerCase();
  }

  const closeMenu = () => {
    isSubmenu = false;
    isMegamenu = false;
    menuStates.category = MenuCategory.default;
  };

  let isSubmenu = $derived(menuStates.category !== MenuCategory.default);
  let isMegamenu = $derived(!!menuStates.root);
  let isUserPanel = $derived(menuStates.popover.userPanel);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header
  class={menuStates.category !== "default" || isUserPanel ? "shadow-none" : ""}
>
  <div class="_header_container">
    <!-- LEFT LOGO -->
    <div class="pt-3">
      <span>
        <a href="/">
          <img src={companyLogo} alt="Organization" class='h-14' />
        </a>
      </span>
    </div>

    <!-- CATEGORIES NAV -->
    <div class="_categories_nav">
      {#each Categories as category}
        <p
          onmouseenter={() => openCategory(category.name)}
          class="_category_item {category.name.toLowerCase() ===
          activeCategory?.name.toLowerCase()
            ? '_active'
            : ''}"
        >
          {category.name}
        </p>
      {/each}
    </div>

    <!-- USER PANEL -->
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
          class="_user_logo {menuStates.online
            ? '_user_online'
            : '_user_offline'}"
        />
      </div>

      {#if isUserPanel}
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
              checked={menuStates.darkmode}
              onCheck={(checked) => {
                console.log(checked); // boolean ✅
              }}
            />
            <hr class="_user_panel_hr" />
            <button class="text-left" onclick={() => {}}>Open Teller</button>
            <a href="a"> Teller Journal </a>
            <a href="b"> Previous Transaction Summary </a>
            <hr class="_user_panel_hr" />
            <a href="c"> Terminal </a>
            <a href="d"> Branch </a>
            <a href="e"> User </a>
            <hr class="_user_panel_hr" />
            <a href="f"> Current Business Date </a>
            <a href="g"> Today Transaction </a>
            <a href="h"> Host Status </a>
            <a href="i"> Portal Status </a>

            <hr class="_user_panel_hr" />
            <a href="j"> Change Password</a>
            <a href="k"> View Login Record </a>
            <p>Recent Visited Transaction</p>
            <div class="_user_popover_frequent_container pl-6">
              {#each frequentModules as module}
                <a href={module.route} >
                  {module.name}
                </a>
              {/each}
            </div>
            <hr class="_user_panel_hr" />
            <a href="l" class="text-red-500"> Logout </a>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <!-- SUBMENU -->
  {#if isSubmenu && activeCategory && activeCategory.roots.length > 0}
    <div class="_sub_menu_container _expanded">
      <div class="_sub_menu_content">
        {#each activeCategory.roots as root}
          <p
            class="_sub_menu_item {root.name.toLowerCase() ===
            activeRoot?.name.toLowerCase()
              ? '_active'
              : ''}"
            onmouseenter={() => openRoot(root.name)}
          >
            {root.name}
          </p>
        {/each}
      </div>
    </div>
  {/if}

  <!-- MEGA MENU -->

  {#if isMegamenu && activeRoot}
    <div
      class="_modal_menu_container"
      onmouseleave={closeMenu}
      role="button"
      tabindex="0"
    >
      <div class="_modal_content">
        {#each activeRoot.menus as menu}
          <div class="_menu-column">
            <!-- LEVEL 1 -->
            <a
              href={menu.route}
              class="_menu-item _menu-item--group _menu-item--lvl-1 {menu
                .modules?.length !== 0
                ? '_menu-item--link'
                : ''}"
            >
              {menu.name.toUpperCase()}
            </a>

            <!-- LEVEL 2 + 3 -->
            {#each menu.modules as module}
              <a
                href={module.route}
                class="_menu-item _menu-item--link _menu-item--lvl-2"
              >
                {module.name}
              </a>

              {#if module.submodules}
                {#each module.submodules as sub}
                  <a
                    href={sub.route}
                    class="_menu-item _menu-item--link _menu-item--lvl-3"
                  >
                    {sub.name}
                  </a>
                {/each}
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</header>
