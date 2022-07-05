import { IContext } from '../../../types/index';
import {
  IAddArtistOptions,
  IArtist,
  IDeleteArtistResponse,
  IGetArtistsOptions,
  IUpdateArtistOptions,
} from '../artists.types';

export const artistsResolvers = {
  Query: {
    getArtists: async (
      _: any,
      options: IGetArtistsOptions,
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
      { inputOptions }: IAddArtistOptions,
      { token, dataSources: { artistsService } }: IContext
    ): Promise<IArtist | null> => {
      if (!token) {
        return null;
      }

      return await artistsService.addArtist(inputOptions);
    },

    updateArtist: async (
      _: any,
      options: IUpdateArtistOptions,
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
    ): Promise<IDeleteArtistResponse | null> => {
      if (!token) {
        return null;
      }

      return await artistsService.removeArtist(id);
    },
  },
};
