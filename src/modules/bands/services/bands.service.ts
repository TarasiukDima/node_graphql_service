import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from 'src/types';
import { IBand, IBandOptions } from '../bands.types';

export interface IBandsService extends RESTDataSource {
  baseURL?: string | undefined;

  getBands: (options: IPaginationOptions) => Promise<Array<IBand>>;
  getBand: (id: string) => Promise<IBand>;

  addBand: (options: IBandOptions) => Promise<IBand>;
  updateBand: (options: IUpdateOptions<IBandOptions>) => Promise<IBand>;
  removeBand: (id: string) => Promise<IDeleteResponse>;
}

class BandsService extends RESTDataSource implements IBandsService {
  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getBands = async (options: IPaginationOptions): Promise<Array<IBand>> => {
    const data = await this.get('', { ...options });

    const Bands = [...data.items].map((oneBand) => {
      oneBand.id = oneBand._id;
      return oneBand;
    });

    return Bands;
  };

  getBand = async (id: string): Promise<IBand> => {
    const { _id, ...last } = await this.get(`/${encodeURIComponent(id)}`);

    return { id: _id, ...last };
  };

  addBand = async (options: IBandOptions): Promise<IBand> => {
    const { _id, ...last } = await this.post('', options);

    return { id: _id, ...last };
  };

  updateBand = async ({ id, inputOptions }: IUpdateOptions<IBandOptions>): Promise<IBand> => {
    const { _id, ...last } = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return { id: _id, ...last };
  };

  removeBand = async (id: string): Promise<IDeleteResponse> => {
    const data = await this.delete(`/${encodeURIComponent(id)}`);

    return data;
  };
}

export const bandsService = new BandsService();
