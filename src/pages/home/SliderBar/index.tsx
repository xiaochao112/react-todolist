import Icon, { PlusOutlined } from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import MenuItem from './menuItem';
import { taskStatusListConst, timeListConst } from './content';
import { useEffect, useRef, useState } from 'react';
import { STime } from './type';
import { TSaerchParams } from '..';
import { getCurrentMonthsTime, getTimeByIndex, getTimeStringByDate } from './core';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import { delTaskType, getTaskTypeList } from '@api/task/taskType';
import { TaskType } from '@api/task/taskType/type';
import TaskTypeModal from '../Content/Tasks/TaskTypeModal';
import * as icons from '@ant-design/icons';
import { useDispatchTaskType, useStateTaskTypeList } from '@store/hook/task';

type TPorps = {
  onSearchChange: (data: TSaerchParams) => void; // search数据监听
};
const { RangePicker } = DatePicker;

function SliderBar({ onSearchChange }: TPorps) {
  const { stateSetTaskType } = useDispatchTaskType();
  const taskTypeList = useStateTaskTypeList();
  const [timeIndex, setTimeIndex] = useState<STime>(timeListConst[0].type); // 当前选中的日期区间
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0); // 当前选择的状态
  const [taskTypeIndex, setTaskTypeIndex] = useState(0); // 当前选择的任务类型
  const [showTaskTypeModal, setShowTaskTypeModal] = useState(false); // 是否显示类型对话框
  const dateRangeValue = useRef<[moment.Moment, moment.Moment]>([
    moment(moment(new Date()).subtract(1, 'month').format('YYYY/MM/DD')),
    moment(new Date(), 'YYYY/MM/DD'),
  ]); // 自定义时间
  const timeStr = useRef<number[]>([0, 0]); // 自定义时间戳

  const titleModal = useRef<'add' | 'edit'>('add'); // 类型对话框
  const taskTypeInfo = useRef<TaskType>();
  // 搜索数据，监听数据变化
  const handleSearch = () => {
    const [startTime, endTime] = getTimeByIndex(timeIndex);
    const data = {
      startTime,
      endTime,
      status: taskStatusIndex,
      typeId: taskTypeIndex,
    };
    if (timeIndex === STime.自定义 && !timeStr.current[0]) {
      timeStr.current = getCurrentMonthsTime();
    }
    if (timeIndex === STime.自定义 && timeStr.current[0]) {
      data.startTime = timeStr.current[0];
      data.endTime = timeStr.current[1];
    }
    onSearchChange(data);
  };
  async function getTaskType() {
    const res = await getTaskTypeList();
    stateSetTaskType(res.result!);
  }
  useEffect(() => {
    let ignore = false;
    getTaskTypeList().then((res) => {
      if (!ignore) {
        stateSetTaskType(res.result!);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    handleSearch();
    return () => {};
  }, [timeIndex, taskStatusIndex, taskTypeIndex]);

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
                    dateRangeValue.current = [moment(timpStr[0]), moment(timpStr[1])];
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
            <div
              onClick={() => {
                taskTypeInfo.current = void 0;
                setShowTaskTypeModal(true);
              }}>
              <MyIcon className=' mr-2' icon={<PlusOutlined className=' flex text-xl' />} />
            </div>
          </div>
          <div>
            {taskTypeList?.map((item, index) => (
              <MenuItem
                key={index}
                text={item.typeName}
                isShowDel
                isShowEdit
                checked={item.typeId === taskTypeIndex}
                icon={renderIcon(item.icon, item.themeColor)}
                onClick={() => {
                  setTaskTypeIndex(item.typeId);
                }}
                onDel={() => {
                  delTaskType({ typeId: item.typeId }).then((res) => {
                    if (res.code === 200) {
                      message.success('删除成功！');
                      getTaskType();
                    }
                  });
                }}
                onEdit={() => {
                  titleModal.current = 'edit';
                  taskTypeInfo.current = { ...item };
                  setShowTaskTypeModal(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <TaskTypeModal
        title={titleModal.current}
        show={showTaskTypeModal}
        typeInfo={taskTypeInfo.current}
        handleCancel={() => {
          setShowTaskTypeModal(false);
        }}
        getTaskTypeList={() => {
          getTaskType();
        }}
      />
    </>
  );
}
// 渲染图标
function renderIcon(iconName?: string, themeColor?: string) {
  const isIcon = iconName;
  if (isIcon) {
    return <Icon component={(icons as any)[iconName]} style={{ color: themeColor }}></Icon>;
  }
  return <PlusOutlined />;
}

export default SliderBar;
