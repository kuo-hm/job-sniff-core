import { Controller, UsePipes } from '@nestjs/common';
import { GrpcMethod, } from '@nestjs/microservices';
import { GrpcValidationPipe } from '../../config/grpc/validator';
import { LoginRequestDto } from './dtos/login.dto';
import { RegisterRequestDto, RegisterResponse } from './dtos/register.dto';
import { LoginService } from './services/login.service';

interface LoginResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Controller()
@UsePipes(GrpcValidationPipe)
export class AuthController {
  constructor(private readonly loginService: LoginService) { }

  @GrpcMethod('UserService', 'Login')
  async login(data: LoginRequestDto): Promise<LoginResponse> {
    return {
      username: "user.username",
      firstName: "user.firstName",
      lastName: "user.lastName",
      email: data.email,
    };
  }

  @GrpcMethod('UserService', 'Register')
  async register(data: RegisterRequestDto): Promise<RegisterResponse> {
    return {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }
}
