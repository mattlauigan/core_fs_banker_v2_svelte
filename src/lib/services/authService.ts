import type { LoginData } from "$lib/ts/data/auth";
import type { RegistrationData } from "$lib/ts/data/terminal";
import type {
  ChangePasswordFormData,
  LoginFormData,
  RegistrationFormData,
} from "$lib/ts/forms/auth";
import type { ErrorResponse, ResponseData } from "$lib/ts/types/app";
import { utilsHttp } from "../../utils/http";

const change_password = (formData: ChangePasswordFormData) => {
  return utilsHttp
    .put<ResponseData<LoginData>>("/auth/password", formData)
    .then((response: ResponseData<LoginData>) => {
      return response;
    })
    .catch((error: ErrorResponse) => {
      throw error;
    });
};

// const getinfo = (): Promise<Access> => {
//   return new Promise((resolve, reject) => {
//     http
//       .get<ResponseData<Access>>("/app/v1/access/info")
//       .then((res: ResponseData<Access>) => {
//         resolve(res.payload);
//       })
//       .catch((error: ErrorResponse | null) => {
//         reject(error);
//       });
//   });
// };

const login = (formData: LoginFormData): Promise<ResponseData<LoginData>> => {
  return new Promise((resolve, reject) => {
    utilsHttp
      .get<ResponseData<LoginData>>("login")
      .then((response: ResponseData<LoginData>) => {
        resolve(response);
      })
      .catch((error: ErrorResponse) => {
        reject(error);
      });
  });
};

const terminal_registration = (
  data: RegistrationFormData,
): Promise<ResponseData<RegistrationData>> => {
  return new Promise((resolve, reject) => {
    utilsHttp
      .get<ResponseData<RegistrationData>>("terminal_registration")
      .then((response: ResponseData<RegistrationData>) => {
        resolve(response);
      })
      .catch((error: ErrorResponse) => {
        reject(error);
      });
  });
};

const authService = {
  change_password,
  // getinfo,
  login,
  terminal_registration,
};

export default authService;
