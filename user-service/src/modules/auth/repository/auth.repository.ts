import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthRepositoryInterface } from './auth.repository.type';


@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(private prisma: PrismaService) {}


 
}