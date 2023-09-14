import { RootState } from '@store';
import { clearTaskTypeAction, setTaskTypeAction } from '@store/task/action';
import { TaskType } from '@store/task/type';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useStateTaskTypeList = () => useSelector((state: RootState) => state.taskType);

export function useDispatchTaskType() {
  const dispatch = useDispatch();

  const stateSetTaskType = useCallback(
    (taskTypeList: TaskType[]) => dispatch(setTaskTypeAction(taskTypeList)),
    [dispatch],
  );
  const stateClearTaskType = useCallback(() => dispatch(clearTaskTypeAction()), [dispatch]);

  return { stateSetTaskType, stateClearTaskType };
}
