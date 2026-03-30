<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import { MenuCategory } from "$lib/ts/enum";
  import type { MenuState } from "$lib/ts/megamenu";
  import companyLogo from "$lib/assets/ms-logo.png";
  import userLogo from "$lib/assets/user.png";

  let menuStates: MenuState = $state({
    category: MenuCategory.default,
    root: null,
    online: false,
  });

  let Categories = megamenu.categories;

  let activeCategory = $derived(
    Categories.find((c) => c.name.toLowerCase() === menuStates.category),
  );

  let activeRoot = $derived(
    activeCategory?.roots.find((r) => r.name.toLowerCase() === menuStates.root),
  );

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
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class={menuStates.category !== "default" ? "_shadow" : ""}>
  <div class="_header_container">
    <!-- LEFT LOGO -->
    <div style:padding-top="10px">
      <span>
        <a href="/">
          <img src={companyLogo} alt="Organization" style:height="50px" />
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
      <input type="checkbox" name="isDarkMode" id="isDarkMode" />
    </div>

    <!-- USER PANEL -->
    <div class="_user_panel" style:margin-top="10px">
      <div style:row-gap="5px">
        <p>User full name</p>
        <p>position</p>
      </div>
      <img
        src={userLogo}
        alt="user logo"
        class="user_logo"
        style:border="2px solid {menuStates.online ? 'green' : 'red'}"
      />
    </div>
  </div>

  <!-- SUBMENU -->
  {#if isSubmenu && activeCategory}
    <div class="_sub_menu_container _expanded">
      <div class="_sub_menu_content">
        {#each activeCategory.roots as root}
          <p onmouseenter={() => openRoot(root.name)}>
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
              {menu.name}
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
