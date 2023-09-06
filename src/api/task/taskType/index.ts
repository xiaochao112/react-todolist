import { TResponseMsg } from '@api/type';
import { TDelTaskTypeParams } from './type';
import { post } from '@api';

// 删除任务类型
export const delTaskItem = (data: TDelTaskTypeParams) =>
  post<TResponseMsg, TDelTaskTypeParams>('taskType/del', data);
