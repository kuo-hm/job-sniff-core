import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserProtoLoginRequest } from '../../../config/grpc/proto/user.proto';

export class LoginRequestDto implements UserProtoLoginRequest {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
