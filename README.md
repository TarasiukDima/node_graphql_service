# node_graphql_service

## Installation

1. Download repo.
   - git clone git@github.com:TarasiukDima/node_graphql_service.git
2. Change folder path.
   - cd remote-control
3. Download all branches.
   - git pull --all
4. Change actual branch.
   - git checkout develop
5. Install dependencies.
   - npm install
6. Rename file from .env.default to .env
7. Change links url with port for microservices in .env file.

> #### For check need download, install and start repo with microservices - [https://github.com/rolling-scopes-school/node-graphql-service](https://github.com/rolling-scopes-school/node-graphql-service).

## Usage

**Development** - npm run start.

- App served 'http://localhost:3000' with nodemon

## Information:

- http://localhost:3000/ - url front. Default port 3000. You can change Port in file .env
- For check work all mutations need be login. You need get jwt with loginUser mutation, then you need write on headers your's operations ** 'Authorization' - 'Bearer ${your jwt}'**
- [ID!] - array with ids.

## Check tasks:

1. Start the project. npm run start
2. Start the microservices. npm run run:all:prod - default.
3. Open the http://localhost:3000.
4. check Query and Mutations.

## Project:

### 1. USER

**Schema:**

```sh
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
  }
```

#### Operations:

- create User **registrationUser** get 4 args: firstName, lastName, email, password(min 8 letters);
- login User **loginUser** get 2 args: email, password;
- get user Info **userInfo** get 2 args: email, password;

### 2. Albums

**Schema:**

```sh
    type Album {
      id: ID!
      name: String
      released: Int
      image: String
      artists: [Artist]
      bands: [Band]
      tracks: [Track]
      genres: [Genre]
    }
```

```sh
    input AlbumOptions {
      name: String!
      released: Int
      image: String
      artistsIds: [ID!]
      bandsIds: [ID!]
      trackIds: [ID!]
      genresIds: [ID!]
    }
```

#### Operations:

- get albums **getAlbums** get 1 not required arg: {limit?: number; offset?: number};
- get one album **getAlbum** get 1 arg: id album;
- create Album **addAlbum** get 1 arg: inputOptions: AlbumOptions!;
- update Album info **updateAlbum** get 1 arg: {id album, inputOptions: AlbumOptions!};
- delete Album **removeAlbum** get 1 arg: id album;

### 3. Artists

**Schema:**

```sh
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    instruments: [String!]
    bands: [Band!]
  }
```

```sh
  input ArtistOptions {
    firstName: String!
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    instruments: [String!]
    bands: [ID!]
  }
```

#### Operations:

- get artists **getArtists** get 1 not required arg: {limit?: number; offset?: number};
- get one artist **getArtist** get 1 arg: id artist;
- create artist **addArtist** get 1 arg: inputOptions: ArtistOptions!;
- update artist info **updateArtist** get 1 arg: {id artist, inputOptions: ArtistOptions!};
- delete artist **removeArtist** get 1 arg: id artist;

### 4. Bands

**Schema:**

```sh
  type Band {
    id: ID!
    name: String
    origin: String
    website: String
    members: [Member!]
    genres: [Genre!]
  }

  type Member {
    artist: Artist!
    instrument: String
    years: String
  }
```

```sh
  input MemberOptions {
    artist: ID!
    instrument: String
    years: String
  }

  input BandOptions {
    name: String!
    origin: String
    website: String
    members: [MemberOptions!]
    genres: [ID!]
  }
```

#### Operations:

- get bands **getBands** get 1 not required arg: {limit?: number; offset?: number};
- get one band **getBand** get 1 arg: id band;
- create band **addBand** get 1 arg: inputOptions: BandOptions!;
- update band info **updateBand** get 1 arg: {id band, inputOptions: BandOptions!};
- delete band **removeBand** get 1 arg: id band;

### 5. Favourites

**Schema:**

```sh
   type Favourites {
    id: ID!
    userId: ID!
    bands: [Band!]
    genres: [Genre!]
    artists: [Artist!]
    tracks: [Track!]
  }
```

#### Operations:

- get Favourites (need jwt token) **getFavourites**;
- add Track to favourites **addTrackToFavourites** get 1 arg: id Track;
- add Band to favourites **addBandToFavourites** get 1 arg: id Band;
- add Artist to favourites **addArtistToFavourites** get 1 arg: id Artist;
- add Genre to favourites **addGenreToFavourites** get 1 arg: id Genre;
- remove Track to favourites **removeTrackFromFavourites** get 1 arg: id Track;
- remove Band to favourites **removeBandFromFavourites** get 1 arg: id Band;
- remove Artist to favourites **removeArtistFromFavourites** get 1 arg: id Artist;
- remove Genre to favourites **removeGenreFromFavourites** get 1 arg: id Genre;

### 6. Genres

**Schema:**

```sh
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
```

```sh
  input GenreOptions {
    name: String!
    description: String
    country: String
    year: Int
  }
```

#### Operations:

- get genres **getGenres** get 1 not required arg: {limit?: number; offset?: number};
- get one genre **getGenre** get 1 arg: id genre;
- create genre **addGenre** get 1 arg: inputOptions: GenreOptions!;
- update genre info **updateGenre** get 1 arg: {id genre, inputOptions: GenreOptions!};
- delete genre **removeGenre** get 1 arg: id genre;
-

### 7. Tracks

**Schema:**

```sh
  type Track {
    id: ID!
    title: String
    duration: Int
    released: Int
    album: Album
    artists: [Artist]
    bands: [Band]
    genres: [Genre]
  }
```

```sh
  input TrackOptions {
    title: String!
    duration: Int
    released: Int
    album: ID
    artists: [ID!]
    bands: [ID!]
    genres: [ID!]
  }
```

#### Operations:

- get tracks **getTracks** get 1 not required arg: {limit?: number; offset?: number};
- get one track **getTrack** get 1 arg: id track;
- create track **addTrack** get 1 arg: inputOptions: TrackOptions!;
- update track info **updateTrack** get 1 arg: {id track, inputOptions: TrackOptions!};
- delete track **removeTrack** get 1 arg: id track;
