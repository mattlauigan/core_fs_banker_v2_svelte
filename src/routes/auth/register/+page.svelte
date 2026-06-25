<script lang="ts">
  import Button from "$components/primitives/Button.svelte";
  import DialogWindow from "$components/layouts/DialogWindow.svelte";
  import TextInput from "$components/primitives/TextInput.svelte";
  import UserStore from "$stores/auth";
  import { ModalTypeEnum } from "$lib/ts/enums/modal";
  import { goto } from "$app/navigation";

  const AuthStore = UserStore();
  let message: string = $state("Terminal Registration Successful");

  $effect(() => {
    console.log("AuthStore state changed:", {
      isAuthenticated: $AuthStore.isAuthenticated,
      isRegistered: $AuthStore.isRegistered,
    });

    if ($AuthStore.isRegistered) {
      goto("/auth/login", { replaceState: true });
    }
  });
</script>

<div class="_register_page">
  <div class="_register_container">
    <div class="_register_info">
      <article>
        <span
          class="text-primary-900 font-bold tracking-wide text-base md:text-sm sm:text-xs"
        >
          <h2 class="text-2xl">CoreFS Banker</h2>
          <h2  class="text-primary-700">Powering Smarter Financial Management</h2>
        </span>
        <!-- <span class="text-gray-500">
          <p class="text-base">{$AuthStore.accessData?.branch.name}</p>
          <p class="font-sm">{$AuthStore.accessData?.termdesc}</p>
        </span> -->
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
      </span>
      <form autocomplete="off" method="POST" action="?">
        <TextInput
          id="login-user"
          name="login-user"
          label="Username"
          style="dark w-full"
          required
        />
        <TextInput
          id="terminalId"
          name="terminalId"
          label="Terminal ID"
          style="dark w-full"
          required
        />

        <Button
          type="submit"
          label="Terminal Registration"
          variant="primary"
        />
      </form>
    </div>
  </div>
</div>

<DialogWindow
  title="Registration"
  bind:show={$AuthStore.isRegistered}
  modalType={ModalTypeEnum.INFO}
  {message}
  onSubmit={() => {}}
/>
