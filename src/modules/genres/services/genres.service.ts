import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IDeleteResponse, IPaginationOptions, IUpdateOptions } from 'src/types';
import { IGenre, IGenreOptions } from '../genres.types';

export interface IGenresService extends RESTDataSource {
  baseURL?: string | undefined;

  getGenres: (options: IPaginationOptions) => Promise<Array<IGenre>>;
  getGenre: (id: string) => Promise<IGenre>;

  addGenre: (options: IGenreOptions) => Promise<IGenre>;
  updateGenre: (options: IUpdateOptions<IGenreOptions>) => Promise<IGenre>;
  removeGenre: (id: string) => Promise<IDeleteResponse>;
}

interface IGenreResponse {
  _id: string;
  name: string;
  description: string;
  country: string;
  year: number;
}

class GenresService extends RESTDataSource implements IGenresService {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  private changeGenreKeysName = (object: IGenreResponse): IGenre => {
    return {
      id: object._id,
      name: object.name,
      description: object.description,
      country: object.country,
      year: object.year,
    };
  };

  getGenres = async (options: IPaginationOptions): Promise<Array<IGenre>> => {
    const data = await this.get('', { ...options });

    return [...data.items].map((oneGenre) => this.changeGenreKeysName(oneGenre));
  };

  getGenre = async (id: string): Promise<IGenre> => {
    const genre = await this.get(`/${encodeURIComponent(id)}`);

    return this.changeGenreKeysName(genre);
  };

  addGenre = async (options: IGenreOptions): Promise<IGenre> => {
    const genre = await this.post('', options);

    return this.changeGenreKeysName(genre);
  };

  updateGenre = async ({ id, inputOptions }: IUpdateOptions<IGenreOptions>): Promise<IGenre> => {
    const genre = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return this.changeGenreKeysName(genre);
  };

  removeGenre = async (id: string): Promise<IDeleteResponse> => {
    return await this.delete(`/${encodeURIComponent(id)}`);
  };
}

export const genresService = new GenresService();
