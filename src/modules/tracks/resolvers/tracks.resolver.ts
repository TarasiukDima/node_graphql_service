import {
  getAlbumObj,
  getArrayWithNotEmptyObjects,
  getArtistsArray,
  getBandsArray,
  getGenresArray,
} from '../../utils/index';
import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IItemGetOptions,
  IPaginationOptions,
  IServices,
  IUpdateOptions,
} from '../../../types/index';
import { ITrack, ITrackOptions, ITrackWithIds } from '../track.types';
import { IAlbum } from 'src/modules/albums/albums.types';

const getTrackInfoObjects = async (
  oneTrack: ITrackWithIds,
  dataSources: IServices
): Promise<ITrack> => {
  const { artistsService, albumService, bandsService, genresService } = dataSources;
  return {
    id: oneTrack.id,
    title: oneTrack.title,
    duration: oneTrack.duration,
    released: oneTrack.released,
    album: await getAlbumObj(oneTrack.album, albumService, dataSources) as IAlbum,
    artists: await getArtistsArray(oneTrack.artists, artistsService, dataSources),
    bands: await getBandsArray(oneTrack.bands, bandsService, dataSources),
    genres: await getGenresArray(oneTrack.genres, genresService),
  };
};

const getArrayTracksWithIdsObjects = async (
  array: Array<ITrackWithIds>,
  dataSources: IServices
): Promise<Array<ITrack>> => {
  const promisesTracksArray = array.map(
    async (oneTrack) => await getTrackInfoObjects(oneTrack, dataSources)
  );
  const tracksAnswers = await Promise.allSettled(promisesTracksArray);
  const newTracks = getArrayWithNotEmptyObjects<ITrack>(tracksAnswers, 'id');

  return newTracks;
};

export const tracksResolvers = {
  Query: {
    getTracks: async (
      _: any,
      options: IPaginationOptions,
      { dataSources }: IContext
    ): Promise<Array<ITrack>> => {
      const tracksWithIds = await dataSources.tracksService.getTracks(options);
      const tracks = await getArrayTracksWithIdsObjects(tracksWithIds, dataSources);

      return tracks;
    },

    getTrack: async (
      _: any,
      { id }: IItemGetOptions,
      { dataSources }: IContext
    ): Promise<ITrack> => {
      const trackWithIds = await dataSources.tracksService.getTrack(id);
      const track = await getTrackInfoObjects(trackWithIds, dataSources);

      return track;
    },
  },

  Mutation: {
    addTrack: async (
      _: any,
      { inputOptions }: IAddAOptions<ITrackOptions>,
      { token, dataSources }: IContext
    ): Promise<ITrack | null> => {
      if (!token) {
        return null;
      }

      const trackWithIds = await dataSources.tracksService.addTrack(inputOptions);
      const track = await getTrackInfoObjects(trackWithIds, dataSources);

      return track;
    },

    updateTrack: async (
      _: any,
      options: IUpdateOptions<ITrackOptions>,
      { token, dataSources }: IContext
    ): Promise<ITrack | null> => {
      if (!token) {
        return null;
      }

      const trackWithIds = await dataSources.tracksService.updateTrack(options);
      const track = await getTrackInfoObjects(trackWithIds, dataSources);

      return track;
    },

    removeTrack: async (
      _: any,
      { id }: ITrack,
      { token, dataSources: { tracksService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      return !token ? null : await tracksService.removeTrack(id);
    },
  },
};
