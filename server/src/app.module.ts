import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    } as ConfigModuleOptions),
    DatabaseModule,
    TeamsModule,
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
