import type { Branch } from "./branch";
import type { Terminal } from "./terminal";
import type { BaseUser } from "./user";

export type Login = {
  access_token: string;
  token?: string;
};

export type TerminalRegistration = {
  branch: Branch;
  terminal: Terminal;
  registration_code: string;
  user: BaseUser
};
