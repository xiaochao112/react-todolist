import { PlusOutlined } from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import MenuItem from './menuItem';
import { taskStatusListConst, timeListConst } from './content';
import { useState } from 'react';
import { STime } from './type';

function SliderBar() {
  const [timeIndex, setTimeIndex] = useState<STime>(timeListConst[0].type);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);

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
