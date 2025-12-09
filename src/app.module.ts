import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceModule } from './bll/service.module';
import { DalModules } from './dal/dal.modules';
import { FrontEndModule } from './modules/frontend/frontend.modules';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ResponseModules } from './app/common/response.modules';
import { LoggerModule } from './app/logger/logger.modules';
import { ExceptionsFilterService } from './app/services/exception-filter.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const entitiesGlob = __filename.endsWith('.ts')
          ? 'src/**/*.entity.ts'
          : 'dist/**/*.entity.js';

        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [entitiesGlob],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ServiceModule,
    ResponseModules,
    DalModules,
    FrontEndModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    ConfigService,
    {
      provide: 'APP_FILTER',
      useClass: ExceptionsFilterService,
    },
  ],
  exports: [JwtStrategy],
})
export class AppModule {}
