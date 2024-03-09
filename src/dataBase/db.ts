import { IDataBase } from './dataBase.model';

export const db: IDataBase = {
  users: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      login: 'Rukala',
      password: '123',
      version: 1,
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  artists: [
    {
      id: '1',
      name: 'Mikalai',
      grammy: false,
    },
  ],
  album: [
    {
      id: '1',
      name: 'My life',
      year: 1983,
      artistId: '1',
    },
  ],
  tracks: [
    {
      id: '1',
      name: 'Hello',
      artistId: '1',
      albumId: '1',
      duration: 1,
    },
  ],
  favorites: {
    artists: ['Sting', 'Pink', 'Madonna'],
    tracks: ['Hello', 'Mellow', 'Yellow'],
    albums: ['My life', 'His life', 'Her life'],
  },
};
