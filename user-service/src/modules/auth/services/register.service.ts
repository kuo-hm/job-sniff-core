import { Injectable } from '@nestjs/common';
import { RegisterRequestDto, RegisterResponse } from '../dtos/register.dto';

@Injectable()
export class RegisterService {

  constructor(
  ) {}

  execute(data: RegisterRequestDto): RegisterResponse {
    return {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }

}
