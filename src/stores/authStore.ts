// src/stores/userStore.ts

import authService from "$lib/services/authService";
import type { AuthApiData, LoginData } from "$lib/ts/data/auth";
import type { RegistrationData, TerminalData } from "$lib/ts/data/terminal";
import type { LoginFormData, RegistrationFormData } from "$lib/ts/forms/auth";
import type {
  AuthState,
  RegistrationState,
  UserState,
} from "$lib/ts/types/auth";
import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment";
import { ls } from "$lib/services/ls";
import type { UserData } from "$lib/ts/data/user";
import {
  LSKEY_AUTH_KEY,
  LSKEY_REG,
  LSKEY_USER_KEY,
} from "$lib/config/constants";
import type { ResponseData } from "$lib/ts/types/app";

function loadRegistration(): RegistrationState {
  try {
    const raw = localStorage.getItem(LSKEY_REG);
    if (!raw)
      return {
        registration_code: null,
        branch: undefined,
        isRegistered: false,
        terminal: undefined,
      };
    return JSON.parse(raw);
    // return parsed;
  } catch {
    return {
      registration_code: null,
      branch: undefined,
      terminal: undefined,
      isRegistered: false,
    };
  }
}

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(LSKEY_AUTH_KEY);
    if (!raw) return { token: null, expires_in: null, is_authenticated: false };
    const parsed: AuthState = JSON.parse(raw);
    if (parsed.expires_in && Date.now() > parsed.expires_in) {
      localStorage.removeItem(LSKEY_AUTH_KEY);
      return { token: null, expires_in: null, is_authenticated: false };
    }
    return parsed;
  } catch {
    return { token: null, expires_in: null, is_authenticated: false };
  }
}

function loadUser(): UserData | null {
  try {
    const raw = localStorage.getItem(LSKEY_USER_KEY);
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

function saveAuth(state: AuthState): void {
  if (!browser) return;
  localStorage.setItem(LSKEY_AUTH_KEY, JSON.stringify(state));
}

export function saveAuthFromServer(result: LoginData): void {
  applyAuthResponse({
    token: result.token!,
    expires_in: result.expires_in,
    is_authenticated: true,
  });
}

function saveRegistration(state: RegistrationState): void {
  if (!browser) return;
  ls.add(LSKEY_REG, JSON.stringify(state));
}

export function saveRegFromServer(result: RegistrationData): void {
  applyRegistrationResponse({
    registration_code: result.registration_code!,
    branch: result.branch,
    terminal: result.terminal,
  });
}

function saveUser(user: UserData): void {
  localStorage.setItem(LSKEY_USER_KEY, JSON.stringify(user));
}

function clearStorage(): void {
  localStorage.removeItem(LSKEY_AUTH_KEY);
  localStorage.removeItem(LSKEY_USER_KEY);
}

// ─── Store Initialization (hydrate from localStorage on load) ─────────────────

const initialAuth = loadAuth();
const initialUser = loadUser();
const initialRegistration = loadRegistration();

// ─── Writable Stores ──────────────────────────────────────────────────────────

export const authStore = writable<AuthState>(initialAuth);
export const registrationStore =
  writable<RegistrationState>(initialRegistration);
const userStore = writable<UserState>({
  profile: initialUser,
  isLoading: false,
  error: null,
});

// ─── Derived: isAuthenticated (reactive boolean for UI) ───────────────────────

export const isAuthenticated = derived(
  authStore,
  ($auth) => $auth.is_authenticated,
);
export const currentUser = derived(userStore, ($user) => $user.profile);
export const authToken = derived(authStore, ($auth) => $auth.token);
export const isLoading = derived(userStore, ($user) => $user.isLoading);
export const authError = derived(userStore, ($user) => $user.error);

// ─── Internal helper: apply successful auth response ─────────────────────────

function applyAuthResponse(response: AuthState): void {
  const expiresAt = response.expires_in
    ? Date.now() + response.expires_in * 1000
    : Date.now() + 24 * 60 * 60 * 1000; // default: 24h

  const newAuth: AuthState = {
    token: response.token!,
    expires_in: expiresAt,
    is_authenticated: true,
  };

  // const newUser: UserData = response.user ?? { name: fallbackUser };

  // 1. Persist to localStorage
  saveAuth(newAuth);
  // saveUser(newUser);

  // 2. Update stores
  authStore.set(newAuth);
  // userStore.update((s) => ({ ...s, profile: newUser, error: null }));
}

function applyRegistrationResponse(response: RegistrationData): void {
  const newReg: RegistrationState = {
    registration_code: response.registration_code,
    branch: response.branch,
    terminal: response.terminal,
    isRegistered: true,
  };

  saveRegistration(newReg);
  registrationStore.set(newReg);
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Register a new user.
 * POST /api/auth/register
 */
export async function register(
  payload: RegistrationFormData,
): Promise<RegistrationData> {
  userStore.update((s) => ({ ...s, isLoading: true, error: null }));

  try {
    const res = await authService.terminal_registration(payload);
    if (res.code !== "SUCCESS") {
      throw new Error(res.message);
    }

    const data: RegistrationData = await res.payload;
    if (data.terminal) {
      data.terminal.code = data.terminal.name ?? payload.termcode;
    } else {
      data.terminal = { name: payload.termcode };
    }

    applyRegistrationResponse(data);
    return res.payload;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    registrationStore.update((s) => ({ ...s, error: message }));
    throw err;
  } finally {
    registrationStore.update((s) => ({ ...s, isLoading: false }));
  }
}

/**
 * Log in an existing user.
 * POST /api/auth/login
 */
export async function login(
  payload: LoginFormData,
): Promise<LoginData> {
  userStore.update((s) => ({ ...s, isLoading: true, error: null }));

  try {
    const res = await authService.login(payload);
    if (res.code !== "SUCCESS") {
      throw new Error(res.message);
    }

    const data: LoginData = await res.payload;
    applyAuthResponse({
      token: data.access_token!,
      expires_in: data.expires_in!,
      is_authenticated: true,
    });

    return res.payload;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    registrationStore.update((s) => ({ ...s, error: message }));
    throw err;
  } finally {
    registrationStore.update((s) => ({ ...s, isLoading: false }));
  }
}

/**
 * Log out: clears both localStorage keys and resets stores.
 */
export function logout(): void {
  clearStorage();
  authStore.set({ token: null, expires_in: null, is_authenticated: false });
  userStore.set({ profile: null, isLoading: false, error: null });
}

/**
 * Clear only the error state (e.g. when user starts typing again).
 */
export function clearError(): void {
  userStore.update((s) => ({ ...s, error: null }));
}

/**
 * Get the current auth token (useful for making authenticated API calls).
 */
export function getToken(): string | null {
  return get(authStore).token;
}

export function getRegistrationState(): boolean {
  return get(registrationStore).isRegistered;
}
