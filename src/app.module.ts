import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './endpoints/user/user.module';
import { ArtistModule } from './endpoints/artist/artist.module';
import { TrackModule } from './endpoints/track/track.module';
import { AlbumModule } from './endpoints/album/album.module';
import { FavoritesModule } from './endpoints/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
