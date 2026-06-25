// import { env } from "$env/dynamic/private";
import type {
  Login,
  TerminalRegistration as TermRegData,
} from "$lib/ts/data/auth";
import type {
  ChangePassword,
  Login as LoginForm,
  TerminalRegistration,
} from "$lib/ts/forms/auth";
import type { ErrorResponse, ResponseData } from "$lib/ts/types/app";
import { utilsHttp } from "../../utils/http";

const change_password = (formData: ChangePassword) => {
  return utilsHttp
    .put<ResponseData<Login>>("/auth/password", formData)
    .then((response: ResponseData<Login>) => {
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

const login = (formData: LoginForm): Promise<ResponseData<Login>> => {
  return new Promise((resolve, reject) => {
    utilsHttp
      .get<ResponseData<Login>>("/auth/login")
      .then((response: ResponseData<Login>) => {
        resolve(response);
      })
      .catch((error: ErrorResponse) => {
        reject(error);
      });
  });
};

const terminal_registration = (
  data: TerminalRegistration,
): Promise<ResponseData<TermRegData>> => {
  return new Promise((resolve, reject) => {
    utilsHttp
      .get<ResponseData<TermRegData>>("terminal_registration")
      .then((response: ResponseData<TermRegData>) => {
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
