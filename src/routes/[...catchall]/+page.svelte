<script lang="ts">
  import { page } from "$app/stores";
  import Mascot from "$lib/assets/mascot.svg";

  const path = $page.params.catchall;
</script>

<section class="_route-catchall">
  <!-- <div class="_route_catchall_content"> -->
    <div class="_catchall_mascot_container">
      <img src={Mascot} alt="mascot" class="_catchall_mascot" />
    </div>
    <div class="_catchall_message_container">
      <span class="_catchall_error_code">404</span>
      <strong class="_catchall_message"
        >This is not the web page you are looking for.</strong
      >
    </div>
  <!-- </div> -->
</section>

<style>
  @import "tailwindcss";
  ._route-catchall {
    @apply relative flex flex-col justify-center items-center h-160 w-screen;
    @apply bg-[radial-gradient(at_50%_75%,primary-200,-primary-500,-primary-950)];
  }

  ._catchall_mascot_container {
    @apply absolute top-50 left-50 translate-x-full translate-y-1/2 z-20;
  }

  ._catchall_mascot {
    @apply w-48 h-auto;
  }
  ._catchall_message_container {
    @apply absolute top-0 left-1/2 translate-x-1/2 translate-y-1/2 z-10;
  }
  ._catchall_error_code {
    @apply text-primary-900 text-shadow-[5px_5px_5px_-white-color] text-8xl font-bold;
  }

  ._catchall_message {
    @apply flex p-12 rounded-lg text-2xl w-72 bg-primary-100 text-primary-900 text-shadow-[2px_2px_2px_-accent-003];
  }
</style>
