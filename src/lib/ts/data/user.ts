import type { Branch } from "./branch";
import type { Date, DateTimeString } from "$types/types/app";

export type BaseUser = {
  id: number;
  name: string;
  username: string;
  status: string;
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

export interface UserData extends BaseUser {
  name: string;
  username: string;
  status: string;
  expire_at?: DateTimeString;
  password_expire_at?: DateTimeString;
  last_login?: DateTimeString;
  created_at?: DateTimeString;
  branch: Branch;
  role: Role;
}


