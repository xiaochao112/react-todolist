import { post } from '@/api';
import { TResponseUser, TUserLoginParams, TResponseRegister, TUserRegisterParams } from './type';
// 用户登录
export const login = (data: TUserLoginParams) =>
  post<TResponseUser, TUserLoginParams>('user/login', data);

// 用户注册
export const register = (data: TUserRegisterParams) =>
  post<TResponseRegister, TUserRegisterParams>('user/register', data);
