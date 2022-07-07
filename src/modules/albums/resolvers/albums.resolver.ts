import {
  IAddAOptions,
  IContext,
  IDeleteResponse,
  IPaginationOptions,
  IUpdateOptions,
} from '../../../types/index';
import { IAlbum, IAlbumOptions } from '../albums.types';

export const albumsResolvers = {
  Query: {
    getAlbums: async (
      _: any,
      options: IPaginationOptions,
      { dataSources: { albumService } }: IContext
    ): Promise<Array<IAlbum>> => {
      return await albumService.getAlbums(options);
    },

    getAlbum: async (
      _: any,
      { id }: IAlbum,
      { dataSources: { albumService } }: IContext
    ): Promise<IAlbum> => {
      return await albumService.getAlbum(id);
    },
  },

  Mutation: {
    addAlbum: async (
      _: any,
      { inputOptions }: IAddAOptions<IAlbumOptions>,
      { token, dataSources: { albumService } }: IContext
    ): Promise<IAlbum | null> => {
      if (!token) {
        return null;
      }

      return await albumService.addAlbum(inputOptions);
    },

    updateAlbum: async (
      _: any,
      options: IUpdateOptions<IAlbumOptions>,
      { token, dataSources: { albumService } }: IContext
    ): Promise<IAlbum | null> => {
      if (!token) {
        return null;
      }

      return await albumService.updateAlbum(options);
    },

    removeAlbum: async (
      _: any,
      { id }: IAlbum,
      { token, dataSources: { albumService } }: IContext
    ): Promise<IDeleteResponse | null> => {
      if (!token) {
        return null;
      }

      return await albumService.removeAlbum(id);
    },
  },
};
