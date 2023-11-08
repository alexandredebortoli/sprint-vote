import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    } as ConfigModuleOptions),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
