import type { Branch } from "./branch";
import type { TerminalData } from "./terminal";
import type { UserData } from "./user";

export interface RegistrationData {
  branch: Branch;
  terminal: TerminalData;
  term_code: string;
  term_id: number;
  term_desc: string;
  registration_code: string;
}

export interface LoginData {
  token_type: string;
  expires_in: number;
  access_token: string;
  token?: string;
}

export interface AuthApiData {
  token: string;
  expiresIn?: number; // seconds until expiry (e.g. 3600)
  user?: UserData; // some APIs return user data alongside the token
  terminal?: TerminalData;
}
