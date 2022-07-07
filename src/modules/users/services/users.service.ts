import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import {
  ILoginUserOptions,
  IRegistrationUserOptions,
  IUser,
  IUserTokenResponse,
} from '../users.types';

enum URL_POINTS {
  login = '/login',
  register = '/register',
}

export interface IUserService extends RESTDataSource {
  baseURL?: string | undefined;

  userInfo: (id: string) => Promise<IUser>;
  registrationUser: (options: IRegistrationUserOptions) => Promise<IUser>;
  loginUser: (options: ILoginUserOptions) => Promise<IUserTokenResponse>;
}

class UsersService extends RESTDataSource implements IUserService {
  constructor() {
    super();
    this.baseURL = process.env.USERS_URL || '';
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  userInfo = async (id: string): Promise<IUser> => {
    const { _id, ...last } = await this.get(`/${encodeURIComponent(id)}`);

    return { id: _id, ...last };
  };

  registrationUser = async (options: IRegistrationUserOptions): Promise<IUser> => {
    const { _id, ...last } = await this.post(URL_POINTS.register, options);

    return { id: _id, ...last };
  };

  loginUser = async (options: ILoginUserOptions): Promise<IUserTokenResponse> => {
    return await this.post(URL_POINTS.login, options);
  };
}

export const usersService = new UsersService();
