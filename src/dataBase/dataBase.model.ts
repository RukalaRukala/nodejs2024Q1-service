export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface IFavorites {
  artists: IArtist[]; // favorite artist ids
  albums: IAlbum[]; // favorite album ids
  tracks: ITrack[]; // favorite track ids
}

export interface IDataBase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: IFavorites;
}

export type IDataBaseFields = IUser[] | IAlbum[] | ITrack[] | IArtist[];
export type Favorite = IUser[] | IAlbum[] | ITrack[] | IArtist[];

export enum DB_FIELD {
  TRACKS = 'tracks',
  ALBUMS = 'albums',
  ARTISTS = 'artists',
}
