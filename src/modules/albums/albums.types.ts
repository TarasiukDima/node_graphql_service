import { IArtist } from '../artists/artists.types';
import { IBand } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';
import { ITrack } from '../tracks/track.types';

export interface IAlbumOptions {
  name: string;
  released?: number;
  artists?: Array<string>;
  bands?: Array<string>;
  tracks?: Array<string>;
  genres?: Array<string>;
  image?: string;
}

interface ICommonAlbum {
  id: string;
  name: string;
  released: number;
  image: string;
}

export interface IAlbum extends ICommonAlbum {
  artists: Array<IArtist | string>;
  bands: Array<IBand | string>;
  tracks: Array<ITrack | string>;
  genres: Array<IGenre | string>;
}

export interface IAlbumWithIDS extends ICommonAlbum {
  artists: Array<string>;
  bands: Array<string>;
  tracks: Array<string>;
  genres: Array<string>;
}
