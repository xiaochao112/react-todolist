import { CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import MenuItem from './menuItem';
import { taskStatusListConst, timeListConst } from './content';
import { useEffect, useRef, useState } from 'react';
import { STime } from './type';
import { TSaerchParams } from '..';
import { getCurrentMonthsTime, getTimeByIndex, getTimeStringByDate } from './core';
import { DatePicker } from 'antd';
import moment from 'moment';
import { getTaskTypeList } from '@api/task/taskType';
import { TaskType } from '@api/task/taskType/type';

type TPorps = {
  onSearchChange: (data: TSaerchParams) => void; // search数据监听
};
type TTaskType = {
  taskTypeList: React.MutableRefObject<TaskType[]>;
  ignore: boolean;
};
const { RangePicker } = DatePicker;

async function getTaskType({ taskTypeList, ignore }: TTaskType) {
  const res = await getTaskTypeList();
  if (!ignore) {
    taskTypeList.current = res.result!;
  }
}

function SliderBar({ onSearchChange }: TPorps) {
  const [timeIndex, setTimeIndex] = useState<STime>(timeListConst[0].type);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);
  const dateRangeValue = useRef<[moment.Moment, moment.Moment]>([
    moment(moment(new Date()).subtract(1, 'month').format('YYYY/MM/DD')),
    moment(new Date(), 'YYYY/MM/DD'),
  ]); // 自定义时间
  const timeStr = useRef<number[]>([0, 0]); // 自定义时间戳
  const taskTypeList = useRef<TaskType[]>([]); // 任务类型列表
  // 监听查询变化
  const handleSearch = () => {
    const [startTime, endTime] = getTimeByIndex(timeIndex);
    const data = { startTime, endTime, timeIndex, status: taskStatusIndex };
    if (timeIndex === STime.自定义 && !timeStr.current[0]) {
      timeStr.current = getCurrentMonthsTime();
    }
    if (timeIndex === STime.自定义 && timeStr.current[0]) {
      data.startTime = timeStr.current[0];
      data.endTime = timeStr.current[1];
    }
    onSearchChange(data);
  };

  useEffect(() => {
    let ignore = false;
    getTaskType({ taskTypeList, ignore });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    handleSearch();
    return () => {};
  }, [timeIndex, taskStatusIndex]);

  return (
    <>
      <div className='w-full flex flex-col sliderBarShow primarySliderBarBackgroundColor'>
        <div className=' p-3'>
          <h3 className='text-desc font-bold'>日期</h3>
          <div>
            {timeListConst.map((item, index) => (
              <MenuItem
                key={index}
                text={item.text}
                isShowDel={false}
                isShowEdit={false}
                checked={item.type === timeIndex}
                icon={item.icon}
                onClick={() => {
                  setTimeIndex(item.type);
                }}
              />
            ))}
            <div>
              {timeIndex === STime.自定义 && (
                <RangePicker
                  value={dateRangeValue.current}
                  defaultValue={dateRangeValue.current}
                  onChange={(data) => {
                    const res = data?.map((item) => item?.format('YYYY/MM/DD'));
                    // ts-ignore
                    const timpStr = [
                      getTimeStringByDate(res![0], 'start'),
                      getTimeStringByDate(res![1], 'end'),
                    ];
                    timeStr.current = timpStr;
                    handleSearch();
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className=' p-3'>
          <h3 className='text-desc font-bold'>状态</h3>
          <div>
            {taskStatusListConst.map((item, index) => (
              <MenuItem
                key={index}
                text={item.statusName}
                isShowDel={false}
                isShowEdit={false}
                checked={index === taskStatusIndex}
                icon={item.icon}
                onClick={() => {
                  setTaskStatusIndex(index);
                }}
              />
            ))}
          </div>
        </div>
        <div className=' p-3'>
          <div className='flex justify-between'>
            <h3 className='text-desc font-bold'>任务类型</h3>
            <div>
              <MyIcon className=' mr-2' icon={<PlusOutlined className=' flex text-xl' />} />
            </div>
          </div>
          <div>
            {taskTypeList.current?.map((item, index) => (
              <MenuItem
                key={index}
                text={item.typeName}
                checked={false}
                isShowDel={true}
                isShowEdit={true}
                icon={
                  <CheckCircleOutlined
                    className='text-lg '
                    style={{
                      color: '#2ecc71',
                    }}
                  />
                }
                onClick={() => {
                  setTaskStatusIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default SliderBar;
