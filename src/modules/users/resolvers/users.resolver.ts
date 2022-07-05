import { IContext } from '../../../types/index';
import {
  ILoginUserOptions,
  IRegistrationUserOptions,
  IUser,
  IUserTokenResponse,
} from '../users.types';

export const usersResolvers = {
  Query: {
    userInfo: async (
      _: any,
      { id }: IUser,
      { dataSources: { usersService } }: IContext
    ): Promise<IUser> => {
      return await usersService.userInfo(id);
    },
  },

  Mutation: {
    registrationUser: async (
      _: any,
      options: IRegistrationUserOptions,
      { dataSources: { usersService } }: IContext
    ): Promise<IUser> => {
      return await usersService.registrationUser(options);
    },

    loginUser: async (
      _: any,
      options: ILoginUserOptions,
      { dataSources: { usersService } }: IContext
    ): Promise<IUserTokenResponse> => {
      return await usersService.loginUser(options);
    },
  },
};
