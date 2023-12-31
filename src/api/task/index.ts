import { post } from '@api';
import {
  TAddTaskParams,
  TDelTaskParams,
  TReqTaskList,
  TResTaskList,
  TResUpdateOrAddTask,
  TSearchTaskParams,
  TUpdateTaskParams,
  TUpdateTaskStatusParams,
} from './type';
import { TResponseMsg } from '@api/type';

// 获取任务列表
export const getTaskList = (data: TReqTaskList) =>
  post<TResTaskList, TReqTaskList>('/task/list', data);

// 添加任务
export const addTaskItem = (data: TAddTaskParams) =>
  post<TResUpdateOrAddTask, TAddTaskParams>('task/add', data);

// 编辑任务
export const updateTaskItem = (data: TUpdateTaskParams) =>
  post<TResUpdateOrAddTask, TUpdateTaskParams>('task/update', data);

// 更新状态
export const updateTaskStatus = (data: TUpdateTaskStatusParams) =>
  post<TResUpdateOrAddTask, TUpdateTaskStatusParams>('task/updateStatus', data);

// 搜索任务
export const searchTask = (data: TSearchTaskParams) =>
  post<TResTaskList, TSearchTaskParams>('task/search', data);

// 删除任务
export const delTaskItem = (data: TDelTaskParams) =>
  post<TResponseMsg, TDelTaskParams>('task/del', data);
