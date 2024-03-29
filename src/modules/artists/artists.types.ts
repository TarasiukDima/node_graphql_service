import { IBand } from '../bands/bands.types';

export interface IArtistOptions {
  firstName: string;
  secondName?: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country?: string;
  bandsIds?: Array<string>;
  instruments?: Array<string>;
}

interface ICommonArtist {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  instruments: Array<string>;
}

export interface IArtist extends ICommonArtist {
  bands: Array<IBand | string>;
}

export interface IArtistWithIDS extends ICommonArtist {
  bands: Array<string>;
}
