import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/common/libs/Constants';
import { IUseToken } from 'src/common/interfaces/commons.interface';
import { useToken } from 'src/common/utils/use.token';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['x-reto-token'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Falta Token');
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token ha expirado');
    }

    const { sub } = manageToken;
    const usuarioEncontrado = await this.userService.getOneById(sub['S']);

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('Usuario inválido');
    }

    // req.userId = usuarioEncontrado.userId
    return true;
  }
}
