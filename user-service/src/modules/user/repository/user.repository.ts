import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserProtoRegisterRequest } from '../../../config/grpc/proto/user.proto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class UserRepository  {
  constructor(private prisma: PrismaService) {}


  async findUserByEmail(email: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user || null; 
  }
  registerUser(data: UserProtoRegisterRequest): Promise<Omit<User, 'password'|'createdAt'|'updatedAt'> > {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password, 
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
      },
    });
  }
 
}