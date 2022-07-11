import { getArrayWithNotEmptyObjects, getArtistsArray, getBandsArray, getGenresArray, getTracksArray } from '../../utils/index';
import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IPaginationOptions,
  IUpdateOptions,
  IServices,
  IItemGetOptions,
} from '../../../types/index';
import { IAlbum, IAlbumOptions, IAlbumWithIDS } from '../albums.types';

const getInfoObjects = async (oneAlbum: IAlbumWithIDS, dataSources: IServices): Promise<IAlbum> => {
  const { artistsService, bandsService, genresService, tracksService } = dataSources;
  return {
    id: oneAlbum.id,
    name: oneAlbum.name,
    released: oneAlbum.released,
    image: oneAlbum.image,
    artists: await getArtistsArray(oneAlbum.artists, artistsService, dataSources),
    bands: await getBandsArray(oneAlbum.bands, bandsService, dataSources),
    tracks: await getTracksArray(oneAlbum.tracks, tracksService, dataSources),
    genres: await getGenresArray(oneAlbum.genres, genresService),
  };
};

const getArrayWithIdsObjects = async (
  array: Array<IAlbumWithIDS>,
  dataSources: IServices
): Promise<Array<IAlbum>> => {
  const promisesAlbumsArray = array.map(
    async (oneAlbum) => await getInfoObjects(oneAlbum, dataSources)
  );
  const albumsAnswers = await Promise.allSettled(promisesAlbumsArray);
  const newAlbums = getArrayWithNotEmptyObjects(albumsAnswers, 'id')

  return newAlbums;
};

export const albumsResolvers = {
  Query: {
    getAlbums: async (
      _: any,
      options: IPaginationOptions,
      { dataSources }: IContext
    ): Promise<Array<IAlbum>> => {
      const albumsWithIds = await dataSources.albumService.getAlbums(options);
      const albums = await getArrayWithIdsObjects(albumsWithIds, dataSources);

      return albums;
    },

    getAlbum: async (
      _: any,
      { id }: IItemGetOptions,
      { dataSources }: IContext
    ): Promise<IAlbum> => {
      const albumWithIds = await dataSources.albumService.getAlbum(id);
      const album = await getInfoObjects(albumWithIds, dataSources);

      return album;
    },
  },

  Mutation: {
    addAlbum: async (
      _: any,
      { inputOptions }: IAddAOptions<IAlbumOptions>,
      { token, dataSources }: IContext
    ): Promise<IAlbum | null> => {
      if (!token) {
        return null;
      }

      const albumWithIds = await dataSources.albumService.addAlbum(inputOptions);
      const album = await getInfoObjects(albumWithIds, dataSources);

      return album;
    },

    updateAlbum: async (
      _: any,
      options: IUpdateOptions<IAlbumOptions>,
      { token, dataSources }: IContext
    ): Promise<IAlbum | null> => {
      if (!token) {
        return null;
      }

      const albumWithIds = await dataSources.albumService.updateAlbum(options);
      const album = await getInfoObjects(albumWithIds, dataSources);

      return album;
    },

    removeAlbum: async (
      _: any,
      { id }: IAlbum,
      { token, dataSources: { albumService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      return !token ? null : await albumService.removeAlbum(id);
    },
  },
};
