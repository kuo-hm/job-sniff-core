import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { grpcClientOptions } from './config/grpc/grpc-clients.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register(grpcClientOptions),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
