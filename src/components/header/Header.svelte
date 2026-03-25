<script lang="ts">
  // import
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import { MenuCategory } from "$lib/ts/enum";

  let Categories = megamenu.categories;

  let isOpen: boolean = $state(false);
  let isSubmenu: boolean = $state(false);
  let isMegamenu: boolean = $state(false);

  let openCategory: MenuCategory = $state<MenuCategory>(MenuCategory.default);
  let openSubmenu: string = $state<string>("");

  const isMenuCategory = (value: string): value is MenuCategory => {
    return ["operational", "accounting", "report", "administrative"].includes(
      value,
    );
  };

  const openCategoryHandler = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const value = element.innerText.toLowerCase();

    if (value && isMenuCategory(value)) {
      openCategory = value;
      isSubmenu = true;
    }
  };

  const openSubmenuHandler = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const value = element.innerText.toLowerCase();

    if (value) {
      openSubmenu = value;
      isMegamenu = true;
    }
  };

  const closeMegaMenuHandler = () => {
    isSubmenu = false;
    isMegamenu = false;
    openCategory = MenuCategory.default;
  };
  0;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <div class="_header_container">
    <!-- LEFT LOGO -->
    <div style:padding-top="10px">
      <span>
        <a href="/">
          <img
            src="./src/lib/assets/ms-logo.png"
            alt="Organization"
            style:height="50px"
          />
        </a>
      </span>
    </div>

    <!-- CATEGORIES NAV -->
    <div class="_categories_nav">
      {#each Categories as category}
        <p
          onmouseenter={openCategoryHandler}
          class="_category_item {category.name.toLowerCase() ===
          openCategory.toLowerCase()
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
        src="./src/lib/assets/user.png"
        alt="user logo"
        class="user_logo"
        style:border="2px solid {isOpen ? 'green' : 'red'}"
      />
    </div>
  </div>

  <!-- SUBMENU -->
  <div
    class="_sub_menu_container {isSubmenu ? '_expanded' : ''}"
    onmouseenter={openSubmenuHandler}
    role="button"
    tabindex="0"
  >
    <div class="_sub_menu_content">
      {#each Categories as category}
        {#if category.name.toLowerCase() === openCategory}
          {#each category.roots as root}
            <p
              class="_sub_menu_item {root.name.trim().toLowerCase() ===
              openSubmenu.toLowerCase()
                ? '_active'
                : ''}"
            >
              {root.name}
            </p>
          {/each}
        {/if}
      {/each}
    </div>
  </div>

  {#if isMegamenu}
    <div
      class="_modal_menu_container"
      onmouseleave={closeMegaMenuHandler}
      role="button"
      tabindex="0"
    >
      <div class="_modal_content">
        {#each Categories as category}
          {#if category.name.toLowerCase() === openCategory}
            {#each category.roots as root}
              {#each root.menus as menu}
                <!-- LEVEL 1 -->
                <p class="_menu-item _menu-item--group _menu-item--lvl-1">
                  {menu.name.toUpperCase()}
                </p>

                <!-- LEVEL 2 -->
                {#if menu.modules?.length}
                  {#each menu.modules as module}
                    {#if module.submodules?.length}
                      <a
                        href={module.route}
                        class="_menu-item _menu-item--link _menu-item--lvl-2"
                      >
                        <span>
                          {module.name}
                        </span>
                      </a>

                      <!-- LEVEL 3 -->
                      {#each module.submodules as sub}
                        <a
                          href={sub.route}
                          class="_menu-item _menu-item--link _menu-item--lvl-3"
                        >
                          <span>
                            {sub.name}
                          </span>
                        </a>
                      {/each}
                    {:else}
                      <a
                        href={module.route}
                        class="_menu-item _menu-item--link _menu-item--lvl-2"
                      >
                        <span>
                          {module.name}
                        </span>
                      </a>
                    {/if}
                  {/each}
                {/if}
              {/each}
            {/each}
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</header>

<style>
  @import url("./header.css");
</style>
