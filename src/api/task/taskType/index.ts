import { TResponseMsg } from '@api/type';
import {
  TAddTaskTypeParams,
  TDelTaskTypeParams,
  TResTaskTypeList,
  TUpdateTaskTypeParams,
} from './type';
import { post } from '@api';

// 获取任务类型列表接口
export const getTaskTypeList = () => post<TResTaskTypeList, object>('/taskType/list', {});

// 添加任务类型接口
export const addTaskType = (data: TAddTaskTypeParams) =>
  post<TResponseMsg, TAddTaskTypeParams>('taskType/add', data);

// 编辑任务类型接口
export const updateTaskType = (data: TUpdateTaskTypeParams) =>
  post<TResponseMsg, TUpdateTaskTypeParams>('taskType/update', data);

// 删除任务类型
export const delTaskType = (data: TDelTaskTypeParams) =>
  post<TResponseMsg, TDelTaskTypeParams>('taskType/del', data);
