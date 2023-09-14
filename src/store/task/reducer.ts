import * as actionType from './actionType';
import { TaskType, actionT } from './type';

const taskTypeListState: TaskType[] = [];

export default function reducer(state = taskTypeListState, action: actionT) {
  const { type, taskTypeList } = action;
  switch (type) {
    case actionType.SET_TASKTYPE:
      return taskTypeList;
    case actionType.CLEAR_TASKTYPE:
      return [];
    default:
      return state;
  }
}
