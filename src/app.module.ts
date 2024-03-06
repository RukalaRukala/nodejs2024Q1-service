import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './endpoints/users/users.module';
import { ArtistsModule } from './endpoints/artists/artists.module';
import { TracksModule } from './endpoints/tracks/tracks.module';
import { AlbumsModule } from './endpoints/albums/albums.module';
import { FavoritesModule } from './endpoints/favorites/favorites.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
