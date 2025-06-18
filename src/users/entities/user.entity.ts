import { CreateUserDto } from '../dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

export class User {
  userId: string;
  nombre: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;

  static nuevaInstanciaFromDTO(data: CreateUserDto) {
    const resultado = new User();

    resultado.userId = uuidv4();
    resultado.nombre = data.nombre;
    resultado.email = data.email;
    resultado.passwordHash = data.passwordHash;
    resultado.createdAt = new Date();

    return resultado;
  }

  static nuevaInstanciaFromDynamo(data: any): User {
    const result = new User();

    result.userId = data.userId;
    result.nombre = data.nombre;
    result.email = data.email;
    result.passwordHash = data.passwordHash;
    result.createdAt = new Date(Number(data.createdAt));
    if (data.updatedAt) {
      result.updatedAt = new Date(Number(data.updatedAt));
    }

    return result;
  }
}
