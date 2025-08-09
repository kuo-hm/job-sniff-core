import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

import { Match } from '../../../common/validators/match.validator';

export class RegisterRequestDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'User password' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'P@ssw0rd', description: 'Password confirmation' })
  @IsNotEmpty()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'johndoe', description: 'User username' })
  @IsNotEmpty()
  username: string;
}
