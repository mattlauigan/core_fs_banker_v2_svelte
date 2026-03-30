<script lang="ts">
	import './layout.css';

	let { children } = $props();

	import Header from "../components/header/Header.svelte";

	// import Header from '$components/header/Header.css'
</script>

<Header />
<div class="content">{@render children()}</div>

<style>
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-inline: auto;
		overflow: hidden;
		z-index: 1;
		margin-top: 8vh;
		padding-top: 1.5rem;
	}
</style>
