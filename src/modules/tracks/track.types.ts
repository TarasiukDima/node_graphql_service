import { IAlbum } from '../albums/albums.types';
import { IArtist } from '../artists/artists.types';
import { IBand } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';

export interface ITrackOptions {
  title: string;
  duration: number;
  released: number;
  albumId: string;
  artistsIds: Array<string>;
  bandsIds: Array<string>;
  genresIds: Array<string>;
}

interface ICommonTrack {
  id: string;
  title: string;
  duration: number;
  released: number;
}

export interface ITrack extends ICommonTrack {
  album: IAlbum | string;
  artists: Array<IArtist | string>;
  bands: Array<IBand | string>;
  genres: Array<IGenre | string>;
}

export interface ITrackWithIds extends ICommonTrack {
  album: string;
  artists: Array<string>;
  bands: Array<string>;
  genres: Array<string>;
}
