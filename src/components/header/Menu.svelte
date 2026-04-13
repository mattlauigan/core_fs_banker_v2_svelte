<script lang="ts">
  import { MenuCategory } from "$lib/ts/enum";
  import megamenu from "$lib/data/megamenu.json";

  let {
    category = MenuCategory.default,
    root = null,
  } = $props();

  let Categories = megamenu.categories;
  let activeCategory = $derived(
    Categories.find((c) => c.name.toLowerCase() === category),
  );

  function openCategory(name: string) {
    category = name.toLowerCase() as MenuCategory;
    root = null;
  }

  let activeRoot = $derived(
    activeCategory?.roots.find((r) => r.name.toLowerCase() === root),
  );

  function openRoot(name: string) {
    root = name.toLowerCase();
  }

    const closeMenu = () => {
    isSubmenu = false;
    isMegamenu = false;
    category = MenuCategory.default;
  };

  let isSubmenu = $derived(category !== MenuCategory.default);
  let isMegamenu = $derived(!!root);
</script>

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
</div>
