import type { UserData } from "../data/access";
import type { Branch } from "../data/branch";
import type { TerminalData } from "../data/terminal";

export interface AuthState {
  token: string | null;
  expiresAt: number | null; 
  isAuthenticated: boolean;
}

export interface RegistrationState {
  registration_code: string | null
  terminal: TerminalData | undefined
  branch: Branch | undefined
  isRegistered: boolean;
}

export interface UserState {
  profile: UserData | null;
  isLoading: boolean;
  error: string | null;
}
