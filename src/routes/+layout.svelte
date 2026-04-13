<script lang="ts">
	import './layout.css';

	let { children } = $props();

	import Header from "../components/header/Header.svelte";
</script>

<Header />
<div class="_content">{@render children()}</div>
