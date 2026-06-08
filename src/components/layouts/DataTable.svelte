<script lang="ts" generics="T">
  import type { Column, IconProps, TableAction } from "$lib/ts/components";
  import type { DisplayMedia } from "$lib/ts/enums/primitives";
  import type { Component } from "svelte";
  

  type DataTableProps = {
    data: T[];
    columns: Column<T>[];
    actions: TableAction<T>[];
    loading?: boolean;
    disMedia?: DisplayMedia;
  };

  let {
    data = [],
    columns = [],
    actions = [],
    loading = false,
  }: DataTableProps = $props();
</script>

<div class="border rounded-lg bg-white overflow-hidden">
  <table class="w-full border-collapse">
    <thead class="bg-gray-100">
      <tr>
        {#each columns as column}
          <th class="px-4 py-3 text-left border-b">
            {column.header}
          </th>
        {/each}

        {#if actions.length}
          <th class="px-4 py-3 border-b">Actions</th>
        {/if}
      </tr>
    </thead>

    <tbody>
      {#if loading}
        <tr>
          <td colspan={columns.length + 1} class="text-center p-6">
            Loading...
          </td>
        </tr>
      {:else}
        {#each data as row}
          <tr class="border-b hover:bg-gray-50">
            {#each columns as column}
              <td class="px-4 py-3">
                <render>
                  {row[column.key]}
                </render>
              </td>
            {/each}

            {#if actions.length}
              <td class="px-4 py-3 flex gap-2">
                {#each actions as action}
                <!-- {@const Icon = action.icon} -->
                 {const IconComponent = $derived(action.icon as Component<IconProps>);}
                  <button
                    onclick={() => action.onClick(row)}
                    class="p-1 hover:bg-gray-100 rounded"
                  >
                    
                    {#if !!action.icon}
                      <IconComponent width={48} height={48} />
                    {/if}

                  <!-- {<Icon />} -->
                  </button>
                {/each}
              </td>
            {/if}
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
