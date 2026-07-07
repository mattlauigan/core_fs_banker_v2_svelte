<script lang="ts">
  import { authStore, registrationStore, saveAuthFromServer } from "$stores/authStore";
  import { goto } from "$app/navigation";
  import Button from "$components/primitives/Button.svelte";
  import TextInput from "$components/primitives/TextInput.svelte";
  import PasswordInput from "$components/primitives/PasswordInput.svelte";
  import type { ActionResult } from "@sveltejs/kit";
  import type { LoginData } from "$lib/ts/data/access";
  import { enhance } from "$app/forms";

  $effect(() => {
    // console.log("AuthStore state changed:", {
    //   // isAuthenticated: $AuthStore.isAuthenticated,
    //   isRegistered: $registrationStore.isRegistered,
    // });
    if (!$registrationStore.isRegistered) {
      goto("/auth/register", { replaceState: true });
    } else if ($registrationStore.isRegistered && $authStore.is_authenticated) {
      goto("/", { replaceState: true });
    }
  });

  function handleResult() {
    return async ({ result }: { result: ActionResult }) => {
      if (result.type === "success") {
        saveAuthFromServer(result.data as LoginData);
      }
    };
  }
</script>

<div class="_login_page">
  <div class="_login_container">
    <div class="_login_info">
      <article>
        <span
          class="text-primary-900 font-bold tracking-wide text-xl md:text-lg sm:text-base"
        >
          <h2>Baug CARP Benificiaries</h2>
          <h2>Multi-Purpose Coop</h2>
        </span>
        <span class="">
          <p class="text-base text-primary-700">
            {$registrationStore.branch?.name}
          </p>
          <p class="font-sm text-primary-500">
            {$registrationStore.terminal?.name}
          </p>
        </span>
      </article>
    </div>
    <div class="_login_form">
      <span class="text-white gap-y-2 tracking-wider">
        <p
          class="font-stretch-extra-expanded text-6xl md:text-5xl sm:text-3xl pb-2 font-bold skew-x-12"
        >
          Hello !
        </p>
        <p class="font-sm font-medium">Welcome, please login</p>
      </span>
      <form
        autocomplete="off"
        method="POST"
        action="?/handleLogin"
        use:enhance={handleResult}
      >
        <TextInput
          id="username"
          name="username"
          label="Username"
          style=" w-full"
          required
        />

        <PasswordInput
          id="password"
          name="password"
          label="Password"
          style=" w-full"
          required
        />

        <Button label="Login" type="submit" variant="primary" />
      </form>
    </div>
  </div>
</div>
