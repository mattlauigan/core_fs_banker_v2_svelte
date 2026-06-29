<script lang="ts">
  import "./layout.css";
  import Header from "../components/layouts/Header.svelte";
  import {registrationStore} from "$stores/authStore"
  let isRegistered = $derived($registrationStore.isRegistered)

  let { children } = $props();
</script>

{#if isRegistered }
  <Header />
{/if}

{@render children()}
