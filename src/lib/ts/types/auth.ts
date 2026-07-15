
import type { Branch } from "../data/branch";
import type { TerminalData } from "../data/terminal";
import type { UserData } from "../data/user";

export interface AuthState {
  token: string | null;
  expires_in: number | null; 
  is_authenticated: boolean;
}

export interface RegistrationState {
  registration_code: string | null
  terminal: TerminalData | undefined
  branch: Branch | undefined
  isRegistered: boolean;
}

export interface UserState {
  profile?: UserData | null;
  isOnline: boolean;
  isLoading: boolean;
  error: string | null;
}
