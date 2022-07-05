import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

export interface IGenresService extends RESTDataSource {
  baseURL?: string | undefined;
}

class GenresService extends RESTDataSource implements IGenresService {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };
}

export const genresService = new GenresService();
