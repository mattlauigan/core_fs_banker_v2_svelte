import type { Branch } from "../data/branch";

export type RegistrationData = {
  terminal: TerminalData;
  branch: Branch;
  registration_code: string;
  error?: string;
};

export type TerminalData = {
  id?: number;
  code?: string;
  name?: string;
};
