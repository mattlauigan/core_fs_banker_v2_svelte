<script lang="ts">
  let { children } = $props();
  import Header from "../components/header/Header.svelte";
</script>

<Header />
<div class="content">
  {@render children()}
</div>

<style>
  /* @import url("header.css"); */
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
