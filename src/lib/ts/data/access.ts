import type { Branch } from "./branch";

export interface UserData {
  id?: string | number;
  name?: string;
  branch?: Branch;
}
