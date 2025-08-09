import { Controller, UsePipes } from '@nestjs/common';
import { GrpcMethod, } from '@nestjs/microservices';
import { GrpcValidationPipe } from '../../config/grpc/validator';
import { RegisterRequestDto, RegisterResponse } from './dtos/register.dto';
import { RegisterService } from './services/register.service';


@UsePipes(GrpcValidationPipe)
@Controller()
export class UserController {
  constructor(private readonly registerService: RegisterService) { }


  @GrpcMethod('UserService', 'Register')
  async register(data: RegisterRequestDto): Promise<RegisterResponse> {
    return this.registerService.execute(data);
  }
}
