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
  id: string;
  artist: IArtist;
  instrument: string;
  years: Array<string>;
}

export interface IBand {
  id: string;
  name: string;
  origin: string;
  members: IMember;
  website: string;
  genres: IGenre;
}
