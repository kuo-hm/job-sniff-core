import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginRequestDto } from './dtos/login.dto';
import { LoginService } from './services/login.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginRequestDto: LoginRequestDto) {
    await this.loginService.execute({
      email: loginRequestDto.email,
      password: 'loginRequestDto.password',
    });
  }
}
