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

class GenresService extends RESTDataSource implements IGenresService {
  constructor() {
    super();
    this.baseURL = process.env.GENRES_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getGenres = async (options: IPaginationOptions): Promise<Array<IGenre>> => {
    const data = await this.get('', { ...options });

    const Genres = [...data.items].map((oneGenre) => {
      oneGenre.id = oneGenre._id;
      return oneGenre;
    });

    return Genres;
  };

  getGenre = async (id: string): Promise<IGenre> => {
    const { _id, ...last } = await this.get(`/${encodeURIComponent(id)}`);

    return { id: _id, ...last };
  };

  addGenre = async (options: IGenreOptions): Promise<IGenre> => {
    const { _id, ...last } = await this.post('', options);

    return { id: _id, ...last };
  };

  updateGenre = async ({ id, inputOptions }: IUpdateOptions<IGenreOptions>): Promise<IGenre> => {
    const { _id, ...last } = await this.put(`/${encodeURIComponent(id)}`, inputOptions);

    return { id: _id, ...last };
  };

  removeGenre = async (id: string): Promise<IDeleteResponse> => {
    const data = await this.delete(`/${encodeURIComponent(id)}`);

    return data;
  };
}

export const genresService = new GenresService();
