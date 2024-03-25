import { IDataBase } from './dataBase.model';

export const db: IDataBase = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    id:'test',
    artists: [],
    tracks: [],
    albums: [],
  },
};
