import { resStatus } from '@api/type';
import { userInfo } from '@store/user/type';
export type TUserLoginParams = {
  phone: string;
  password: string;
};

export interface TUserRegisterParams extends TUserLoginParams {
  username: string;
}

export interface TResponseUser extends resStatus {
  result: {
    token: string;
    user: userInfo;
  };
}

export interface TResponseRegister {
  code: number;
  result: string;
}
