import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CreatePlayerController } from './controllers/create-player.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateTeamController } from './controllers/create-team.controller';
import { FetchTeamsController } from './controllers/fetch-teams.controller';
import { FetchTeamPlayersController } from './controllers/fetch-team-players.controller';
import { FetchTeamGameHistoryController } from './controllers/fetch-team-game-history.controller';
import { AddPlayerToTeamController } from './controllers/add-player-to-team.controller';
import { RemovePlayerFromTeamController } from './controllers/remove-player-from-team.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    AuthenticateController,
    CreatePlayerController,
    CreateTeamController,
    FetchTeamsController,
    FetchTeamPlayersController,
    FetchTeamGameHistoryController,
    AddPlayerToTeamController,
    RemovePlayerFromTeamController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
