export type TUserLoginParams = {
  phone: string;
  password: string;
};

export interface TUserRegisterParams extends TUserLoginParams {
  username: string;
}
