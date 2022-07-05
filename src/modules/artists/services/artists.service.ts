import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface IArtistsService extends RESTDataSource {
  baseURL?: string | undefined;
}

class ArtistsService extends RESTDataSource implements IArtistsService {
  constructor() {
    super();
    this.baseURL = process.env.ARTISTS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };
}

export const artistsService = new ArtistsService();
