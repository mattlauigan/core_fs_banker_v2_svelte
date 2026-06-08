// import { dev } from "$app/environment";
// import type { Cookies } from "@sveltejs/kit";

// type CookieOptions = {
//   path?: string;
//   maxAge?: number;
//   httpOnly?: boolean;
//   secure?: boolean;
//   sameSite?: "strict" | "lax" | "none";
// };

// const defaults = {
//   path: "/",
//   httpOnly: true,
//   secure: !dev,
//   sameSite: "lax" as const,
// };

// export const utilsCookie = {
//   get: (cookies: Cookies, key: string): string | undefined => {
//     return cookies.get(key);
//   },

//   set: (
//     cookies: Cookies,
//     key: string,
//     value: string,
//     options: CookieOptions = {},
//   ): void => {
//     cookies.set(key, value, {
//       ...defaults,
//       ...options,
//     });
//   },

//   remove: (cookies: Cookies, key: string): void => {
//     cookies.delete(key, {
//       path: "/",
//     });
//   },

//   has: (cookies: Cookies, key: string): boolean => {
//     return !!cookies.get(key);
//   },
// };
// ------------------------------------------------------------------------------------------------------------
// import type { Cookies } from "@sveltejs/kit";
// import { dev } from "$app/environment";

// export class AuthCookie {
//   constructor(private cookies: Cookies) {}

//   setToken(token: string) {
//     this.cookies.set("token", token, {
//       path: "/",
//       httpOnly: true,
//       secure: !dev,
//       sameSite: "strict",
//     });
//   }

//   getToken() {
//     return this.cookies.get("token");
//   }

//   clear() {
//     this.cookies.delete("token", {
//       path: "/",
//     });
//   }

//   hasToken() {
//     return !!this.cookies.get("token");
//   }
// }

import type { Cookies } from "@sveltejs/kit";

export function createCookie(cookies: Cookies) {
  return {
    get: (key: string) => cookies.get(key),

    set: (key: string, value: string) =>
      cookies.set(key, value, {
        path: "/",
        httpOnly: true,
      }),

    remove: (key: string) =>
      cookies.delete(key, {
        path: "/",
      }),
  };
}
