<script lang="ts">
  import useAuthStore from "../../../stores/auth";
  import { goto } from "$app/navigation";

  const AuthStore = useAuthStore();

  $effect(() => {
    if ($AuthStore.isLoggedIn) {
      goto("/");
    }
  });

  function handleLogin() {


    goto("/");
  }
</script>

<div class="login-container">
  <h1>Login</h1>
  <form onsubmit={handleLogin}>
    <input
      type="text"
      placeholder="Username"
      bind:value={$AuthStore.accessData.nm}
      required
    />
    <input
      type="password"
      placeholder="Password"
      bind:value={$AuthStore.accessData.password}
      required
    />
    <button type="submit">Login</button>
  </form>
</div>

<style>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .login-container h1 {
    margin-bottom: 20px;
  }

  .login-container input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .login-container button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  .login-container button:hover {
    background-color: #0056b3;
  }
</style>
