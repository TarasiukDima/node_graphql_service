import { IAlbumService } from 'src/modules/albums/services/albums.service';
import { IArtistsService } from 'src/modules/artists/services/artists.service';
import { IBandsService } from 'src/modules/bands/services/bands.service';
import { IFavouritesService } from 'src/modules/favourites/services/favourites.service';
import { IGenresService } from 'src/modules/genres/services/genres.service';
import { ITracksService } from 'src/modules/tracks/services/tracks.service';
import { IUserService } from '../modules/users/services/users.service';

export interface IServices {
  albumService: IAlbumService;
  artistsService: IArtistsService;
  bandsService: IBandsService;
  favouritesService: IFavouritesService;
  genresService: IGenresService;
  tracksService: ITracksService;
  usersService: IUserService;
}

export interface IContext {
  token: string;
  dataSources: IServices;
}
