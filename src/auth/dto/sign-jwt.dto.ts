import { JwtPayload } from 'jsonwebtoken';

export class SignJWTDto {
  payload: JwtPayload;
  secret: string;
  expires: number | string;
}
