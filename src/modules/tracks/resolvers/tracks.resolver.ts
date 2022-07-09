import { getAlbumsArray, getBandsArray, getGenresArray } from '../../utils/index';
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

const getTrackInfoObjects = async (
  oneTrack: ITrackWithIds,
  dataSources: IServices
): Promise<ITrack> => {
  const { albumService, bandsService, genresService } = dataSources;
  return {
    id: oneTrack.id,
    title: oneTrack.title,
    duration: oneTrack.duration,
    released: oneTrack.released,
    albums: await getAlbumsArray(oneTrack.albums, albumService, dataSources),
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
  const TracksAnswers = await Promise.allSettled(promisesTracksArray);
  const newTracks = TracksAnswers.map((res) => (res.status === 'fulfilled' ? res.value : null));

  return newTracks.filter((el) => el) as Array<ITrack>;
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
