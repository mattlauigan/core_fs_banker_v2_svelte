import type { Branch } from "./base";
import type { Date, DateTimeString } from "$types/types/app";

export type BaseUser = {
  id: number;
};

export interface UserIcon extends BaseUser {
  usericon?: string;
}

export interface UserImage extends BaseUser {
  userimage?: string;
}

export type Role = {
  id: number;
  name: string;
};

export interface User extends BaseUser {
  name: string;
  username: string;
  status: string;
  expire_at?: DateTimeString;
  password_expire_at?: DateTimeString;
  last_login?: DateTimeString;
  created_at?: DateTimeString;
  branch: Branch;
  role: Role;
  cashier?: UserCashier;
}

export type UserCashier = {
  client_user_id: number;
  ct_user_id: number;
  ct_start_date?: DateTimeString;
  ct_end_date?: DateTimeString;
  effective_at?: Date;
  dep_bank_acct_use_id?: string;
};
