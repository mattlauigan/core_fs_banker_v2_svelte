<script lang="ts">
  type Props = {
    page: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
  };

  let {
    page = 1,
    totalPages = 1,
    onPageChange = () => {},
  }: Props = $props();

  function goToPage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    onPageChange(newPage);
  }

  const pages = $derived.by(() => {
    const result: number[] = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  });
</script>

<div class="flex items-center justify-between px-4 py-3 ">
  <div class="text-[.6rem] text-gray-600">
    Page {page} of {totalPages}
  </div>

  <div class="flex items-center gap-2">
    <button
      onclick={() => goToPage(1)}
      disabled={page === 1}
      class="px-3 py-2 text-[.6rem] bg-white shadow-sm rounded disabled:opacity-50"
    >
      First
    </button>

    <button
      onclick={() => goToPage(page - 1)}
      disabled={page === 1}
      class="px-3 py-2 text-[.6rem] bg-white shadow-sm rounded disabled:opacity-50"
    >
      Previous
    </button>

    {#each pages as p}
      <button
        onclick={() => goToPage(p)}
        class={`min-w-10 px-3 py-2 text-[.6rem]  rounded shadow-sm ${
          p === page
            ? "bg-blue-600 text-white -blue-600"
            : "hover:bg-gray-100"
        }`}
      >
        {p}
      </button>
    {/each}

    <button
      onclick={() => goToPage(page + 1)}
      disabled={page === totalPages}
      class="px-3 py-2 text-[.6rem] bg-white rounded disabled:opacity-50"
    >
      Next
    </button>

    <button
      onclick={() => goToPage(totalPages)}
      disabled={page === totalPages}
      class="px-3 py-2 text-[.6rem] bg-white rounded disabled:opacity-50"
    >
      Last
    </button>
  </div>
</div>