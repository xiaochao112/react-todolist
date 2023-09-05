import { post } from '@api';
import { TReqTaskList, TResTaskList } from './type';

// 获取任务列表
export const getTaskList = (data: TReqTaskList) =>
  post<TResTaskList, TReqTaskList>('/task/list', data);
