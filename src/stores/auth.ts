import { writable } from "svelte/store";
import type { TerminalRegistration } from "$types/data/auth";
import { ls } from "$lib/services/ls";
import { createCookie } from "../utils/cookies";
import authService from "$lib/services/authService";
import type { Login } from "$lib/ts/forms/auth";
import type { RequestEvent } from "../routes/auth/login/$types";

export type UserState = {
  isAuthenticated: boolean;
  isRegistered: boolean;
  isChangePassword: boolean;
  accessData: TerminalRegistration | null;
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
    register: async (data: TerminalRegistration) => {



      // const cookie = createCookie(cookie);

      // return response;
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

    setAccessData: (accessData: TerminalRegistration) => {
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
