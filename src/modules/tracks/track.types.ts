import { IAlbum } from '../albums/albums.types';
import { IBand } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';

export interface ITrackOptions {
  title: string;
  duration: number;
  released: number;
  albums: IAlbum;
  bands: IBand;
  genres: IGenre;
}

export interface ITrack {
  id: string;
  title: string;
  duration: number;
  released: number;
  albums: IAlbum;
  bands: IBand;
  genres: IGenre;
}
