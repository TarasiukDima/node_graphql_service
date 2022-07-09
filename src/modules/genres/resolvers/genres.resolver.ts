import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IItemGetOptions,
  IPaginationOptions,
  IUpdateOptions,
} from '../../../types/index';
import { IGenre, IGenreOptions } from '../genres.types';

export const genresResolvers = {
  Query: {
    getGenres: async (
      _: any,
      options: IPaginationOptions,
      { dataSources: { genresService } }: IContext
    ): Promise<Array<IGenre>> => {
      return await genresService.getGenres(options);
    },

    getGenre: async (
      _: any,
      { id }: IItemGetOptions,
      { dataSources: { genresService } }: IContext
    ): Promise<IGenre> => {
      return await genresService.getGenre(id);
    },
  },

  Mutation: {
    addGenre: async (
      _: any,
      { inputOptions }: IAddAOptions<IGenreOptions>,
      { token, dataSources: { genresService } }: IContext
    ): Promise<IGenre | null> => {
      if (!token) {
        return null;
      }

      return await genresService.addGenre(inputOptions);
    },

    updateGenre: async (
      _: any,
      options: IUpdateOptions<IGenreOptions>,
      { token, dataSources: { genresService } }: IContext
    ): Promise<IGenre | null> => {
      if (!token) {
        return null;
      }

      return await genresService.updateGenre(options);
    },

    removeGenre: async (
      _: any,
      { id }: IGenre,
      { token, dataSources: { genresService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      if (!token) {
        return null;
      }

      return await genresService.removeGenre(id);
    },
  },
};
