import { IArtist } from '../artists/artists.types';
import { IGenre } from '../genres/genres.types';

export interface IBandOptions {
  name: string;
  origin: string;
  members: Array<String>;
  website: string;
  genres: IGenre;
}

export interface IMember {
  artist: IArtist | string;
  instrument: string;
  years: Array<string>;
}

interface ICommonBand {
  id: string;
  name: string;
  origin: string;
  members: Array<IMember>;
  website: string;
}

export interface IBand extends ICommonBand {
  genres: Array<IGenre | string>;
}

export interface IBandWithIds extends ICommonBand {
  genres: Array<string>;
}
