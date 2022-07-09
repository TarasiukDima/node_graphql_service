import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { IFavouritesWithIds } from '../favourites.types';

enum FAVOURITES_POINTS {
  add = '/add',
  remove = '/remove',
}

export interface IFavouritesService extends RESTDataSource {
  baseURL?: string | undefined;

  getFavourites: () => Promise<IFavouritesWithIds>;

  addTrackToFavourites: (id: string) => Promise<IFavouritesWithIds>;
  addBandToFavourites: (id: string) => Promise<IFavouritesWithIds>;
  addArtistToFavourites: (id: string) => Promise<IFavouritesWithIds>;
  addGenreToFavourites: (id: string) => Promise<IFavouritesWithIds>;

  removeTrackFromFavourites: (id: string) => Promise<IFavouritesWithIds>;
  removeBandFromFavourites: (id: string) => Promise<IFavouritesWithIds>;
  removeArtistFromFavourites: (id: string) => Promise<IFavouritesWithIds>;
  removeGenreFromFavourites: (id: string) => Promise<IFavouritesWithIds>;
}

interface IFavouritesResponse {
  _id: string;
  userId: string;
  bandsIds: Array<string>;
  genresIds: Array<string>;
  artistsIds: Array<string>;
  tracksIds: Array<string>;
}

enum FavouritesVariants {
  addBand = 'bands',
  addGenre = 'genres',
  addArtist = 'artists',
  addTrack = 'tracks',
  removeBand = 'bands',
  removeGenre = 'genres',
  removeArtist = 'artists',
  removeTrack = 'tracks',
}

class FavouritesService extends RESTDataSource implements IFavouritesService {
  constructor() {
    super();
    this.baseURL = process.env.FAVOURITES_URL;
  }

  willSendRequest = (request: RequestOptions) => {
    request.headers.set('Authorization', this.context.token);
  };

  private changeFavouritesKeysName = (object: IFavouritesResponse): IFavouritesWithIds => {
    return {
      id: object._id,
      userId: object.userId,
      bands: object.bandsIds,
      genres: object.genresIds,
      artists: object.artistsIds,
      tracks: object.tracksIds,
    };
  };

  getFavourites = async (): Promise<IFavouritesWithIds> => {
    const data = await this.get('');
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  addTrackToFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(FAVOURITES_POINTS.add, { id, type: FavouritesVariants.addTrack });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  addBandToFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(FAVOURITES_POINTS.add, { id, type: FavouritesVariants.addBand });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  addArtistToFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(FAVOURITES_POINTS.add, { id, type: FavouritesVariants.addArtist });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  addGenreToFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(FAVOURITES_POINTS.add, { id, type: FavouritesVariants.addGenre });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  removeTrackFromFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(`${FAVOURITES_POINTS.remove}`, {
      id,
      type: FavouritesVariants.removeTrack,
    });

    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  removeBandFromFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(`${FAVOURITES_POINTS.remove}`, {
      id,
      type: FavouritesVariants.removeBand,
    });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  removeArtistFromFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(`${FAVOURITES_POINTS.remove}`, {
      id,
      type: FavouritesVariants.removeArtist,
    });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };

  removeGenreFromFavourites = async (id: string): Promise<IFavouritesWithIds> => {
    const data = await this.put(`${FAVOURITES_POINTS.remove}`, {
      id,
      type: FavouritesVariants.removeGenre,
    });
    const favourites = this.changeFavouritesKeysName(data);

    return favourites;
  };
}

export const favouritesService = new FavouritesService();
