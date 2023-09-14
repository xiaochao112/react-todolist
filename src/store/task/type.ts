export type TaskType = {
  typeId: number;
  userId: number;
  typeName: string;
  desc: string;
  createTime: string;
  updateTime: string;
  themeColor?: string;
  icon?: string;
};
// state
export type actionT = {
  type: string;
  taskTypeList: TaskType;
};
