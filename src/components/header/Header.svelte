<script lang="ts">
  import Menu from "./Menu.svelte";
  import UserPanel from "$components/header/UserPanel.svelte";
  import companyLogo from "$lib/assets/msp-logo.svg";
  import companyLogoDark from "$lib/assets/msp-logo-w.svg";
  import favicon from "$lib/assets/favicon.svg";
  import megamenu from "$lib/data/megamenu.json";
  import type { MenuState } from "$lib/ts/megamenu";
  import { MenuCategoryEnum } from "$lib/ts/enums/menu";

  let menuStates: MenuState = $state({
    category: MenuCategoryEnum.default,
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

  let frequentModules = megamenu.frequentModules;

  let isUserPanel = $derived(menuStates.popover.userPanel);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<header
  class={menuStates.category !== "default" || isUserPanel ? "shadow-none" : ""}
>
  <div
    class="_header_container
    {!isScrolled ? '' : '_scrolled'}"
  >
    <div class="pt-3">
      <span>
        <a href="/">
          <img
            src={!isScrolled ? companyLogo : companyLogoDark}
            alt="Organization"
            class="h-14 w-auto"
          />
        </a>
      </span>
    </div>

    <Menu category={menuStates.category} root={menuStates.root} {isScrolled} />

    <UserPanel
      isPopOver={menuStates.popover.userPanel}
      isDarkmode={menuStates.darkmode}
      online={menuStates.online}
      {frequentModules}
    />
  </div>
</header>
