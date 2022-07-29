import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from '../../../types/index';
import { ITrackOptions, ITrackWithIds } from '../track.types';

export interface ITracksService extends RESTDataSource {
  baseURL?: string | undefined;

  getTracks: (options: IPaginationOptions) => Promise<Array<ITrackWithIds>>;
  getTrack: (id: string) => Promise<ITrackWithIds>;

  addTrack: (options: ITrackOptions) => Promise<ITrackWithIds>;
  updateTrack: (options: IUpdateOptions<ITrackOptions>) => Promise<ITrackWithIds>;
  removeTrack: (id: string) => Promise<IDeleteResponse>;
}

interface ITrackResponse {
  _id: string;
  title: string;
  duration: number;
  released: number;
  albumId: string;
  artistsIds: Array<string>;
  bandsIds: Array<string>;
  genresIds: Array<string>;
}

class TracksService extends RESTDataSource implements ITracksService {
  constructor() {
    super();
    this.baseURL = process.env.TRACKS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  private changeTrackKeysName = (object: ITrackResponse): ITrackWithIds => {
    return {
      id: object._id,
      title: object.title,
      duration: object.duration,
      released: object.released,
      album: object.albumId,
      artists: object.artistsIds,
      bands: object.bandsIds,
      genres: object.genresIds,
    };
  };

  getTracks = async (options: IPaginationOptions): Promise<Array<ITrackWithIds>> => {
    const data = await this.get('', { ...options });
    const tracks = [...data.items].map((oneAlbum) => this.changeTrackKeysName(oneAlbum));

    return tracks;
  };

  getTrack = async (id: string): Promise<ITrackWithIds> => {
    const track = await this.get(`/${encodeURIComponent(id)}`);

    return this.changeTrackKeysName(track);
  };

  addTrack = async (options: ITrackOptions): Promise<ITrackWithIds> => {
    const track = await this.post('', options);

    return this.changeTrackKeysName(track);
  };

  updateTrack = async ({
    id,
    inputOptions,
  }: IUpdateOptions<ITrackOptions>): Promise<ITrackWithIds> => {
    const track = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return this.changeTrackKeysName(track);
  };

  removeTrack = async (id: string): Promise<IDeleteResponse> => {
    return await this.delete(`/${encodeURIComponent(id)}`);
  };
}

export const tracksService = new TracksService();
