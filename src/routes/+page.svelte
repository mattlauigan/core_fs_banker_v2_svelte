<script lang="ts">
  import Hero from "$components/Hero.svelte";
  import TextField from "$components/inputs/TextField.svelte";
  import {
    ConfirmationIcon,
    CycleIcon,
    DeleteIcon,
    ErrorIcon,
    InfoIcon,
    NotificationIcon,
    SearchIcon,
    SettingsIcon,
    SuccessIcon,
    UserIcon,
    WarningIcon,
  } from "$components/icons";
  // src/routes/dashboard/+page.server.js
  import { redirect } from "@sveltejs/kit";
  import useAuthStore from "../stores/auth";

  const AuthStore = useAuthStore();



  $effect(() => {
    if ($AuthStore.isLoggedIn === false) {
      throw redirect(302, "/auth/login");
    }
  });
</script>

<Hero />
<TextField id="trial" name="trial" label="Trial 2" style="w-75" />
<div class="flex space-around w-full">
  <ConfirmationIcon width={48} height={48} />
  <CycleIcon width={48} height={48} />
  <ErrorIcon width={48} height={48} />
  <InfoIcon width={48} height={48} />
  <NotificationIcon width={48} height={48} />
  <SearchIcon width={48} height={48} />
  <SettingsIcon width={48} height={48} />
  <SuccessIcon width={48} height={48} />
  <UserIcon width={48} height={48} />
  <WarningIcon width={48} height={48} />

  <DeleteIcon width={48} height={48} />
</div>
<br />
