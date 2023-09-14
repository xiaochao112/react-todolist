import * as actionType from './actionType';
import { TaskType } from './type';

// 设置用户信息
export const setTaskTypeAction = (taskTypeList: TaskType[]) => ({
  type: actionType.SET_TASKTYPE,
  taskTypeList,
});
// 清除用户信息
export const clearTaskTypeAction = () => ({ type: actionType.CLEAR_TASKTYPE });
