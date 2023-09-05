import './index.less';
import Content from './Content';
import SliderBar from './SliderBar';

function MyHome() {
  return (
    <>
      <div className='flex h-full'>
        <SliderBar />
        <div className='content flex w-full justify-center'>
          <Content />
        </div>
      </div>
    </>
  );
}

export default MyHome;
