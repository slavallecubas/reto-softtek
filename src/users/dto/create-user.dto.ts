import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: `nombre debe ser un string` })
  @IsNotEmpty({ message: `nombre no debe estar vacío` })
  nombre: string;

  @IsString({ message: `email debe ser un string` })
  @IsEmail({}, { message: `email debe tener un formato válido` })
  @IsNotEmpty({ message: `email no debe estar vacío` })
  email: string;

  @IsString({ message: `passwordHash debe ser un string` })
  @IsNotEmpty({ message: `passwordHash no debe estar vacío` })
  passwordHash: string;
}
