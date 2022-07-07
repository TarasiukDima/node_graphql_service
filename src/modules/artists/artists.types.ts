import { IBand } from '../bands/bands.types';

export interface IArtistOptions {
  name: string;
  released?: number;
  artists?: Array<string>;
  bands?: Array<string>;
  tracks?: Array<string>;
  genres?: Array<string>;
  image?: string;
}

export interface IArtist {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bands: IBand;
  instruments: Array<string>;
}
