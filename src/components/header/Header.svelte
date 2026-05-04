<script lang="ts">
  import Menu from "./Menu.svelte";
  import UserPanel from "$components/header/UserPanel.svelte";
  import companyLogo from "$lib/assets/msp-logo.svg";
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import type { MenuState } from "$lib/ts/megamenu";
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

  let isScrolled = $state(false);

  function handleScroll() {
    isScrolled = window.scrollY > 0;
  }

  // let Categories = megamenu.categories;
  let frequentModules = megamenu.frequentModules;

  // let activeCategory = $derived(
  //   Categories.find((c) => c.name.toLowerCase() === menuStates.category),
  // );

  // let activeRoot = $derived(
  //   activeCategory?.roots.find((r) => r.name.toLowerCase() === menuStates.root),
  // );

  // function toggelUserPanel() {
  //   menuStates.popover.userPanel = !menuStates.popover.userPanel;
  // }

  // function closeUserPanel() {
  //   menuStates.popover.userPanel = false;
  // }

  // function openCategory(name: string) {
  //   menuStates.category = name.toLowerCase() as MenuCategory;
  //   menuStates.root = null;
  // }

  // function openRoot(name: string) {
  //   menuStates.root = name.toLowerCase();
  // }

  // const closeMenu = () => {
  // isSubmenu = false;
  //   // isMegamenu = false;
  //   menuStates.category = MenuCategory.default;
  // };

  // let isSubmenu = $derived(menuStates.category !== MenuCategory.default);
  // let isMegamenu = $derived(!!menuStates.root);
  let isUserPanel = $derived(menuStates.popover.userPanel);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<header
  class={menuStates.category !== "default" || isUserPanel ? "shadow-none" : ""}
>
  <div class="_header_container {!isScrolled ? 'bg-background-c-01' : 'bg-purple-01 shadow-md text-white'}">
    <!-- LEFT LOGO -->
    <div class="pt-3">
      <span>
        <a href="/">
          <img src={companyLogo} alt="Organization" class="h-14" />
        </a>
      </span>
    </div>

    <!-- CATEGORIES NAV -->
    <Menu category={menuStates.category} root={menuStates.root} />
    <!-- USER PANEL -->
    <UserPanel
      isPopOver={menuStates.popover.userPanel}
      isDarkmode={menuStates.darkmode}
      online={menuStates.online}
      {frequentModules}
    />
  </div>
</header>
