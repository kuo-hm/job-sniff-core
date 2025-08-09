import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserProtoRegisterRequest, UserProtoResponse } from '../../../config/grpc/proto/user.proto';

export class RegisterRequestDto implements UserProtoRegisterRequest {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'johndoe' })
  @IsNotEmpty()
  username: string;
}

export class RegisterResponse implements UserProtoResponse {
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  
}