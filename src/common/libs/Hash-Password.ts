import { compare, genSalt, hash } from 'bcryptjs';
import { NUMERO } from './Constants';

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(NUMERO.DIEZ);
  return await hash(password, salt);
};

export const comparePassword = async (
  inputPassword: string,
  bdPassword: string,
): Promise<boolean> => {
  return await compare(inputPassword, bdPassword);
};
