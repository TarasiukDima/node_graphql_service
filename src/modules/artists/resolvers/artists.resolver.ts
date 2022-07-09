import { getBandsArray } from '../../utils/index';
import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IItemGetOptions,
  IPaginationOptions,
  IServices,
  IUpdateOptions,
} from '../../../types/index';
import { IArtist, IArtistOptions, IArtistWithIDS } from '../artists.types';

const getArtistInfoObjects = async (
  oneArtist: IArtistWithIDS,
  dataSources: IServices
): Promise<IArtist> => {
  return {
    id: oneArtist.id,
    firstName: oneArtist.firstName,
    secondName: oneArtist.secondName,
    middleName: oneArtist.middleName,
    birthDate: oneArtist.birthDate,
    birthPlace: oneArtist.birthPlace,
    country: oneArtist.country,
    instruments: oneArtist.instruments,
    bands: await getBandsArray(oneArtist.bands, dataSources.bandsService, dataSources),
  };
};

const getArrayArtistsWithIdsObjects = async (
  array: Array<IArtistWithIDS>,
  dataSources: IServices
): Promise<Array<IArtist>> => {
  const promisesAlbumsArray = array.map(
    async (oneArtist) => await getArtistInfoObjects(oneArtist, dataSources)
  );
  const albumsAnswers = await Promise.allSettled(promisesAlbumsArray);
  const newAlbums = albumsAnswers.map((res) => (res.status === 'fulfilled' ? res.value : null));

  return newAlbums.filter((el) => el) as Array<IArtist>;
};

export const artistsResolvers = {
  Query: {
    getArtists: async (
      _: any,
      options: IPaginationOptions,
      { dataSources }: IContext
    ): Promise<Array<IArtist>> => {
      const artistsWithIds = await dataSources.artistsService.getArtists(options);
      const albums = await getArrayArtistsWithIdsObjects(artistsWithIds, dataSources);

      return albums;
    },

    getArtist: async (
      _: any,
      { id }: IItemGetOptions,
      { dataSources }: IContext
    ): Promise<IArtist> => {
      const artistWithIds = await dataSources.artistsService.getArtist(id);
      const artist = await getArtistInfoObjects(artistWithIds, dataSources);

      return artist;
    },
  },

  Mutation: {
    addArtist: async (
      _: any,
      { inputOptions }: IAddAOptions<IArtistOptions>,
      { token, dataSources }: IContext
    ): Promise<IArtist | null> => {
      if (!token) {
        return null;
      }

      const artistWithIds = await dataSources.artistsService.addArtist(inputOptions);
      const artist = await getArtistInfoObjects(artistWithIds, dataSources);

      return artist;
    },

    updateArtist: async (
      _: any,
      options: IUpdateOptions<IArtistOptions>,
      { token, dataSources }: IContext
    ): Promise<IArtist | null> => {
      if (!token) {
        return null;
      }

      const artistWithIds = await dataSources.artistsService.updateArtist(options);
      const artist = await getArtistInfoObjects(artistWithIds, dataSources);

      return artist;
    },

    removeArtist: async (
      _: any,
      { id }: IArtist,
      { token, dataSources: { artistsService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      return !token ? null : await artistsService.removeArtist(id);
    },
  },
};
