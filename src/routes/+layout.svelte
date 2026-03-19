<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
    import { MenuCategory } from "../ts/enum";

  let megamenuTabs = megamenu.tabs;
  let { children } = $props();
  let isOpen: boolean = $state(false);
  let isSubmenu: boolean = $state(false);
  let isMegamenu: boolean = $state(false);

  let toggleCategory: MenuCategory = $state<MenuCategory>(MenuCategory.default);

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

  const closeSubMenuHandler = () => {
    isSubmenu = false;
    toggleCategory = MenuCategory.default;
  };

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
    <menu>
      {#each megamenuTabs as tab}
        <p onmouseenter={toggleCategoryHandler}>{tab.label}</p>
      {/each}
      <input type="checkbox" name="isDarkMode" id="isDarkMode">
    </menu>

    <!-- USER PANEL -->
    <div class="user_panel" style:margin-top="10px">
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
    onmouseleave={closeSubMenuHandler}
    role="button"
    tabindex="0"
  >
    <div class="sub_menu_content">
      {#each megamenuTabs as tab}
        {#if tab.label.toLowerCase() === toggleCategory}
          {#each tab.sections as section}
            <p>{section.section}</p>
          {/each}
        {/if}
      {/each}
    </div>
  </div>
</header>

{#if isMegamenu}
  <div
    class="megamenu_modal"
    onmouseleave={closeMegaMenuHandler}
    role="button"
    tabindex="0"
  >
    <div class="modal_content">
      <!-- <p>{toggleCategory}</p> -->
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
    /* align-items: center; */
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
    background-color: white;
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
    background-color: #00101f;
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

  menu {
    display: flex;
    justify-content: space-around;
    margin: auto;
    padding-top: 1.7rem;
  }

  menu p {
    margin: 0 10px;
    padding: 0.5rem;
    font-size: 1rem;
  }

  menu p:hover,
  menu p:focus {
    background-color: #00101f;
    color: white;
    border-radius: 5px 5px 0 0;
  }

  .megamenu_modal {
    position: absolute;
    width: 50vw;
    /* height: 30vh; */
    background-color: #00101f;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 20vh;
    left: 50%;
    transform: translate(-50%, -20vh);
    z-index: 9999;
    margin-inline: auto;
    border-radius: 1rem;
  }

  .megamenu_modal .modal_content {
    color: white;
    font-size: 1.5rem;
  }

  .user_panel {
    height: 3rem;
    padding-inline: 1rem;
    display: flex;
    align-items: center;
    border: 1px solid gray;
    border-radius: 37px;
    gap: 10px;
  }

  .user_panel div p {
    margin: 0;
  }

  .user_panel div :last-child {
    margin-top: -0.5rem;
    font-size: 0.8rem;
    color: gray;
  }

  .user_panel img {
    width: 2rem;
    height: 2rem;

    border-radius: 50%;
  }
</style>
