import { IArtist } from '../artists/artists.types';
import { IBand } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';
import { ITrack } from '../tracks/track.types';

export interface IGetAlbumsOptions {
  limit?: number;
  offset?: number;
}

export interface IAlbumOptions {
  name: string;
  released?: number;
  artists?: Array<string>;
  bands?: Array<string>;
  tracks?: Array<string>;
  genres?: Array<string>;
  image?: string;
}

export interface IAlbum {
  id: string;
  name: string;
  released: number;
  artists: IArtist;
  bands: IBand;
  tracks: ITrack;
  genres: IGenre;
  image: string;
}
