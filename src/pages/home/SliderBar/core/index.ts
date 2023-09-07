import dayjs from 'dayjs';
import { STime } from '../type';

// 当前选中的时期，除了自定义时间
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

// 处理自定义时间
export function getTimeStringByDate(date: string | undefined, flag: 'start' | 'end'): number {
  return flag === 'start' ? dayjs(date).startOf('D').valueOf() : dayjs(date).endOf('D').valueOf();
}
// 自定义默认时间前一个月
export function getCurrentMonthsTime() {
  return [dayjs().subtract(1, 'month').startOf('D').valueOf(), dayjs().endOf('D').valueOf()];
}
