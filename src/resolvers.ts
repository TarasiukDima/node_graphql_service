import { albumsResolvers } from './modules/albums/resolvers/albums.resolver';
import { artistsResolvers } from './modules/artists/resolvers/artists.resolver';
import { bandsResolvers } from './modules/bands/resolvers/bands.resolver';
import { favouritesResolvers } from './modules/favourites/resolvers/favourites.resolver';
import { genresResolvers } from './modules/genres/resolvers/genres.resolver';
import { tracksResolvers } from './modules/tracks/resolvers/tracks.resolver';
import { usersResolvers } from './modules/users/resolvers/users.resolver';

export const resolvers = {
  Query: {
    ...albumsResolvers.Query,
    ...artistsResolvers.Query,
    ...bandsResolvers.Query,
    ...favouritesResolvers.Query,
    ...genresResolvers.Query,
    ...tracksResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...albumsResolvers.Mutation,
    ...artistsResolvers.Mutation,
    ...bandsResolvers.Mutation,
    ...favouritesResolvers.Mutation,
    ...genresResolvers.Mutation,
    ...tracksResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};
