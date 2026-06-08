<script lang="ts">
  import UserStore from "$stores/auth";
  import { goto } from "$app/navigation";
  import Button from "$components/primitives/Button.svelte";
  import TextInput from "$components/primitives/TextInput.svelte";

  const AuthStore = UserStore();

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
          <p class="text-base"><!-- branch--></p>
          <p class="font-sm"><!-- Terminal--></p>
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
        <TextInput
          id="username"
          name="username"
          label="Username"
          style="dark w-full"
          required
        />

        <TextInput
          id="password"
          name="password"
          label="Password"
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
