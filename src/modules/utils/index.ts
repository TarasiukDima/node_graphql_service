import { IAlbumService } from '../albums/services/albums.service';
import { IArtistsService } from '../artists/services/artists.service';
import { IBandsService } from '../bands/services/bands.service';
import { IGenresService } from '../genres/services/genres.service';
import { ITracksService } from '../tracks/services/tracks.service';
import { IAlbum } from '../albums/albums.types';
import { IArtist } from '../artists/artists.types';
import { IBand, IMember } from '../bands/bands.types';
import { IGenre } from '../genres/genres.types';
import { ITrack } from '../tracks/track.types';
import { IContext, IServices } from 'src/types';
import { genresResolvers } from '../genres/resolvers/genres.resolver';
import { albumsResolvers } from '../albums/resolvers/albums.resolver';
import { artistsResolvers } from '../artists/resolvers/artists.resolver';
import { tracksResolvers } from '../tracks/resolvers/tracks.resolver';
import { bandsResolvers } from '../bands/resolvers/bands.resolver';

const getArrayWithNotEmptyObjects = <T>(
  array: Array<PromiseSettledResult<T>>,
  key: string
): Array<T> => {
  const goodArray = array
    .map((res) =>
      res.status === 'fulfilled' && res.value && res.value[key as keyof T] ? res.value : null
    )
    .filter((el) => el);

  return goodArray as Array<T>;
};

const getAlbums = async (array: Array<string>, service: IServices): Promise<Array<IAlbum>> => {
  if (!array || !array.length) return [];

  const genres = array.map(
    async (id) =>
      await albumsResolvers.Query.getAlbum(null, { id }, { dataSources: service } as IContext)
  );
  const albumsAllInfo = await Promise.allSettled(genres);
  const bandsFull = getArrayWithNotEmptyObjects<IAlbum>(albumsAllInfo, 'id');

  return bandsFull;
};

const getArtists = async (array: Array<string>, service: IServices): Promise<Array<IArtist>> => {
  if (!array || !array.length) return [];

  const artists = array.map(
    async (id) =>
      await artistsResolvers.Query.getArtist(null, { id }, { dataSources: service } as IContext)
  );
  const artistsAllInfo = await Promise.allSettled(artists);
  const artistsFull = getArrayWithNotEmptyObjects<IArtist>(artistsAllInfo, 'id');

  return artistsFull;
};

const getBands = async (array: Array<string>, service: IServices): Promise<Array<IBand>> => {
  if (!array || !array.length) return [];

  const bands = array.map(
    async (id) =>
      await bandsResolvers.Query.getBand(null, { id }, { dataSources: service } as IContext)
  );
  const bandsAllInfo = await Promise.allSettled(bands);
  const bandsFull = getArrayWithNotEmptyObjects<IBand>(bandsAllInfo, 'id');

  return bandsFull;
};

const getGenres = async (array: Array<string>, service: IServices): Promise<Array<IGenre>> => {
  if (!array || !array.length) return [];

  const genres = array.map(
    async (id) =>
      await genresResolvers.Query.getGenre(null, { id }, { dataSources: service } as IContext)
  );
  const genresAllInfo = await Promise.allSettled(genres);
  const genresFull = getArrayWithNotEmptyObjects<IGenre>(genresAllInfo, 'id');

  return genresFull;
};

const getTracks = async (array: Array<string>, service: IServices): Promise<Array<ITrack>> => {
  if (!array || !array.length) return [];

  const tracks = array.map(
    async (id) =>
      await tracksResolvers.Query.getTrack(null, { id }, { dataSources: service } as IContext)
  );
  const tracksAllInfo = await Promise.allSettled(tracks);
  const tracksFull = getArrayWithNotEmptyObjects<ITrack>(tracksAllInfo, 'id');

  return tracksFull;
};

const getMembers = async (array: Array<IMember>, service: IServices): Promise<Array<IMember>> => {
  if (!array || !array.length) return [];

  const members = array.map(async (oneMember) => {
    return {
      ...oneMember,
      artist: await artistsResolvers.Query.getArtist(null, { id: oneMember.artist as string }, {
        dataSources: service,
      } as IContext),
    };
  });

  const membersAllInfo = await Promise.allSettled(members);
  const membersFull = getArrayWithNotEmptyObjects<IMember>(membersAllInfo, 'artist');

  return membersFull;
};

export const getAlbumsArray = async (
  array: Array<string>,
  albumService: IAlbumService,
  service: IServices
): Promise<Array<IAlbum>> => {
  if (!array.length) return [];

  const albumsPromisesArray = array.map(async (oneAlbumId) => {
    const album = await albumService.getAlbum(oneAlbumId);

    return {
      ...album,
      artists: await getArtists(album.artists, service),
      bands: await getBands(album.bands, service),
      tracks: await getTracks(album.tracks, service),
      genres: await getGenres(album.genres, service),
    };
  });
  const albumsAnswers = await Promise.allSettled(albumsPromisesArray);
  const albums = getArrayWithNotEmptyObjects<IAlbum>(albumsAnswers, 'id');

  return albums;
};

export const getArtistsArray = async (
  array: Array<string>,
  artistsService: IArtistsService,
  service: IServices
): Promise<Array<IArtist>> => {
  if (!array.length) return [];

  const artistsPromisesArray = array.map(async (oneArtistId) => {
    const artist = await artistsService.getArtist(oneArtistId);

    return {
      ...artist,
      bands: await getBands(artist.bands, service),
    };
  });
  const artistsAnswers = await Promise.allSettled(artistsPromisesArray);
  const artists = getArrayWithNotEmptyObjects<IArtist>(artistsAnswers, 'id');

  return artists;
};

export const getMembersArray = async (
  array: Array<IMember>,
  service: IServices
): Promise<Array<IMember>> => {
  return await getMembers(array, service);
};

export const getBandsArray = async (
  array: Array<string>,
  bandsService: IBandsService,
  service: IServices
): Promise<Array<IBand>> => {
  if (!array.length) return [];

  const bandsPromisesArray = array.map(async (oneBandId) => {
    const band = await bandsService.getBand(oneBandId);

    return {
      ...band,
      members: await getMembers(band.members, service),
      genres: await getGenres(band.genres, service),
    };
  });
  const bandsAnswers = await Promise.allSettled(bandsPromisesArray);
  const bands = getArrayWithNotEmptyObjects<IBand>(bandsAnswers, 'id');

  return bands;
};

export const getGenresArray = async (
  array: Array<string>,
  genresService: IGenresService
): Promise<Array<IGenre>> => {
  if (!array.length) return [];

  const genresPromisesArray = array.map(
    async (oneGenreId) => await genresService.getGenre(oneGenreId)
  );
  const genresAnswers = await Promise.allSettled(genresPromisesArray);
  const genres = getArrayWithNotEmptyObjects<IGenre>(genresAnswers, 'id');

  return genres;
};

export const getTracksArray = async (
  array: Array<string>,
  tracksService: ITracksService,
  service: IServices
): Promise<Array<ITrack>> => {
  if (!array.length) return [];

  const tracksPromisesArray = array.map(async (oneTrackId) => {
    const track = await tracksService.getTrack(oneTrackId);

    return {
      ...track,
      albums: await getAlbums(track.albums, service),
      bands: await getBands(track.bands, service),
      genres: await getGenres(track.genres, service),
    };
  });
  const tracksAnswers = await Promise.allSettled(tracksPromisesArray);
  const tracks = getArrayWithNotEmptyObjects<ITrack>(tracksAnswers, 'id');

  return tracks;
};
