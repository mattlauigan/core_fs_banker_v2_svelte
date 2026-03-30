<script lang="ts">
	import './layout.css';

	let { children } = $props();

	import Header from "../components/header/Header.svelte";

	// import Header from '$components/header/Header.css'
</script>

<Header />
<div class="_content">{@render children()}</div>
