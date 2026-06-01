import { goto } from "$app/navigation";
import authService from "$lib/services/authService";
import { fail, type RequestEvent } from "@sveltejs/kit";

import type { Actions } from "$lib/ts/types/actions";

export const actions: Actions = {
  login: async ({ request, cookies }: RequestEvent) => {
    try {
      const formData = await request.formData();

      const username = formData.get("username")?.toString() ?? "";

      const password = formData.get("password")?.toString() ?? "";

      if (!username || !password) {
        return fail(400, {
          message: "Username and password are required",
        });
      }

      const response = await authService.login({
        username,
        password,
      });

      cookies.set("token", response.payload.access_token, {
        path: "/auth/loginssss",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });

      goto("/");
    } catch (error) {
      return fail(400, { message: "Login failed" });
    }
  },
};
