import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { GRPC_SERVICE_NAMES } from '../../common/constants/grpc.constants';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';
import { JwtStrategy } from './startegy/jwt.strategy';

@Module({
  imports: [
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
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [LoginService, JwtStrategy],
})
export class AuthModule {}
