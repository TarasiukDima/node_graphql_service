import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from 'src/types';
import { IArtist, IArtistOptions } from '../artists.types';

export interface IArtistsService extends RESTDataSource {
  baseURL?: string | undefined;

  getArtists: (options: IPaginationOptions) => Promise<Array<IArtist>>;
  getArtist: (id: string) => Promise<IArtist>;

  addArtist: (options: IArtistOptions) => Promise<IArtist>;
  updateArtist: (options: IUpdateOptions<IArtistOptions>) => Promise<IArtist>;
  removeArtist: (id: string) => Promise<IDeleteResponse>;
}

class ArtistsService extends RESTDataSource implements IArtistsService {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getArtists = async (options: IPaginationOptions): Promise<Array<IArtist>> => {
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

  updateArtist = async ({ id, inputOptions }: IUpdateOptions<IArtistOptions>): Promise<IArtist> => {
    const { _id, ...last } = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return { id: _id, ...last };
  };

  removeArtist = async (id: string): Promise<IDeleteResponse> => {
    const data = await this.delete(`/${encodeURIComponent(id)}`);

    return data;
  };
}

export const artistsService = new ArtistsService();
