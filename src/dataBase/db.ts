import { IDataBase } from './dataBase.model';

export const db: IDataBase = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: {
    artists: ['Sting', 'Pink', 'Madonna'],
    tracks: ['Hello', 'Mellow', 'Yellow'],
    albums: ['My life', 'His life', 'Her life'],
  },
};
