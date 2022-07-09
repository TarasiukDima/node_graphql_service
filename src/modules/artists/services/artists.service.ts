import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from 'src/types';
import { IArtistOptions, IArtistWithIDS } from '../artists.types';

export interface IArtistsService extends RESTDataSource {
  baseURL?: string | undefined;

  getArtists: (options: IPaginationOptions) => Promise<Array<IArtistWithIDS>>;
  getArtist: (id: string) => Promise<IArtistWithIDS>;

  addArtist: (options: IArtistOptions) => Promise<IArtistWithIDS>;
  updateArtist: (options: IUpdateOptions<IArtistOptions>) => Promise<IArtistWithIDS>;
  removeArtist: (id: string) => Promise<IDeleteResponse>;
}

interface IArtistResponse {
  _id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: Array<string>;
  instruments: Array<string>;
}

class ArtistsService extends RESTDataSource implements IArtistsService {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  private changeArtistKeysName = (object: IArtistResponse): IArtistWithIDS => {
    return {
      id: object._id,
      firstName: object.firstName,
      secondName: object.secondName,
      middleName: object.middleName,
      birthDate: object.birthDate,
      birthPlace: object.birthPlace,
      country: object.country,
      instruments: object.instruments,
      bands: object.bandsIds,
    };
  };

  getArtists = async (options: IPaginationOptions): Promise<Array<IArtistWithIDS>> => {
    const data = await this.get('', { ...options });
    const artists = [...data.items].map((oneArtist) => this.changeArtistKeysName(oneArtist));

    return artists;
  };

  getArtist = async (id: string): Promise<IArtistWithIDS> => {
    const artist = await this.get(`/${encodeURIComponent(id)}`);

    return this.changeArtistKeysName(artist);
  };

  addArtist = async (options: IArtistOptions): Promise<IArtistWithIDS> => {
    const artist = await this.post('', options);

    return this.changeArtistKeysName(artist);
  };

  updateArtist = async ({
    id,
    inputOptions,
  }: IUpdateOptions<IArtistOptions>): Promise<IArtistWithIDS> => {
    const artist = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return this.changeArtistKeysName(artist);
  };

  removeArtist = async (id: string): Promise<IDeleteResponse> => {
    return await this.delete(`/${encodeURIComponent(id)}`);
  };
}

export const artistsService = new ArtistsService();
