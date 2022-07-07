import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IPaginationOptions,
  IUpdateOptions,
} from '../../../types/index';
import { ITrack, ITrackOptions } from '../track.types';

export const tracksResolvers = {
  Query: {
    getTracks: async (
      _: any,
      options: IPaginationOptions,
      { dataSources: { tracksService } }: IContext
    ): Promise<Array<ITrack>> => {
      return await tracksService.getTracks(options);
    },

    getTrack: async (
      _: any,
      { id }: ITrack,
      { dataSources: { tracksService } }: IContext
    ): Promise<ITrack> => {
      return await tracksService.getTrack(id);
    },
  },

  Mutation: {
    addTrack: async (
      _: any,
      { inputOptions }: IAddAOptions<ITrackOptions>,
      { token, dataSources: { tracksService } }: IContext
    ): Promise<ITrack | null> => {
      if (!token) {
        return null;
      }

      return await tracksService.addTrack(inputOptions);
    },

    updateTrack: async (
      _: any,
      options: IUpdateOptions<ITrackOptions>,
      { token, dataSources: { tracksService } }: IContext
    ): Promise<ITrack | null> => {
      if (!token) {
        return null;
      }

      return await tracksService.updateTrack(options);
    },

    removeTrack: async (
      _: any,
      { id }: ITrack,
      { token, dataSources: { tracksService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      if (!token) {
        return null;
      }

      return await tracksService.removeTrack(id);
    },
  },
};
