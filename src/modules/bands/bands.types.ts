import { IArtist } from '../artists/artists.types';
import { IGenre } from '../genres/genres.types';

export interface IGetBandsOptions {
  limit?: number;
  offset?: number;
}

export interface IBandOptions {
  name: string;
  origin: string;
  members: Array<String>;
  website: string;
  genres: IGenre;
}

export interface IAddBandOptions {
  inputOptions: IBandOptions;
}

export interface IUpdateBandOptions extends IAddBandOptions {
  id: number;
}

export interface IDeleteBandResponse {
  acknowledged: boolean;
  deletedCount: number;
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
