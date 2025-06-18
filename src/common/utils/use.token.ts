import { decode } from 'jsonwebtoken';
import { IAuthToken, IUseToken } from '../interfaces/commons.interface';

export const useToken = (jwtToken: string): IUseToken | string => {
  try {
    const decodeToken = decode(jwtToken) as IAuthToken;
    const currentDate = new Date();
    const expiresDate = new Date(decodeToken.exp);

    return {
      sub: decodeToken.sub,
      role: '',
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (err) {
    return 'Token inválido o incorrecto';
  }
};
