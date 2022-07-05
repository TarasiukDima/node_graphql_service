import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

export interface IBandsService extends RESTDataSource {
  baseURL?: string | undefined;
}

class BandsService extends RESTDataSource implements IBandsService {
  constructor() {
    super();
    this.baseURL = process.env.BANDS_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };
}

export const bandsService = new BandsService();
