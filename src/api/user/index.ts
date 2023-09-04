import { post } from '@/api';
import { TUserLoginParams, TUserRegisterParams } from './type';
// 用户登录
export const login = (data: TUserLoginParams) => post('user/login', data);
// 用户注册
export const register = (data: TUserRegisterParams) => post('user/register', data);
