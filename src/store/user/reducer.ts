import * as actionType from './actionType';
import { actionT } from './type';

const UserState = {};

export default function reducer(state = UserState, action: actionT) {
  const { type, info } = action;
  switch (type) {
    case actionType.SET_USERINFO:
      return info;
    case actionType.CLEAR_USERINFO:
      return null;
    default:
      return state;
  }
}
