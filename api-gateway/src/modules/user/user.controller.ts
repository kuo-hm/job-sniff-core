import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GetUserId } from '../../common/decorators/get-user.decorator';
import { RegisterRequestDto } from './dtos/register.dto';
import { RegisterUseCase } from './usercases/register.usecase';

@Controller('user')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    await this.registerUseCase.execute({
      username: registerRequestDto.username,
      firstName: registerRequestDto.firstName,
      lastName: registerRequestDto.lastName,
      email: registerRequestDto.email,
      password: registerRequestDto.password,
    });
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'User information retrieved successfully' })
  async getMe(@GetUserId() userId: number) {
    return this.registerUseCase.getMe();
  }
}
