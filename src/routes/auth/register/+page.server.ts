import { goto } from "$app/navigation";
import { fail, type RequestEvent } from "@sveltejs/kit";

import type { Actions } from "$lib/ts/types/actions";
import authService from "$lib/services/authService";
import { register } from "$stores/authStore";

export const actions: Actions = {
  handleRegister: async ({ request, cookies }: RequestEvent) => {
    try {
      const formData = await request.formData();
      const username = formData.get("username")?.toString() ?? "";
      const termcode = formData.get("termcode")?.toString() ?? "";

      if (!username || !termcode) {
        return fail(400, {
          message: "Username and term code are required",
        });
      }

      const response = await register({ username, termcode });
      // ✅ Store + localStorage updated — redirect or show success
      window.location.href = "/dashboard";

      // utilsCookie.set(
      //   e.cookies,
      //   "registration_code",
      //   response.payload.registration_code,
      // );

      // const cookie = createCookie(cookies);

      // cookie.set("registration_code", response.payload.registration_code);

      return response;
    } catch (error) {
      console.error("Registration error:", error); // add this
      return fail(400, {
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  },
};
