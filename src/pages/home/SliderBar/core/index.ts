import dayjs from 'dayjs';
import { STime } from '../type';

export function getTimeByIndex(timeIndex?: number) {
  let startTime = 0,
    endTime = 0;

  switch (timeIndex) {
    case STime.近七天:
      startTime = dayjs().subtract(7, 'day').startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
    case STime.昨天:
      startTime = dayjs().subtract(1, 'day').startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
    case STime.今天:
      startTime = dayjs().startOf('D').valueOf();
      endTime = dayjs().endOf('D').valueOf();
      return [startTime, endTime];
    default:
      break;
  }
  return [startTime, endTime];
}
