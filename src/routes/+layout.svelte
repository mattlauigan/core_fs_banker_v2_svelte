<script lang="ts">
  // const authStore = userStore();
  import "./layout.css";
  import Header from "../components/layouts/Header.svelte";
  // import userStore from "$stores/auth";
  import {getRegistration} from "$stores/authStore"

  let reg = $derived(getRegistration())

  let { children } = $props();
</script>

{#if reg.isRegistered}
  <Header />
{/if}

{@render children()}
