import type { Actions } from "$lib/ts/types/actions";
import { fail, type RequestEvent } from "@sveltejs/kit";
import { login } from "$stores/authStore";

export const actions: Actions = {
  handleLogin: async ({ request, cookies }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const username = formData.get("username")?.toString() ?? "";
      const password = formData.get("password")?.toString() ?? "";

      if (!username || !password) {
        return fail(400, {
          message: "Username and password are required",
        });
      }

      return await login({
        username: username,
        password: password,
      });

    } catch (error) {
      console.error("Login error:", error);
      return fail(400, {
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  },
};
