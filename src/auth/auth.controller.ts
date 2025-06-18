import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateAuthDto } from './dto/validate-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() validateAuthDto: ValidateAuthDto) {
    const userValidate = await this.authService.validarUsuario(validateAuthDto);
    if (!userValidate) {
      throw new UnauthorizedException(`Contraseña errónea`);
    }
    return await this.authService.generateResponse(userValidate);
  }
}
