<script lang="ts" generics="T">
  import Pagination from "$components/composites/Pagination.svelte";
  import Table from "$components/composites/Table.svelte";
  import type { Column, TableAction } from "$lib/ts/components";
  import type { DisplayMedia } from "$lib/ts/enums/primitives";

  type DataTableProps<T> = {
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
  }: DataTableProps<any> = $props();

  let currentPage = $state(1);
  let pageSize = 10;

  const totalPages = $derived(Math.ceil(data.length / pageSize));

  const paginatedData: any = $derived(
    data.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  );

  $effect(() => {
    if (currentPage > totalPages) {
      currentPage = 1;
    }
  });

  function handlePageChange(page: number) {
    currentPage = page;

    console.log("Loading page", page);

    // fetch data here
  }
</script>

<div class="_group_vr w-19/20">
  <Table data={paginatedData} {columns} {actions}>
    <Pagination
      page={currentPage}
      {totalPages}
      onPageChange={handlePageChange}
    />
  </Table>
</div>
