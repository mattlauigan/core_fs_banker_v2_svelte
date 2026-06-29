import type { Branch } from "../data/branch";
import type { UserData } from "./access";

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
