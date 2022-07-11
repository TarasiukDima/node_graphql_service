import { IGenre } from '../genres/genres.types';

export interface IBandOptions {
  name: string;
  origin: string;
  members: Array<String>;
  website: string;
  genresIds: IGenre;
}

export interface IMember {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
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
