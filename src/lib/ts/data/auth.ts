// import type { Branch } from "./branch";
// import type { Terminal } from "./terminal";
// import type { BaseUser } from "./user";

import type { UserData } from "./access";
import type { Branch } from "./branch";
import type { TerminalData } from "./terminal";


export type Login = {
  access_token: string;
  token?: string;
};

export interface RegistrationData {
  branch: Branch;
  terminal: TerminalData;
  term_code: string;
  term_id: number;
  term_desc: string;

  registration_code: string;
  // user: BaseUser
}

export interface LoginData {
  access_token: string;
  token?: string;
}

export interface AuthApiData {
  token: string;
  expiresIn?: number; // seconds until expiry (e.g. 3600)
  user?: UserData; // some APIs return user data alongside the token
  terminal?: TerminalData
}
