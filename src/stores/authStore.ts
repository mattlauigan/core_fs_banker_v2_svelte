// src/stores/userStore.ts
import { AUTH_KEY, AUTH_REG, USER_KEY } from "$lib/config/auth";
import authService from "$lib/services/authService";
import type { UserData } from "$lib/ts/data/access";
import type { AuthApiData } from "$lib/ts/data/auth";
import type { RegistrationData, TerminalData } from "$lib/ts/data/terminal";
import type { LoginFormData, RegistrationFormData } from "$lib/ts/forms/auth";
import type {
  AuthState,
  RegistrationState,
  UserState,
} from "$lib/ts/types/auth";
import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment"
import { ls } from "$lib/services/ls";

function loadRegistration(): RegistrationState {
  try {
    const raw = localStorage.getItem(AUTH_REG);
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
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return { token: null, expiresAt: null, isAuthenticated: false };
    const parsed: AuthState = JSON.parse(raw);
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return { token: null, expiresAt: null, isAuthenticated: false };
    }
    return parsed;
  } catch {
    return { token: null, expiresAt: null, isAuthenticated: false };
  }
}

function loadUser(): UserData | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

function saveAuth(state: AuthState): void {
  if (!browser) return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(state));
}

function saveRegistration(state: RegistrationState): void {
  if (!browser) return;
  ls.add(AUTH_REG, JSON.stringify(state))

}

export function saveRegFromServer(result: RegistrationData): void {
  applyRegistrationResponse(
    { registration_code: result.registration_code!, branch: result.branch, terminal: result.terminal },
  );
}

function saveUser(user: UserData): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearStorage(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

// ─── Store Initialization (hydrate from localStorage on load) ─────────────────

const initialAuth = loadAuth();
const initialUser = loadUser();
const initialRegistration = loadRegistration();

// ─── Writable Stores ──────────────────────────────────────────────────────────

const authStore = writable<AuthState>(initialAuth);
export const registrationStore = writable<RegistrationState>(initialRegistration);
const userStore = writable<UserState>({
  profile: initialUser,
  isLoading: false,
  error: null,
});

// ─── Derived: isAuthenticated (reactive boolean for UI) ───────────────────────

export const isAuthenticated = derived(
  authStore,
  ($auth) => $auth.isAuthenticated,
);
export const currentUser = derived(userStore, ($user) => $user.profile);
export const authToken = derived(authStore, ($auth) => $auth.token);
export const isLoading = derived(userStore, ($user) => $user.isLoading);
export const authError = derived(userStore, ($user) => $user.error);

// ─── Internal helper: apply successful auth response ─────────────────────────

function applyAuthResponse(response: AuthApiData, fallbackUser: string): void {
  const expiresAt = response.expiresIn
    ? Date.now() + response.expiresIn * 1000
    : Date.now() + 24 * 60 * 60 * 1000; // default: 24h

  const newAuth: AuthState = {
    token: response.token,
    expiresAt,
    isAuthenticated: true,
  };

  const newUser: UserData = response.user ?? { name: fallbackUser };

  // 1. Persist to localStorage
  saveAuth(newAuth);
  saveUser(newUser);

  // 2. Update stores
  authStore.set(newAuth);
  userStore.update((s) => ({ ...s, profile: newUser, error: null }));
}

function applyRegistrationResponse(
  response: RegistrationData,
  
): void {
  const newReg: RegistrationState = {
    registration_code: response.registration_code,
    branch: response.branch,
    terminal: response.terminal,
    isRegistered: true,
  };
  console.log('dito')
  // 1. Persist to localStorage
  saveRegistration(newReg);
  registrationStore.set(newReg)
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Register a new user.
 * POST /api/auth/register
 */
export async function register(
  payload: RegistrationFormData
): Promise<RegistrationData> {
  userStore.update((s) => ({ ...s, isLoading: true, error: null }));

  try {
    const res = await authService.terminal_registration(payload);
    console.log('REGISTRATION', res.payload)

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
    return res.payload
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
  apiUrl = "/api/auth/login",
): Promise<void> {
  userStore.update((s) => ({ ...s, isLoading: true, error: null }));

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.message ?? `Login failed (${res.status})`);
    }

    const data: AuthApiData = await res.json();
    applyAuthResponse(data, payload.username);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    userStore.update((s) => ({ ...s, error: message }));
    throw err;
  } finally {
    userStore.update((s) => ({ ...s, isLoading: false }));
  }
}

/**
 * Log out: clears both localStorage keys and resets stores.
 */
export function logout(): void {
  clearStorage();
  authStore.set({ token: null, expiresAt: null, isAuthenticated: false });
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
