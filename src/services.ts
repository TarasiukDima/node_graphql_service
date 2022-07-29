import { albumService } from './modules/albums/services/albums.service';
import { artistsService } from './modules/artists/services/artists.service';
import { bandsService } from './modules/bands/services/bands.service';
import { favouritesService } from './modules/favourites/services/favourites.service';
import { genresService } from './modules/genres/services/genres.service';
import { tracksService } from './modules/tracks/services/tracks.service';
import { usersService } from './modules/users/services/users.service';
import { IServices } from './types';

export const services: IServices = {
  albumService,
  artistsService,
  bandsService,
  favouritesService,
  genresService,
  tracksService,
  usersService,
};
