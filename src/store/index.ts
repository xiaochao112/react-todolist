import { combineReducers } from 'redux';
import UserReducer from './user/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { TInfo } from '@/store/user/type';

// 定义state
export type RootState = {
  user: TInfo;
};

const reducer = combineReducers({
  user: UserReducer,
});

const store = configureStore({
  reducer,
});

export default store;
