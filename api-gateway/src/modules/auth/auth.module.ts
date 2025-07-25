import { ClientsModule } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';
import { Module } from '@nestjs/common';
import { grpcUserClient } from 'src/config/grpc/grpc-clients.config';

@Module({
  imports: [ClientsModule.register([grpcUserClient])],
  controllers: [AuthController],
  providers: [LoginService],
})
export class AuthModule {}
