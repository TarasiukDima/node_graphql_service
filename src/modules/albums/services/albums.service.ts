import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from '../../../types/index';
import { IAlbumOptions, IAlbumWithIDS } from '../albums.types';

export interface IAlbumService extends RESTDataSource {
  baseURL?: string | undefined;

  getAlbums: (options: IPaginationOptions) => Promise<Array<IAlbumWithIDS>>;
  getAlbum: (id: string) => Promise<IAlbumWithIDS>;

  addAlbum: (options: IAlbumOptions) => Promise<IAlbumWithIDS>;
  updateAlbum: (options: IUpdateOptions<IAlbumOptions>) => Promise<IAlbumWithIDS>;
  removeAlbum: (id: string) => Promise<IDeleteResponse>;
}

interface IAlbumResponse {
  _id: string;
  name: string;
  released: number;
  image: string;
  artistsIds: Array<string>;
  bandsIds: Array<string>;
  trackIds: Array<string>;
  genresIds: Array<string>;
}

class AlbumService extends RESTDataSource implements IAlbumService {
  constructor() {
    super();
    this.baseURL = process.env.ALBUMS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  private changeAlbumKeysName = (object: IAlbumResponse): IAlbumWithIDS => {
    return {
      id: object._id,
      name: object.name,
      released: object.released,
      artists: object.artistsIds,
      bands: object.bandsIds,
      tracks: object.trackIds,
      genres: object.genresIds,
      image: object.image,
    };
  };

  getAlbums = async (options: IPaginationOptions): Promise<Array<IAlbumWithIDS>> => {
    const data = await this.get('', { ...options });
    const albums = [...data.items].map((oneAlbum) => this.changeAlbumKeysName(oneAlbum));

    return albums;
  };

  getAlbum = async (id: string): Promise<IAlbumWithIDS> => {
    const album = await this.get(`/${encodeURIComponent(id)}`);

    return this.changeAlbumKeysName(album);
  };

  addAlbum = async (options: IAlbumOptions): Promise<IAlbumWithIDS> => {
    const album = await this.post('', options);

    return this.changeAlbumKeysName(album);
  };

  updateAlbum = async ({
    id,
    inputOptions,
  }: IUpdateOptions<IAlbumOptions>): Promise<IAlbumWithIDS> => {
    const album = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return this.changeAlbumKeysName(album);
  };

  removeAlbum = async (id: string): Promise<IDeleteResponse> => {
    return await this.delete(`/${encodeURIComponent(id)}`);
  };
}

export const albumService = new AlbumService();
