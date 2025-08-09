import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { GRPC_SERVICE_NAMES } from './common/constants/grpc.constants';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: GRPC_SERVICE_NAMES.USER,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: join(process.cwd(), 'src/config/grpc/proto/user.proto'),
            url: configService.get<string>('USER_SERVICE_URL') || 'user-service:50051',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: GRPC_SERVICE_NAMES.SCRAPER,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'scraper',
            protoPath: join(process.cwd(), 'src/config/grpc/proto/scraper.proto'),
            url: configService.get<string>('SCRAPER_MANAGER_URL') || 'user-service:50051',
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
