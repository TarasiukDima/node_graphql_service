import { IContext } from '../../../types/index';
import {
  IAddBandOptions,
  IBand,
  IDeleteBandResponse,
  IGetBandsOptions,
  IUpdateBandOptions,
} from '../bands.types';

export const bandsResolvers = {
  Query: {
    getBands: async (
      _: any,
      options: IGetBandsOptions,
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
      { inputOptions }: IAddBandOptions,
      { token, dataSources: { bandsService } }: IContext
    ): Promise<IBand | null> => {
      if (!token) {
        return null;
      }

      return await bandsService.addBand(inputOptions);
    },

    updateBand: async (
      _: any,
      options: IUpdateBandOptions,
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
    ): Promise<IDeleteBandResponse | null> => {
      if (!token) {
        return null;
      }

      return await bandsService.removeBand(id);
    },
  },
};
