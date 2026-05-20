<script lang="ts">
  import UserStore from "$stores/auth";
  import { goto } from "$app/navigation";
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

    if ($AuthStore.isRegistered) {
      goto("/auth/login");
    }
  });

  async function handleRegistration() {
    AuthStore.register();

    await goto("/login");
  }
</script>

<div class="_register_page">
  <div class="_register_container">
    <div class="_register_info">
      <article>
        <span
          class="text-primary-900 font-bold tracking-wide text-base md:text-sm sm:text-xs"
        >
          <h2>Baug CARP Benificiaries</h2>
          <h2>Multi-Purpose Coop</h2>
        </span>
        <span class="text-gray-500">
          <p class="text-base">{$AuthStore.accessData?.branch.name}</p>
          <p class="font-sm">{$AuthStore.accessData?.termdesc}</p>
        </span>
      </article>
    </div>
    <div class="_register_form">
      <span class="text-white gap-y-2 tracking-wider">
        <span
          class="font-stretch-extra-expanded text-5xl md:text-3xl sm:text-xs pb-2 font-bold pl-6"
        >
          <p>Terminal</p>
          <p>Registration</p>
        </span>
        <!-- <p class="font-sm font-medium">Welcome, please login</p> -->
      </span>
      <form autocomplete="off" onsubmit={handleRegistration}>
        <TextField
          id="login-user"
          name="login-user"
          label="Username"
          style="dark w-full"
          bind:value={username}
          required
        />

        <TextField
          id="terminalId"
          name="terminalId"
          label="Terminal ID"
          bind:value={password}
          style="dark w-full"
          required
        />

        <Button
          type="submit"
          label="Terminal Registration"
          class="m-auto flex items-center justify-center mb-6"
          primary
        />
      </form>
    </div>
  </div>
</div>

<style>
  @import "../../../css/app.css";

  ._register_page {
    @apply bg-linear-to-t from-primary-900 via-primary-950 to-primary-800 min-h-screen flex items-center justify-center overflow-hidden;
  }

  ._register_container {
    @apply bg-black/15 backdrop-blur-sm flex flex-row items-stretch w-[50vw]  max-w-[70vw] rounded-lg shadow-lg overflow-hidden;
  }

  ._register_info {
    @apply flex flex-col text-scripts p-10 pt-80 w-full bg-linear-to-t from-primary-400 to-white basis-1/2;
  }

  ._register_form {
    @apply flex flex-col gap-4 w-full items-center justify-center basis-1/2 p-6;
  }
</style>
