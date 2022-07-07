import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IPaginationOptions,
  IUpdateOptions,
} from '../../../types/index';
import { IBand, IBandOptions } from '../bands.types';

export const bandsResolvers = {
  Query: {
    getBands: async (
      _: any,
      options: IPaginationOptions,
      { dataSources: { bandsService } }: IContext
    ): Promise<Array<IBand>> => {
      return await bandsService.getBands(options);
    },

    getBand: async (
      _: any,
      { id }: IBand,
      { dataSources: { bandsService } }: IContext
    ): Promise<IBand> => {
      return await bandsService.getBand(id);
    },
  },

  Mutation: {
    addBand: async (
      _: any,
      { inputOptions }: IAddAOptions<IBandOptions>,
      { token, dataSources: { bandsService } }: IContext
    ): Promise<IBand | null> => {
      if (!token) {
        return null;
      }

      return await bandsService.addBand(inputOptions);
    },

    updateBand: async (
      _: any,
      options: IUpdateOptions<IBandOptions>,
      { token, dataSources: { bandsService } }: IContext
    ): Promise<IBand | null> => {
      if (!token) {
        return null;
      }

      return await bandsService.updateBand(options);
    },

    removeBand: async (
      _: any,
      { id }: IBand,
      { token, dataSources: { bandsService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      if (!token) {
        return null;
      }

      return await bandsService.removeBand(id);
    },
  },
};
