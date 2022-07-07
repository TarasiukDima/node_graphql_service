import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IPaginationOptions } from 'src/types';
import { IFavourites } from '../favourites.types';

enum FAVOURITES_POINTS {
  add = 'add',
  remove = 'remove',
}

export interface IFavouritesService extends RESTDataSource {
  baseURL?: string | undefined;

  getFavourites: (options: IPaginationOptions) => Promise<IFavourites>;

  addTrackToFavourites: (id: string) => Promise<IFavourites>;
  addBandToFavourites: (id: string) => Promise<IFavourites>;
  addArtistToFavourites: (id: string) => Promise<IFavourites>;
  addGenreToFavourites: (id: string) => Promise<IFavourites>;

  removeTrackFromFavourites: (id: string) => Promise<IFavourites>;
  removeBandFromFavourites: (id: string) => Promise<IFavourites>;
  removeArtistFromFavourites: (id: string) => Promise<IFavourites>;
  removeGenreFromFavourites: (id: string) => Promise<IFavourites>;
}

class FavouritesService extends RESTDataSource implements IFavouritesService {
  constructor() {
    super();
    this.baseURL = process.env.FAVOURITES_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  getFavourites = async (options: IPaginationOptions): Promise<IFavourites> => {
    const data = await this.get('', { ...options });

    // const Bands = [...data.items].map((oneBand) => {
    //   oneBand.id = oneBand._id;
    //   return oneBand;
    // });

    return data;
  };

  addTrackToFavourites = async (id: string): Promise<IFavourites> => {
    const { _id, ...last } = await this.put(FAVOURITES_POINTS.add, id);

    return { id: _id, ...last };
  };

  addBandToFavourites = async (id: string): Promise<IFavourites> => {
    const { _id, ...last } = await this.put(FAVOURITES_POINTS.add, id);

    return { id: _id, ...last };
  };

  addArtistToFavourites = async (id: string): Promise<IFavourites> => {
    const { _id, ...last } = await this.put(FAVOURITES_POINTS.add, id);

    return { id: _id, ...last };
  };

  addGenreToFavourites = async (id: string): Promise<IFavourites> => {
    const { _id, ...last } = await this.put(FAVOURITES_POINTS.add, id);

    return { id: _id, ...last };
  };

  removeTrackFromFavourites = async (id: string): Promise<IFavourites> => {
    const data = await this.delete(`${FAVOURITES_POINTS.remove}/${encodeURIComponent(id)}`);

    return data;
  };

  removeBandFromFavourites = async (id: string): Promise<IFavourites> => {
    const data = await this.delete(`${FAVOURITES_POINTS.remove}/${encodeURIComponent(id)}`);

    return data;
  };

  removeArtistFromFavourites = async (id: string): Promise<IFavourites> => {
    const data = await this.delete(`${FAVOURITES_POINTS.remove}/${encodeURIComponent(id)}`);

    return data;
  };

  removeGenreFromFavourites = async (id: string): Promise<IFavourites> => {
    const data = await this.delete(`${FAVOURITES_POINTS.remove}/${encodeURIComponent(id)}`);

    return data;
  };
}

export const favouritesService = new FavouritesService();
