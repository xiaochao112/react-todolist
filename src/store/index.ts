import { combineReducers } from 'redux';
import UserReducer from './user/reducer';
import TaskTypeReducer from './task/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { TInfo } from '@/store/user/type';
import { TaskType } from './task/type';

// 定义state
export type RootState = {
  user: TInfo;
  taskType: TaskType[];
};

const reducer = combineReducers({
  user: UserReducer,
  taskType: TaskTypeReducer,
});

const store = configureStore({
  reducer,
});

export default store;
