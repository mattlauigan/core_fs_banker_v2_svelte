<script lang="ts">
    import type { Snippet } from "svelte";

    type QuickLinkProps = {
        label?: string;
        route?: string;
        style?: string;
        children?: Snippet;
    };

    let { label, route = "#", style, children }: QuickLinkProps = $props();
</script>

<a href={route} class={style}>
    {#if label}
        {label}
    {:else if children}
        {@render children()}
    {/if}
</a>
