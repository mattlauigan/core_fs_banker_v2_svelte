<script lang="ts" generics="T">
  import type { Column, IconProps, TableAction } from "$lib/ts/components";
  import {
    getAlignmentClass,
    type DisplayMedia,
  } from "$lib/ts/enums/primitives";
  import { type Component } from "svelte";

  type DataTableProps = {
    data: T[];
    columns: Column<T>[];
    actions: TableAction<T>[];
    loading?: boolean;
    disMedia?: DisplayMedia;
  };

  let {
    data = [],
    columns,
    actions = [],
    loading = false,
  }: DataTableProps = $props();
</script>

<div class="_table_container">
  <table class="_table_element">
    <thead class="_table_head">
      <tr class='_table_data_row'>
        {#each columns as column}
          <th
            class="_table_header _table_padding {getAlignmentClass(
              column.alignment,
            )} "
          >
            {column.header}
          </th>
        {/each}
        {#if actions.length}
          <th class="_table_header _table_action_header" 
            >• • •</th
          >
        {/if}
      </tr>
    </thead>

    <tbody class="overflow overflow-x-auto whitespace-nowrap">
      {#if loading}
        <tr class='_table_data_row'>
          <td colspan={columns.length + 1} class="text-center p-6">
            Loading...
          </td>
        </tr>
      {:else}
        {#each data as row}
          <tr class="_table_data_row">
            {#each columns as column}
              <td
                class="_table_data_cell _table_padding {column.class ??
                  'w-fit'} {getAlignmentClass(column.alignment)}"
              >
                <render class={getAlignmentClass(column.alignment)}>
                  {row[column.key]}
                </render>
              </td>
            {/each}
            {#if actions.length}
              <td class="_table_data_action _table_padding _table_data_cell">
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
      {/if}
    </tbody>
  </table>
</div>
