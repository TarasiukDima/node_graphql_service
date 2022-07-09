import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from 'src/types';
import { IBandOptions, IBandWithIds, IMember } from '../bands.types';

export interface IBandsService extends RESTDataSource {
  baseURL?: string | undefined;

  getBands: (options: IPaginationOptions) => Promise<Array<IBandWithIds>>;
  getBand: (id: string) => Promise<IBandWithIds>;

  addBand: (options: IBandOptions) => Promise<IBandWithIds>;
  updateBand: (options: IUpdateOptions<IBandOptions>) => Promise<IBandWithIds>;
  removeBand: (id: string) => Promise<IDeleteResponse>;
}

interface IBandResponse {
  _id: string;
  name: string;
  origin: string;
  members: Array<IMember>;
  website: string;
  genresIds: Array<string>;
}

class BandsService extends RESTDataSource implements IBandsService {
  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  private changeBandKeysName = (object: IBandResponse): IBandWithIds => {
    return {
      id: object._id,
      name: object.name,
      origin: object.origin,
      members: object.members,
      website: object.website,
      genres: object.genresIds,
    };
  };

  getBands = async (options: IPaginationOptions): Promise<Array<IBandWithIds>> => {
    const data = await this.get('', { ...options });
    const bands = [...data.items].map((oneBand) => this.changeBandKeysName(oneBand));

    return bands;
  };

  getBand = async (id: string): Promise<IBandWithIds> => {
    const band = await this.get(`/${encodeURIComponent(id)}`);

    return this.changeBandKeysName(band);
  };

  addBand = async (options: IBandOptions): Promise<IBandWithIds> => {
    const band = await this.post('', options);

    return this.changeBandKeysName(band);
  };

  updateBand = async ({
    id,
    inputOptions,
  }: IUpdateOptions<IBandOptions>): Promise<IBandWithIds> => {
    const band = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return this.changeBandKeysName(band);
  };

  removeBand = async (id: string): Promise<IDeleteResponse> => {
    return await this.delete(`/${encodeURIComponent(id)}`);
  };
}

export const bandsService = new BandsService();
