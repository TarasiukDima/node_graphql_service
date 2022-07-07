import { IContext, IPaginationOptions } from '../../../types/index';
import { IFavourites } from '../favourites.types';

export const favouritesResolvers = {
  Query: {
    getFavourites: async (
      _: any,
      options: IPaginationOptions,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.getFavourites(options);
    },
  },

  Mutation: {
    addTrackToFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.addTrackToFavourites(id);
    },

    addBandToFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.addBandToFavourites(id);
    },

    addArtistToFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.addArtistToFavourites(id);
    },

    addGenreToFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.addGenreToFavourites(id);
    },

    removeTrackFromFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.removeTrackFromFavourites(id);
    },

    removeBandFromFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.removeBandFromFavourites(id);
    },

    removeArtistFromFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.removeArtistFromFavourites(id);
    },

    removeGenreFromFavourites: async (
      _: any,
      { id }: IFavourites,
      { token, dataSources: { favouritesService } }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      return await favouritesService.removeGenreFromFavourites(id);
    },
  },
};
