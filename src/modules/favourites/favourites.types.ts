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

export interface IAddFavouritesOptions {
  id: string;
  variant: 'track' | 'band' | 'artist' | 'genre';
}

export interface IFavourites {
  id: string;
  userId: string;
  bands: IBand;
  genres: IGenre;
  artists: IArtist;
  tracks: ITrack;
}
