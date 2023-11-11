import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TeamEntity } from './entities/team.entity';
import { PlayerEntity } from './entities/player.entity';
import { TeamsPlayersEntity } from './entities/teams-players.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        entities: [TeamEntity, PlayerEntity, TeamsPlayersEntity],
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    } as TypeOrmModuleOptions),
  ],
})
export class DatabaseModule {}
