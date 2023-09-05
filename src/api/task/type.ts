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
