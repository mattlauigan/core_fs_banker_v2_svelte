import type { ErrorResponse, ResponseData } from "$types/types/app";
import { ls } from "$lib/services/ls";
import {
  LSKEY_TOKEN,
  LSKEY_TOKENTEMP,
  LSKEY_USERICON,
} from "$lib/config/constants";
import type { Access, Login } from "$types/data/auth";
import { writable, get } from "svelte/store";
import { HttpAction } from "$lib/ts/enums/http";
import { Bitmap } from "../utils/bitmap";

type AuthState = {
  isLoggedIn: boolean;
  isChangePassword: boolean;

  accessData: Access | null;
  error: ErrorResponse | null;
};                    

const initialState: AuthState = {
  isLoggedIn:
    typeof window !== "undefined" ? Boolean(ls.get(LSKEY_TOKEN)) : false,

  isChangePassword: false,

  accessData: null,
  error: null,
};

const useAuthStore =() => {
  const store = writable<AuthState>(initialState);
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,

    isAuthorized: () => {
      if (typeof window === "undefined") return false;

      return Boolean(ls.get(LSKEY_TOKEN));
    },

    onError: (error: ErrorResponse | null) => {
      update((state) => ({
        ...state,
        error,
      }));
    },

    postLogin: (responseData: ResponseData<Login>) => {
      if (responseData.st === HttpAction.CHANGE_PASSWORD) {
        ls.add(LSKEY_TOKENTEMP, responseData.payload.token!);

        update((state) => ({
          ...state,
          error: null,
        }));
      } else {
        ls.add(LSKEY_TOKEN, responseData.payload.access_token!);

        update((state) => ({
          ...state,
          isLoggedIn: true,
          error: null,
        }));
      }
    },

    postChangePassword: () => {
      update((state) => ({
        ...state,
        error: null,
      }));
    },

    setChangePassword: (value: boolean) => {
      update((state) => ({
        ...state,
        isChangePassword: value,
      }));
    },

    setAccessData: (data: Access) => {
      data.modules = Bitmap.extract(data.bitmap);

      update((state) => ({
        ...state,
        accessData: data,
        error: null,
      }));
    },

    reset: () => {
      ls.remove(LSKEY_TOKEN);
      ls.remove(LSKEY_TOKENTEMP);

      localStorage.removeItem(LSKEY_USERICON);

      set({
        isLoggedIn: false,
        isChangePassword: false,
        accessData: null,
        error: null,
      });
    },

    revoke: () => {
      ls.remove(LSKEY_TOKEN);
      ls.remove(LSKEY_TOKENTEMP);

      localStorage.removeItem(LSKEY_USERICON);

      document.cookie =
        "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      set({
        isLoggedIn: false,
        isChangePassword: false,
        accessData: null,
        error: null,
      });
    },

    get: () => get(store),
  };
}

export default useAuthStore;
