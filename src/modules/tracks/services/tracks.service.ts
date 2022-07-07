import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from 'src/types';
import { ITrack, ITrackOptions } from '../track.types';

export interface ITracksService extends RESTDataSource {
  baseURL?: string | undefined;

  getTracks: (options: IPaginationOptions) => Promise<Array<ITrack>>;
  getTrack: (id: string) => Promise<ITrack>;

  addTrack: (options: ITrackOptions) => Promise<ITrack>;
  updateTrack: (options: IUpdateOptions<ITrackOptions>) => Promise<ITrack>;
  removeTrack: (id: string) => Promise<IDeleteResponse>;
}

class TracksService extends RESTDataSource implements ITracksService {
  constructor() {
    super();
    this.baseURL = process.env.TRACKS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getTracks = async (options: IPaginationOptions): Promise<Array<ITrack>> => {
    const data = await this.get('', { ...options });

    const Tracks = [...data.items].map((oneTrack) => {
      oneTrack.id = oneTrack._id;
      return oneTrack;
    });

    return Tracks;
  };

  getTrack = async (id: string): Promise<ITrack> => {
    const { _id, ...last } = await this.get(`/${encodeURIComponent(id)}`);

    return { id: _id, ...last };
  };

  addTrack = async (options: ITrackOptions): Promise<ITrack> => {
    const { _id, ...last } = await this.post('', options);

    return { id: _id, ...last };
  };

  updateTrack = async ({ id, inputOptions }: IUpdateOptions<ITrackOptions>): Promise<ITrack> => {
    const { _id, ...last } = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return { id: _id, ...last };
  };

  removeTrack = async (id: string): Promise<IDeleteResponse> => {
    const data = await this.delete(`/${encodeURIComponent(id)}`);

    return data;
  };
}

export const tracksService = new TracksService();
