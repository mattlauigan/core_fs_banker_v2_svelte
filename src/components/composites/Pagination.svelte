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

<div class="bg-slate-100 flex items-center justify-between px-4 py-3 text-[.9rem]">
  <div class=" text-slate-500 pl-2.5">
    Page {page} of {totalPages}
  </div>

  <div class="flex items-center gap-2">
    <button
      onclick={() => goToPage(1)}
      disabled={page === 1}
      class="px-3 py-2  bg-white shadow-sm rounded disabled:opacity-50"
    >
      &lt;&lt;
    </button>

    <button
      onclick={() => goToPage(page - 1)}
      disabled={page === 1}
      class="px-3 py-2  bg-white shadow-sm rounded disabled:opacity-50"
    >
      ← Prev
    </button>

    {#each pages as p}
      <button
        onclick={() => goToPage(p)}
        class={`min-w-10 px-3 py-2   rounded shadow-sm ${
          p === page
            ? "bg-slate-800 text-white -blue-600"
            : "hover:bg-gray-100"
        }`}
      >
        {p}
      </button>
    {/each}

    <button
      onclick={() => goToPage(page + 1)}
      disabled={page === totalPages}
      class="px-3 py-2  bg-white rounded disabled:opacity-50"
    >
      Next →
    </button>

    <button
      onclick={() => goToPage(totalPages)}
      disabled={page === totalPages}
      class="px-3 py-2  bg-white rounded disabled:opacity-50"
    >
      &gt;&gt;
    </button>
  </div>
</div>