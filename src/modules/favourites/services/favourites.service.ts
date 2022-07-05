import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export interface IFavouritesService extends RESTDataSource {
  baseURL?: string | undefined;
}

class FavouritesService extends RESTDataSource implements IFavouritesService {
  constructor() {
    super();
    this.baseURL = process.env.FAVOURITES_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };
}

export const favouritesService = new FavouritesService();
