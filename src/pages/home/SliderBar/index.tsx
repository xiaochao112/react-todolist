import { PlusOutlined } from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import MenuItem from './menuItem';
import { taskStatusListConst, timeListConst } from './content';
import { useEffect, useState } from 'react';
import { STime } from './type';
import { TSaerchParams } from '..';
import { getTimeByIndex } from './core';
type TPorps = {
  onSearchChange: (data: TSaerchParams) => void; // search数据监听
};

function SliderBar({ onSearchChange }: TPorps) {
  const [timeIndex, setTimeIndex] = useState<STime>(timeListConst[0].type);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);

  const handleSearch = () => {
    const [startTime, endTime] = getTimeByIndex(timeIndex);

    const date = { startTime, endTime, timeIndex, status: taskStatusIndex };
    console.log(date, 'date');
    onSearchChange(date);
  };
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
                checked={item.type === timeIndex}
                icon={item.icon}
                onClick={() => {
                  setTimeIndex(item.type);
                }}
              />
            ))}
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
            <div>
              <MyIcon className=' mr-2' icon={<PlusOutlined className=' flex text-xl' />} />
            </div>
          </div>
          <div>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SliderBar;
