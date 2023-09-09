import { TResponseMsg } from '@api/type';
import { TDelTaskTypeParams, TResTaskTypeList } from './type';
import { post } from '@api';

// 获取任务类型列表接口
export const getTaskTypeList = () => post<TResTaskTypeList, object>('/taskType/list', {});

// 删除任务类型
export const delTaskItem = (data: TDelTaskTypeParams) =>
  post<TResponseMsg, TDelTaskTypeParams>('taskType/del', data);
