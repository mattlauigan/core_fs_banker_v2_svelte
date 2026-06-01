import type { Access } from "$lib/ts/data/auth";
import type { ErrorResponse, ResponseData } from "$lib/ts/types/app";
import { http } from "../../utils/http";

export type LoginFormData = {
  username: string;
  password: string;
};

export type ChangePasswordFormData = {
  token: string;
  password_old: string;
  password: string;
  password_confirmation: string;
};

export type LoginResponse = {
  access_token: string;
  token?: string;
  username: string;
};

const change_password = (formData: ChangePasswordFormData) => {
  return http
    .put<ResponseData<LoginResponse>>("/auth/password", formData)
    .then((response: ResponseData<LoginResponse>) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const getinfo = (): Promise<Access> => {
  return new Promise((resolve, reject) => {
    http
      .get<ResponseData<Access>>("/app/v1/access/info")
      .then((res: ResponseData<Access>) => {
        resolve(res.payload);
      })
      .catch((error: ErrorResponse | null) => {
        reject(error);
      });
  });
};

const login = (
  formData: LoginFormData,
): Promise<ResponseData<LoginResponse>> => {
  return new Promise((resolve, reject) => {
    http
      .post<ResponseData<LoginResponse>>("/auth/loginxxx", formData)
      .then((response: ResponseData<LoginResponse>) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const authService = {
  change_password,
  getinfo,
  login,
};

export default authService;
