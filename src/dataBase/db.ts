import { IDataBase } from './dataBase.model';

export const db: IDataBase = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};
