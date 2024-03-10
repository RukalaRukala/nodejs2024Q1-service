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
  artists: string[]; // favorite artist ids
  albums: string[]; // favorite album ids
  tracks: string[]; // favorite track ids
}

export interface IDataBase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  album: IAlbum[];
  favorites: IFavorites;
}

export type IDataBaseFields = IUser[] | IAlbum[] | ITrack[] | IArtist[];
