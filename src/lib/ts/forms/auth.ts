export type ChangePassword = {
  token: string;
  password_old: string;
  password: string;
  password_confirmation: string;
};

export type Login = {
  username: string;
  password: string;
};

export type TerminalRegistration = {
  username: string;
  termcode: string;
};
