import * as actionType from './actionType';
import { userInfo } from './type';

// 设置用户信息
export const setUserInfoAction = (info: userInfo) => ({ type: actionType.SET_USERINFO, info });
// 清除用户信息
export const clearUserInfoAction = () => ({ type: actionType.CLEAR_USERINFO });
