<script lang="ts">
  import companyLogo from "$lib/assets/msp-logo.svg";
  import companyLogoDark from "$lib/assets/msp-logo-w.svg";
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import type { MenuState } from "$lib/ts/megamenu";
  import { MenuCategoryEnum } from "$lib/ts/enums/menu";
  import Menu from "./Menu.svelte";
  import UserPanel from "./UserPanel.svelte";

  let menuStates: MenuState = $state({
    category: MenuCategoryEnum.default,
    root: null,
    
    darkmode: false,
    popover: false,
  });

  let scrolled = $state(false);

  function handleScroll() {
    scrolled = window.scrollY > 0;
  }

  let frequentModules = megamenu.frequentModules;

  let isUserPanel = $derived(menuStates.popover);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<header class:shadow-none={menuStates.category !== "default" || isUserPanel}>
  <div class="_header_container" class:_scrolled={scrolled}>
    <div class='flex h-full items-end'>
      <span>
        <a href="/">
          <img
            src={!scrolled ? companyLogo : companyLogoDark}
            alt="Organization"
            class="h-10 w-auto"
          />
        </a>
      </span>
    </div>

    <Menu
      category={menuStates.category}
      root={menuStates.root}
      isScrolled={scrolled}
    />

    <UserPanel
      isPopOver={menuStates.popover}
      isDarkmode={menuStates.darkmode}
      {frequentModules}
    />
  </div>
</header>
