import { getArtistsArray, getBandsArray, getGenresArray, getTracksArray } from '../../utils/index';
import { IContext, IItemGetOptions, IServices } from '../../../types/index';
import { IFavourites, IFavouritesWithIds } from '../favourites.types';

const getFavouritesInfoObjects = async (
  favourites: IFavouritesWithIds,
  dataSources: IServices
): Promise<IFavourites> => {
  const { artistsService, bandsService, tracksService } = dataSources;
  return {
    id: favourites.id,
    userId: favourites.userId,
    bands: await getBandsArray(favourites.bands, bandsService, dataSources),
    genres: await getGenresArray(favourites.genres, dataSources.genresService),
    artists: await getArtistsArray(favourites.artists, artistsService, dataSources),
    tracks: await getTracksArray(favourites.tracks, tracksService, dataSources),
  };
};

export const favouritesResolvers = {
  Query: {
    getFavourites: async (
      _: any,
      __: any,
      { dataSources }: IContext
    ): Promise<IFavourites | null> => {
      const data = await dataSources.favouritesService.getFavourites();

      return getFavouritesInfoObjects(data, dataSources);
    },
  },

  Mutation: {
    addTrackToFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.addTrackToFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    addBandToFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.addBandToFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    addArtistToFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.addArtistToFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    addGenreToFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.addGenreToFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    removeTrackFromFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.removeTrackFromFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    removeBandFromFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.removeBandFromFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    removeArtistFromFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.removeArtistFromFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },

    removeGenreFromFavourites: async (
      _: any,
      { id }: IItemGetOptions,
      { token, dataSources }: IContext
    ): Promise<IFavourites | null> => {
      if (!token) {
        return null;
      }

      const data = await dataSources.favouritesService.removeGenreFromFavourites(id);

      return getFavouritesInfoObjects(data, dataSources);
    },
  },
};
