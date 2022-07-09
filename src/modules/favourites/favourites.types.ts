import { IArtist } from '../artists/artists.types';
import { IBand } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';
import { ITrack } from '../tracks/track.types';

export interface IFavouritesOptions {
  userId: string;
  bands: IBand;
  genres: IGenre;
  artists: IArtist;
  tracks: ITrack;
}

export interface IFavourites {
  id: string;
  userId: string;
  bands: Array<IBand>;
  genres: Array<IGenre>;
  artists: Array<IArtist>;
  tracks: Array<ITrack>;
}

export interface IFavouritesWithIds {
  id: string;
  userId: string;
  bands: Array<string>;
  genres: Array<string>;
  artists: Array<string>;
  tracks: Array<string>;
}
