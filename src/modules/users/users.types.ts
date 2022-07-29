export interface ILoginUserOptions {
  email: string;
  password: string;
}

export interface IRegistrationUserOptions extends ILoginUserOptions {
  firstName: string;
  lastName: string;
}

export interface IUser extends IRegistrationUserOptions {
  id: string;
}
export interface IUserTokenResponse {
  jwt: string;
}
