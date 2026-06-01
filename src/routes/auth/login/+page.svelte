<script lang="ts">
  import UserStore from "$stores/auth";
  import { goto, replaceState } from "$app/navigation";
  import Button from "$components/inputs/Button.svelte";
  import TextField from "$components/inputs/TextField.svelte";

  const AuthStore = UserStore();
  let username: string = $state("");
  let password: string = $state("");

  $effect(() => {
    console.log("AuthStore state changed:", {
      isAuthenticated: $AuthStore.isAuthenticated,
      isRegistered: $AuthStore.isRegistered,
    });
    if (!$AuthStore.isRegistered) {
      goto("/auth/register", { replaceState: true });
    } else if ($AuthStore.isAuthenticated) {
      goto("/", { replaceState: true });
    }
  });

  function handleLogin() {
    AuthStore.login();
    goto("/auth/login", {
      replaceState: true,
    });
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
        <span class="text-accent-003">
          <p class="text-base">{$AuthStore.accessData?.branch.name}</p>
          <p class="font-sm">{$AuthStore.accessData?.termdesc}</p>
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
      <form autocomplete="off" method="POST" action="?">
        <TextField
          id="login-user"
          name="login-user"
          label="Username"
          style="dark w-full"
          bind:value={username}
          required
        />

        <TextField
          id="login-password"
          name="login-password"
          label="Password"
          bind:value={password}
          style="dark w-full"
          type="password"
          required
        />

        <Button
          label="Login"
          type="submit"
          primary
          class="m-auto flex items-center justify-center mb-6"
        />
      </form>
    </div>
  </div>
</div>

<style>
  @import "../../../css/app.css";

  ._login_page {
    @apply bg-linear-to-t from-primary-900 via-primary-950 to-primary-800 min-h-screen flex items-center justify-center overflow-hidden;
  }

  ._login_container {
    @apply bg-black/15 backdrop-blur-sm flex flex-row-reverse items-stretch w-[50vw]  max-w-[70vw] rounded-lg shadow-lg overflow-hidden;
  }

  ._login_info {
    @apply flex flex-col text-scripts p-10 pt-80 w-full bg-linear-to-t from-primary-400 to-white basis-1/2;
  }

  ._login_form {
    @apply flex flex-col gap-4 w-full items-center justify-center basis-1/2 p-6;
  }
</style>
