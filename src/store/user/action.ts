import * as actionType from './actionType';
import { TInfo } from './type';

// 设置用户信息
export const setUserInfoAction = (info: TInfo) => ({
  type: actionType.SET_USERINFO,
  info,
});
// 清除用户信息
export const clearUserInfoAction = () => ({ type: actionType.CLEAR_USERINFO });
