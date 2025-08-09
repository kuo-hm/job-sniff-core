import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repository/user.repository';
import { RegisterService } from './services/register.service';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [RegisterService,PrismaService,UserRepository],
})
export class UserModule {}
