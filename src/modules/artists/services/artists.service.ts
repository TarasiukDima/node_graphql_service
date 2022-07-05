import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import {
  IArtist,
  IArtistOptions,
  IDeleteArtistResponse,
  IGetArtistsOptions,
  IUpdateArtistOptions,
} from '../artists.types';

export interface IArtistsService extends RESTDataSource {
  baseURL?: string | undefined;

  getArtists: (options: IGetArtistsOptions) => Promise<Array<IArtist>>;
  getArtist: (id: string) => Promise<IArtist>;

  addArtist: (options: IArtistOptions) => Promise<IArtist>;
  updateArtist: (options: IUpdateArtistOptions) => Promise<IArtist>;
  removeArtist: (id: string) => Promise<IDeleteArtistResponse>;
}

class ArtistsService extends RESTDataSource implements IArtistsService {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getArtists = async (options: IGetArtistsOptions): Promise<Array<IArtist>> => {
    const data = await this.get('', { ...options });

    const Artists = [...data.items].map((oneArtist) => {
      oneArtist.id = oneArtist._id;
      return oneArtist;
    });

    return Artists;
  };

  getArtist = async (id: string): Promise<IArtist> => {
    const { _id, ...last } = await this.get(`/${encodeURIComponent(id)}`);

    return { id: _id, ...last };
  };

  addArtist = async (options: IArtistOptions): Promise<IArtist> => {
    const { _id, ...last } = await this.post('', options);

    return { id: _id, ...last };
  };

  updateArtist = async ({ id, inputOptions }: IUpdateArtistOptions): Promise<IArtist> => {
    const { _id, ...last } = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return { id: _id, ...last };
  };

  removeArtist = async (id: string): Promise<IDeleteArtistResponse> => {
    const data = await this.delete(`/${encodeURIComponent(id)}`);

    return data;
  };
}

export const artistsService = new ArtistsService();
