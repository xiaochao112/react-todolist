import { PlusOutlined } from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';

function SliderBar() {
  return (
    <>
      <div className='w-full flex flex-col sliderBarShow primarySliderBarBackgroundColor'>
        <div className=' p-3'>
          <h3 className='text-desc font-bold'>日期</h3>
          <div>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
          </div>
        </div>
        <div className=' p-3'>
          <h3 className='text-desc font-bold'>状态</h3>
          <div>
            <p>11111111</p>
            <p>11111111</p>
            <p>11111111</p>
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
