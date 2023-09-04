import { PlusOutlined } from '@ant-design/icons';
import './index.less';

function MyHome() {
  return (
    <>
      <div className='flex h-full'>
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
              <p>
                <PlusOutlined />
              </p>
            </div>
            <div>
              <p>11111111</p>
              <p>11111111</p>
              <p>11111111</p>
            </div>
          </div>
        </div>
        <div className='content'>内容</div>
      </div>
    </>
  );
}

export default MyHome;
