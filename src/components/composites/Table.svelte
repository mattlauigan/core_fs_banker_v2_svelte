<script lang="ts" generics="T">
  import type { Column, IconProps, TableAction } from "$lib/ts/components";
  import type { Component, Snippet } from "svelte";
  import { AlignMap, type DisplayMedia } from "$lib/ts/enums/primitives";


  type DataTableProps = {
    data: T[];
    columns: Column<T>[];
    actions: TableAction<T>[];
    loading?: boolean;
    disMedia?: DisplayMedia;
    children: Snippet;
  };

  let {
    data = [],
    columns,
    actions = [],
    loading = false,
    children,
  }: DataTableProps = $props();

  const ghostCount = $derived(Math.max(0, 10 - data.length));
</script>

<div class="_table_wrapper">
<input type="color">
<span class='bg-[#FFF2DB]/10 text-[#FFF2DB]'>hello</span>
  <div class="_table_wrapper_scroll">
    <table>
      <thead>
        <tr class="_table_row_header">
          {#each columns as column}
            <th
              class="_table_header {AlignMap.getAlignmentClass(
                column.alignment,
              )}"
            >
              {column.header}
            </th>
          {/each}
          {#if actions.length}
            <th class="_sticky_col _table_action _table_header">• • •</th>
          {/if}
        </tr>
      </thead>

      <tbody>
        {#if loading}
          <tr class="_table_row">
            <td colspan={columns.length + 1}> Loading... </td>
          </tr>
        {:else}
          {#each data as row}
            <tr class="_table_row">
              {#each columns as column}
                <td class="_table_row_data">
                  <render class={AlignMap.getAlignmentClass(column.alignment)}>
                    {row[column.key]}
                  </render>
                </td>
              {/each}

              {#if actions.length}
                <td class="_sticky_col _table_action _table_row_data">
                  {#each actions as action}
                    {@const IconComponent = action.icon as Component<IconProps>}
                    <div class="_table_action_container">
                      <button
                        onclick={() => action.onClick(row)}
                        class="cursor-pointer"
                      >
                        {#if !!action.icon}
                          <IconComponent width={16} height={16} />
                        {/if}
                      </button>
                      <div class="_table_tooltip">
                        {action.label}
                      </div>
                    </div>
                  {/each}
                </td>
              {/if}
            </tr>
          {/each}

          {#if ghostCount}
            {#each Array(ghostCount) as _}
              <tr class="_table_row _ghost_row h-12.25" aria-disabled="true">
                {#each columns as column}
                  <td class="_table_row_data">
                    <div class="h-3 w-24 bg-slate-200 rounded-full"></div>
                  </td>
                {/each}

                {#if ghostCount}
                  {#if actions.length}
                    <td class="_sticky_col _table_action _table_row_data">
                      {#each actions as action}
                        <div
                          class="_table_action_container"
                          aria-disabled="true"
                        >
                          <span class="h-7 w-7 rounded-sm bg-slate-200"></span>
                        </div>
                      {/each}
                    </td>
                  {/if}
                {/if}
              </tr>
            {/each}
          {/if}
        {/if}
      </tbody>
    </table>
  </div>
  {@render children()}
</div>
