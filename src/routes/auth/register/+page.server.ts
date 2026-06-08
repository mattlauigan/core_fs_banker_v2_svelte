import { goto } from "$app/navigation";
import { fail, type RequestEvent } from "@sveltejs/kit";

import type { Actions } from "$lib/ts/types/actions";
import authService from "$lib/services/authService";

import userStore from "$stores/auth";
import { createCookie } from "../../../utils/cookies";

export const actions: Actions = {
  register: async ({ request, cookies }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const username = formData.get("username")?.toString() ?? "";
      const termcode = formData.get("termcode")?.toString() ?? "";

      if (!username || !termcode) {
        return fail(400, {
          message: "Username and term code are required",
        });
      }

      const response = await authService.terminal_registration({
        username,
        termcode,
      });

      // utilsCookie.set(
      //   e.cookies,
      //   "registration_code",
      //   response.payload.registration_code,
      // );

      const cookie = createCookie(cookies);

      cookie.set("registration_code", response.payload.registration_code);

      // userStore().register(e);

      goto("/");

      return response;
    } catch (error) {
      return fail(400, { message: "Login failed" });
    }
  },
};
