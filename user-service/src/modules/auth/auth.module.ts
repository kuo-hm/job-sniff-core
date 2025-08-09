import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginService } from './services/login.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [LoginService],
})
export class AuthModule {}
