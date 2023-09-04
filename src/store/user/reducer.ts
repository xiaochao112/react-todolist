import { getKey, setKey, rmKey } from '@utils';
import * as actionType from './actionType';
import { actionT } from './type';

const UserState = getKey('user') || { isLogin: false, user: {} };

export default function reducer(state = UserState, action: actionT) {
  const { type, info } = action;
  switch (type) {
    case actionType.SET_USERINFO:
      setKey('user', info);
      return info;
    case actionType.CLEAR_USERINFO:
      rmKey('user');
      return { isLogin: false, user: {} };
    default:
      return state;
  }
}
