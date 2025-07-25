import { Controller, Get } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Get('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login() {
    await this.loginService.execute({
      email: 'email',
      password: 'password',
    });
  }
}
