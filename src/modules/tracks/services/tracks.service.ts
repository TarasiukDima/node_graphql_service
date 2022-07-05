import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface ITracksService extends RESTDataSource {
  baseURL?: string | undefined;
}

class TracksService extends RESTDataSource implements ITracksService {
  constructor() {
    super();
    this.baseURL = process.env.TRACKS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };
}

export const tracksService = new TracksService();
