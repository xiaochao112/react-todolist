import { TaskType } from './taskType/type';

export type TTaskItem = {
  taskId: number;
  userId: number;
  typeId: number;
  status: 1 | 0;
  taskName: string;
  taskContent: string;
  completeTime: string;
  createTime: string;
  updateTime: string;
  typeMessage: TaskType;
  expectTime: string | null;
};

export type TUserTaskList = {
  total: number;
  result: TTaskItem[];
  page: number;
  typeId?: number | undefined;
};

export type TReqTaskList = {
  page: number;
  pageSize: number;
  typeId?: number;
  startTime?: number;
  endTime?: number;
  status?: number;
};

export type TResTaskList = {
  code: number;
  message: number;
  result?: TUserTaskList;
};

export type TAddTaskParams = {
  taskName: string;
  taskContent: string;
  typeId: number;
  expectTime?: string;
};
export type TDelTaskParams = {
  taskId: number;
};
export type TUpdateTaskParams = TAddTaskParams & TDelTaskParams;

export type TUpdateTaskStatusParams = {
  userId?: number;
  taskId: number;
  status?: number;
};

export type TResUpdateOrAddTask = {
  code: number;
  message: string;
  result?: TTaskItem;
};
