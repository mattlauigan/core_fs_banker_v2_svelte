<script lang="ts">
  import "./layout.css";
  import useAuthStore from "../stores/auth";

  const AuthStore = useAuthStore();

  let { children } = $props();

  if ($AuthStore.isLoggedIn) {
    console.log("User is authenticated");
  } else {
    console.log("User is not authenticated");
  }

  import Header from "../components/header/Header.svelte";
</script>

{#if $AuthStore.isLoggedIn}
  <Header />
{/if}

<div class="_content">{@render children()}</div>
