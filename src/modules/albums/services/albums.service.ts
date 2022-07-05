import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IAlbum, IAlbumOptions, IDeleteAlbumResponse, IGetAlbumsOptions, IUpdateAlbumOptions } from '../albums.types';

export interface IAlbumService extends RESTDataSource {
  baseURL?: string | undefined;

  getAlbums: (options: IGetAlbumsOptions) => Promise<Array<IAlbum>>;
  getAlbum: (id: string) => Promise<IAlbum>;

  addAlbum: (options: IAlbumOptions) => Promise<IAlbum>;
  updateAlbum: (options: IUpdateAlbumOptions) => Promise<IAlbum>;
  removeAlbum: (id: string) => Promise<IDeleteAlbumResponse>;
}

class AlbumService extends RESTDataSource implements IAlbumService {
  constructor() {
    super();
    this.baseURL = process.env.ALBUMS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getAlbums = async (options: IGetAlbumsOptions): Promise<Array<IAlbum>> => {
    const data = await this.get('', { ...options });

    const albums = [...data.items].map((oneAlbum) => {
      oneAlbum.id = oneAlbum._id;
      return oneAlbum;
    });

    return albums;
  };

  getAlbum = async (id: string): Promise<IAlbum> => {
    const { _id, ...last } = await this.get(`/${encodeURIComponent(id)}`);

    return { id: _id, ...last };
  };

  addAlbum = async (options: IAlbumOptions): Promise<IAlbum> => {
    const { _id, ...last } = await this.post('', options);

    return { id: _id, ...last };
  };

  updateAlbum = async ({ id, inputOptions }: IUpdateAlbumOptions): Promise<IAlbum> => {
    const { _id, ...last } = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return { id: _id, ...last };
  };

  removeAlbum = async (id: string): Promise<IDeleteAlbumResponse> => {
    const data = await this.delete(`/${encodeURIComponent(id)}`);

    return data;
  };
}

export const albumService = new AlbumService();
