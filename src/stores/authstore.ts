import { writable } from "svelte/store";
import { browser } from "$app/environment";

const TOKEY_KEY = "jwt_token";

const initialToken = browser ? localStorage.getItem(TOKEY_KEY) : null;
export const authStore = writable({
  isAuthenticated: !!initialToken,
  token: initialToken,
});

if (browser) {
  authStore.subscribe(({ token }) => {
    if (token) {
      localStorage.setItem(TOKEY_KEY, token);
    } else {
      localStorage.removeItem(TOKEY_KEY);
    }
  });
}
