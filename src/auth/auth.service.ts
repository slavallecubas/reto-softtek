import { Injectable } from '@nestjs/common';
import { comparePassword } from 'src/common/libs/Hash-Password';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import { ValidateAuthDto } from './dto/validate-auth.dto';
import { SignJWTDto } from './dto/sign-jwt.dto';
import { JwtPayload, sign } from 'jsonwebtoken';
import { AuthServiceResponse } from 'src/common/interfaces/commons.interface';
import { JWT_SECRET } from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validarUsuario(validateAuthDto: ValidateAuthDto): Promise<User | null> {
    const userByEmail = await this.userService.getOneByEmail(
      validateAuthDto.username,
    );

    if (userByEmail) {
      const match = await comparePassword(
        validateAuthDto.password,
        userByEmail.passwordHash,
      );
      if (match) return userByEmail;
    }
    return null;
  }

  firmarJWT({ expires, payload, secret }: SignJWTDto) {
    return sign(payload, secret, {
      expiresIn: expires as any,
    });
  }

  async generateResponse(user: User): Promise<AuthServiceResponse> {
    const getUsuario = await this.userService.getOneById(user.userId);

    if (!getUsuario) {
      return {
        accessToken: null,
        user: null,
        message: `No se ha encontrado el usuario con id: ${user.userId}`,
      };
    }

    const payload: JwtPayload = {
      sub: getUsuario.userId,
    };

    return {
      accessToken: this.firmarJWT({
        payload,
        secret: JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
