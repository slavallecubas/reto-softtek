import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
