import type { Branch } from "../data/branch";

export type Registration = {
  terminal: Terminal;
  branch: Branch;
  registration_code: string;
  error?: string;
};

export type Terminal = {
  id: number;
  code: string;
  name: string;
};
