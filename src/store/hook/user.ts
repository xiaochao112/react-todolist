import { setUserInfoAction, clearUserInfoAction } from '@/store/user/action';
import { userInfo } from '@/store/user/type';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStateUser } from '@/store/getters';

export const useStateUserInfo = () => useSelector(getStateUser);

export function useDispatchUser() {
  const dispatch = useDispatch();

  const stateSetUser = useCallback(
    (info: userInfo) => dispatch(setUserInfoAction(info)),
    [dispatch],
  );
  const stateClearUser = useCallback(() => dispatch(clearUserInfoAction()), [dispatch]);

  return { stateSetUser, stateClearUser };
}
