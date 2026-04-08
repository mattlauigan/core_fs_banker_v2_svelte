<script lang="ts">
  import Mascot from "$lib/assets/mascot.svg";
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
</section>

<style>
  @import "#app.css";
</style>
