export type ChangePasswordFormData = {
  token: string;
  password_old: string;
  password: string;
  password_confirmation: string;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type RegistrationFormData = {
  username: string;
  termcode: string;
};
