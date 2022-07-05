import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface IAlbumService extends RESTDataSource {
  baseURL?: string | undefined;
}

class AlbumService extends RESTDataSource implements IAlbumService {
  constructor() {
    super();
    this.baseURL = process.env.ALBUMS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };
}

export const albumService = new AlbumService();
