import { writable } from "svelte/store";
import type { Access } from "$types/data/auth";
import { ls } from "$lib/services/ls";
import { Bitmap } from "../utils/bitmap";
import { LSKEY_TOKEN } from "$lib/config/constants";
import { goto } from "$app/navigation";

export type UserState = {
  isAuthenticated: boolean;
  isRegistered: boolean;
  isChangePassword: boolean;
  accessData: Access | null;
  error: string | null;
};

const initialState: UserState = {
  isAuthenticated: false,
  isRegistered: false,
  isChangePassword: false,
  accessData: null,
  error: null,
};

const userStore = () => {
  const isBrowser = typeof window !== "undefined";

  // 🔥 restore localStorage
  const stored = isBrowser ? localStorage.getItem("token") : null;

  const state = stored ? JSON.parse(stored) : initialState;

  const store = writable<UserState>(state);

  const { subscribe, set, update } = store;

  return {
    subscribe,

    register: () => {
      update((state) => {
        const updatedState = {
          ...state,
          isRegistered: true,
          error: null,
        };

        ls.add("token", JSON.stringify(updatedState));
        goto("/auth/login");

        return updatedState;
      });
    },

    login: () => {
      update((state) => {
        const updatedState = {
          ...state,
          isAuthenticated: true,
          error: null,
        };

        ls.add("token", JSON.stringify(updatedState));

        return updatedState;
      });
    },

    logout: () => {
      update((state) => {
        const updatedState = {
          ...state,
          isAuthenticated: false,
          error: null,
        };

        ls.add("token", JSON.stringify(updatedState));

        return updatedState;
      });
    },

    setAccessData: (accessData: Access) => {
      update((state) => ({
        ...state,
        accessData,
      }));
    },

    setChangePassword: (value: boolean) => {
      update((state) => ({
        ...state,
        isChangePassword: value,
      }));
    },

    setError: (error: string | null) => {
      update((state) => ({
        ...state,
        error,
      }));
    },

    resetError: () => {
      update((state) => ({
        ...state,
        error: null,
      }));
    },
  };
};

export default userStore;
