import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IPaginationOptions,
  IUpdateOptions,
} from '../../../types/index';
import { IArtist, IArtistOptions } from '../artists.types';

export const artistsResolvers = {
  Query: {
    getArtists: async (
      _: any,
      options: IPaginationOptions,
      { dataSources: { artistsService } }: IContext
    ): Promise<Array<IArtist>> => {
      return await artistsService.getArtists(options);
    },

    getArtist: async (
      _: any,
      { id }: IArtist,
      { dataSources: { artistsService } }: IContext
    ): Promise<IArtist> => {
      return await artistsService.getArtist(id);
    },
  },

  Mutation: {
    addArtist: async (
      _: any,
      { inputOptions }: IAddAOptions<IArtistOptions>,
      { token, dataSources: { artistsService } }: IContext
    ): Promise<IArtist | null> => {
      if (!token) {
        return null;
      }

      return await artistsService.addArtist(inputOptions);
    },

    updateArtist: async (
      _: any,
      options: IUpdateOptions<IArtistOptions>,
      { token, dataSources: { artistsService } }: IContext
    ): Promise<IArtist | null> => {
      if (!token) {
        return null;
      }

      return await artistsService.updateArtist(options);
    },

    removeArtist: async (
      _: any,
      { id }: IArtist,
      { token, dataSources: { artistsService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      if (!token) {
        return null;
      }

      return await artistsService.removeArtist(id);
    },
  },
};
