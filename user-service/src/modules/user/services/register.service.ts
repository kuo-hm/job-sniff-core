import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserProtoRegisterRequest } from '../../../config/grpc/proto/user.proto';
import { RegisterRequestDto, RegisterResponse } from '../dtos/register.dto';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class RegisterService {

  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(data: RegisterRequestDto): Promise<RegisterResponse> {
    const user = await this.userRepository.findUserByEmail(data.email)
    if (user) {
      throw new RpcException({
        code: 6,
        message: 'User already exists',
      });
    }
    const payload: UserProtoRegisterRequest = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    }
    return this.userRepository.registerUser(payload);
    
  }

}
