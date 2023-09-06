import { post } from '@api';
import { TDelTaskParams, TReqTaskList, TResTaskList } from './type';
import { TResponseMsg } from '@api/type';

// 获取任务列表
export const getTaskList = (data: TReqTaskList) =>
  post<TResTaskList, TReqTaskList>('/task/list', data);
// 删除任务
export const delTaskItem = (data: TDelTaskParams) =>
  post<TResponseMsg, TDelTaskParams>('task/del', data);
