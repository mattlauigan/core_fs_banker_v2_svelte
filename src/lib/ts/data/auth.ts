// import type { Branch } from "./branch";
// import type { Terminal } from "./terminal";
// import type { BaseUser } from "./user";

export type Login = {
  access_token: string;
  token?: string;
};

export type TerminalRegistration = {
  // branch: Branch;
  // terminal: Terminal;
  term_code: string;
  term_id: number;
  term_desc: string;

  registration_code: string;
  // user: BaseUser
};
