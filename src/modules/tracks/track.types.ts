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

interface ICommonTrack {
  id: string;
  title: string;
  duration: number;
  released: number;
}

export interface ITrack extends ICommonTrack {
  albums: Array<IAlbum | string>;
  bands: Array<IBand | string>;
  genres: Array<IGenre | string>;
}

export interface ITrackWithIds extends ICommonTrack {
  albums: Array<string>;
  bands: Array<string>;
  genres: Array<string>;
}
