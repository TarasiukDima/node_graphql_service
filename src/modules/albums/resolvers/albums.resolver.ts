import { IContext } from '../../../types/index';
import {
  IAddAlbumOptions,
  IAlbum,
  IAlbumOptions,
  IDeleteAlbumResponse,
  IGetAlbumsOptions,
  IUpdateAlbumOptions,
} from '../albums.types';

export const albumsResolvers = {
  Query: {
    getAlbums: async (
      _: any,
      options: IGetAlbumsOptions,
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
      { inputOptions }: IAddAlbumOptions,
      { token, dataSources: { albumService } }: IContext
    ): Promise<IAlbum | null> => {
      if (!token) {
        return null;
      }

      return await albumService.addAlbum(inputOptions);
    },

    updateAlbum: async (
      _: any,
      options: IUpdateAlbumOptions,
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
    ): Promise<IDeleteAlbumResponse | null> => {
      if (!token) {
        return null;
      }

      return await albumService.removeAlbum(id);
    },
  },
};
