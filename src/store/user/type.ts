// 登录信息
export type userInfo = {
  id: number;
  username: string;
  avatar: string;
  sex: 1 | 0;
  phone: string;
  createTime: string;
};
// 用户信息
export type TInfo = {
  isLogin: boolean;
  user: userInfo;
};
// state
export type actionT = {
  type: string;
  info: TInfo;
};
