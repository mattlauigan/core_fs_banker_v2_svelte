<script lang="ts">
  import { MenuCategoryEnum } from "$lib/ts/enums/menu";
  import megamenu from "$lib/data/megamenu.json";

  let {
    isScrolled = false,
    category = MenuCategoryEnum.default,
    root = null,
  } = $props();

  let Categories = megamenu.categories;
  let activeCategory = $derived(
    Categories.find((c) => c.name.toLowerCase() === category),
  );

  function openCategory(name: string) {
    category = name.toLowerCase() as MenuCategoryEnum;
    root = null;
  }

  let activeRoot = $derived(
    activeCategory?.roots.find((r) => r.name.toLowerCase() === root),
  );

  function openRoot(name: string) {
    root = name.toLowerCase();
  }

  function closeSubmenu() {
    category = MenuCategoryEnum.default;
    root = null;
    isSubmenu = false;
  }

  let isSubmenu = $derived(category !== MenuCategoryEnum.default);
  let isMegamenu = $derived(!!root);
</script>

<div class="_categories_nav">
  {#each Categories as category}
    <p
      onmouseenter={() => openCategory(category.name)}
      class="_category_item {category.name.toLowerCase() ===
      activeCategory?.name.toLowerCase()
        ? '_active'
        : ''} {isScrolled ? '_scrolled' : ''}"
    >
      {category.name}
    </p>
  {/each}

  {#if isSubmenu && activeCategory && activeCategory.roots.length > 0}
    <div class="_sub_menu_container _expanded" role="button" tabindex="0">
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

  {#if isMegamenu && activeRoot}
    <div
      class="_modal_menu_container"
      onmouseleave={closeSubmenu}
      role="button"
      tabindex="0"
    >
        {#each activeRoot.menus as menu}
          <div class="_menu-column">
            <a
              href={menu.route}
              class="_menu-item _menu-item-group _menu-item-lvl-1"
              aria-disabled={!!menu.modules}
            >
              {menu.name.toUpperCase()}
              {#if !!!menu.modules}
                &gt;
              {/if}
            </a>

            {#each menu.modules as module}
              <a
                href={module.route}
                class="_menu-item _menu-item-link _menu-item-lvl-2"
                aria-disabled={module.submodules.length > 0}
              >
                {module.name}
              </a>

              {#if module.submodules}
                {#each module.submodules as sub}
                  <a
                    href={sub.route}
                    class="_menu-item _menu-item-link _menu-item-lvl-3"
                  >
                    {sub.name}
                  </a>
                {/each}
              {/if}
            {/each}
          </div>
        {/each}
    </div>
  {/if}
</div>
