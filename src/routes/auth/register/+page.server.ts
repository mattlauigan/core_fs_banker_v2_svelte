import type { Actions } from "$lib/ts/types/actions";
import { fail, type RequestEvent } from "@sveltejs/kit";
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

      return await register({ username, termcode });

    } catch (error) {
      console.error("Registration error:", error); 
      return fail(400, {
        message: error instanceof Error ? error.message : "Registration failed",
      });
    }
  },
};
