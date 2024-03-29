import { getArrayWithNotEmptyObjects, getGenresArray } from '../../utils/index';
import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IItemGetOptions,
  IPaginationOptions,
  IServices,
  IUpdateOptions,
} from '../../../types/index';
import { IBand, IBandOptions, IBandWithIds } from '../bands.types';

const getBandInfoObjects = async (
  oneBand: IBandWithIds,
  dataSources: IServices
): Promise<IBand> => {
  return {
    id: oneBand.id,
    name: oneBand.name,
    origin: oneBand.origin,
    website: oneBand.website,
    members: oneBand.members,
    genres: await getGenresArray(oneBand.genres, dataSources.genresService),
  };
};

const getArrayBandsWithIdsObjects = async (
  array: Array<IBandWithIds>,
  dataSources: IServices
): Promise<Array<IBand>> => {
  const promisesBandsArray = array.map(
    async (oneBand) => await getBandInfoObjects(oneBand, dataSources)
  );
  const bandsAnswers = await Promise.allSettled(promisesBandsArray);
  const newBands = getArrayWithNotEmptyObjects<IBand>(bandsAnswers, 'id');

  return newBands;
};

export const bandsResolvers = {
  Query: {
    getBands: async (
      _: any,
      options: IPaginationOptions,
      { dataSources }: IContext
    ): Promise<Array<IBand>> => {
      const bandsWithIds = await dataSources.bandsService.getBands(options);
      const bands = await getArrayBandsWithIdsObjects(bandsWithIds, dataSources);

      return bands;
    },

    getBand: async (_: any, { id }: IItemGetOptions, { dataSources }: IContext): Promise<IBand> => {
      const bandWithIds = await dataSources.bandsService.getBand(id);
      const band = await getBandInfoObjects(bandWithIds, dataSources);

      return band;
    },
  },

  Mutation: {
    addBand: async (
      _: any,
      { inputOptions }: IAddAOptions<IBandOptions>,
      { token, dataSources }: IContext
    ): Promise<IBand | null> => {
      if (!token) {
        return null;
      }

      const bandWithIds = await dataSources.bandsService.addBand(inputOptions);
      const band = await getBandInfoObjects(bandWithIds, dataSources);

      return band;
    },

    updateBand: async (
      _: any,
      options: IUpdateOptions<IBandOptions>,
      { token, dataSources }: IContext
    ): Promise<IBand | null> => {
      if (!token) {
        return null;
      }

      const bandWithIds = await dataSources.bandsService.updateBand(options);
      const band = await getBandInfoObjects(bandWithIds, dataSources);

      return band;
    },

    removeBand: async (
      _: any,
      { id }: IBand,
      { token, dataSources: { bandsService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      return !token ? null : await bandsService.removeBand(id);
    },
  },
};
