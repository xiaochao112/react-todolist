import bcrypt from 'bcryptjs';
const SALT_ROUNDS = 10;

// 加密密码
export const encrypt = async (password: string) => {
  const res = await bcrypt.hash(password, SALT_ROUNDS);
  return res;
};
