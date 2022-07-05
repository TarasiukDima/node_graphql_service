import { IAlbum } from '../albums/albums.types';
import { IBand } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';

export interface ITrack {
  id: string;
  title: string;
  albums: IAlbum;
  bands: IBand;
  duration: number;
  released: number;
  genres: IGenre;
}
