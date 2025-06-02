import * as bcrypt from 'bcrypt';

const round: number = 10;

export const hashPassword = async (plain: string): Promise<string> => {
  const hashed: string = bcrypt.hashSync(plain, round);
  return hashed;
};

export const checkPassword = async (plain: string, hashed: string): Promise<boolean> => {
  const result = bcrypt.compareSync(plain, hashed);
  return !!result;
};