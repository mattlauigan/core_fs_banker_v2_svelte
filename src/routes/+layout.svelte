<script lang="ts">
  const authStore = userStore();
  import "./layout.css";
  import Header from "../components/header/Header.svelte";
  import userStore from "$stores/auth";

  let { children } = $props();
</script>

{#if $authStore.isAuthenticated}
  <Header />
{/if}

{@render children()}
