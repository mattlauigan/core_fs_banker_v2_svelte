<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import { MenuCategory } from "../ts/enum";

  let megamenuTabs = megamenu.categories;
  let { children } = $props();
  let isOpen: boolean = $state(false);
  let isSubmenu: boolean = $state(false);
  let isMegamenu: boolean = $state(false);

  let toggleCategory: MenuCategory = $state<MenuCategory>(MenuCategory.default);
  let toggleSubMenu: string = $state<string>("");

  const isMenuCategory = (value: string): value is MenuCategory => {
    return ["operational", "accounting", "report", "administrative"].includes(
      value,
    );
  };

  const toggleCategoryHandler = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const value = element.innerText.toLowerCase();

    if (value && isMenuCategory(value)) {
      toggleCategory = value;
      isSubmenu = true;
    }
  };

  const toggleSubMenuHandler = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const value = element.innerText.toLowerCase();

    if (value) {
      toggleSubMenu = value;
      isMegamenu = true;
    }
  };

  // const closeSubMenuHandler = () => {
  //   isSubmenu = false;
  //   toggleCategory = MenuCategory.default;
  // };

  const closeMegaMenuHandler = () => {
    isSubmenu = false;
    toggleCategory = MenuCategory.default;
  };
  0;
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header>
  <div
    class="header_container"
    style:height={toggleCategory === MenuCategory.default ? "8vvh" : "auto"}
  >
    <!-- LEFT LOGO -->
    <div style:padding-top="10px">
      <img
        src="./src/lib/assets/ms-logo.png"
        alt="Organization"
        style:height="50px"
      />
    </div>

    <!-- CATEGORIES NAV -->
    <div class="_categories_nav">
      {#each megamenuTabs as tab}
        <p onmouseenter={toggleCategoryHandler}>{tab.name}</p>
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
    class="sub_menu_container {isSubmenu ? 'expanded' : ''}"
    onmouseenter={toggleSubMenuHandler}
    // onmouseleave={closeSubMenuHandler}
    role="button"
    tabindex="0"
  >
    <div class="sub_menu_content">
      {#each megamenuTabs as tab}
        {#if tab.name.toLowerCase() === toggleCategory}
          {#each tab.roots as root}
            <p>{root.name}</p>
          {/each}
        {/if}
      {/each}
    </div>
  </div>
</header>

{#if isMegamenu}
  <div
    class="_megamenu"
    onmouseleave={closeMegaMenuHandler}
    role="button"
    tabindex="0"
  >
    <div class="_modal_content">
      {#each megamenuTabs as tab}
        {#if tab.name.toLowerCase() === toggleCategory}
          {#each tab.roots as root}
            {#each root.menus as menu}
              <!-- LEVEL 1 -->
              <p
                class="_menu-item _menu-item--group _menu-item--lvl-1"
                style:cursor={menu.modules?.length ? "default" : "pointer"}
              >
                {menu.name.toUpperCase()}
              </p>

              <!-- LEVEL 2 -->
              {#if menu.modules?.length}
                {#each menu.modules as module}
                  {#if module.submodules?.length}
                    <!-- NOT CLICKABLE -->
                    <p
                      class="_menu-item _menu-item--link _menu-item--lvl-2"
                      style:cursor="default"
                      style:text-indent=".5rem"
                    >
                      {module.name}
                    </p>

                    <!-- LEVEL 3 -->
                    {#each module.submodules as sub}
                      <p
                        class="_menu-item _menu-item--link _menu-item--lvl-3"
                        style:cursor="pointer"
                        style:text-indent="1rem"
                      >
                        {sub.name}
                      </p>
                    {/each}
                  {:else}
                    <!-- CLICKABLE -->
                    <p
                      class="_menu-item _menu-item--link _menu-item--lvl-2"
                      style:cursor="pointer"
                      style:text-indent=".5rem"
                    >
                      {module.name}
                    </p>
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

<div class="content">
  {@render children()}
</div>

<style>
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-inline: auto;
    overflow: hidden;
    z-index: 1;
    margin-top: 8vh;
    padding-top: 1.5rem;
  }

  header {
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: var(--bg-color-01);
    z-index: 2020;
    transform: translateX(0);
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  header .header_container {
    display: flex;
    justify-content: space-around;
    padding: 0 1.5rem;
    transition: height 0.3s ease;
  }

  header .sub_menu_container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 3030;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s ease;
    background-color: var(--primary-color-300);
    color: white;
    margin: 0;
  }

  header .sub_menu_container.expanded {
    grid-template-rows: 1fr;
    padding: 0 !important;
    margin: 0 !important;
  }

  header .sub_menu_container .sub_menu_content {
    display: hidden;
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 0.8rem;
  }

  ._categories_nav {
    display: flex;
    justify-content: space-around;
    margin: auto;
    padding-top: 1.7rem;
  }

  ._categories_nav p {
    margin: 0 10px;
    padding: 0.5rem;
    font-size: 1rem;
  }

  ._categories_nav p:hover,
  ._categories_nav p:focus {
    background-color: var(--primary-color-300);
    color: white;
    border-radius: 5px 5px 0 0;
  }

  ._megamenu {
    position: absolute;
    width: 50vw;
    height: 30vh;
    background-color: var(--primary-color-300);
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 45%;
    left: 50%;
    transform: translate(-50%, -45%);
    z-index: 9999;
    margin-inline: auto;
    border-radius: 1rem;
  }

  ._menu-item {
    font-size: 0.9rem;
  }

  ._menu-item--group {
    cursor: default;
  }

  ._menu-item--link {
    cursor: pointer;
  }

  ._menu-item--lvl-1 {
    color: var(--secondary-color-500);
  }

  ._menu-item--lvl-2 {
    color: var(--white-color);
  }

  ._menu-item--lvl-3 {
    color: var(--accent-001);
  }

  ._user_panel {
    height: 2.5rem;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
    background-color: var(--user-panel-bg);
    border: 1px solid var(--accent-001);
    border-radius: 37px;
    gap: 10px;
  }

  ._user_panel div p {
    margin: 0;
    font-size: 0.9rem;
  }

  ._user_panel div :last-child {
    margin-top: -0.5rem;
    font-size: 0.7rem;
    color: var(--accent-002);
  }

  ._user_panel img {
    width: 1.5rem;
    height: 1.5rem;

    border-radius: 50%;
  }
</style>
