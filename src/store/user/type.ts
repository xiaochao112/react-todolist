export type userInfo = {
  id: number;
  username: string;
  avatar: string;
  sex: 1 | 0;
  phone: string;
  createTime: string;
};

export type actionT = {
  type: string;
  info: userInfo;
};
