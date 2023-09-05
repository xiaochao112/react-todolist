import './index.less';
import Content from './Content';
import SliderBar from './SliderBar';
import { useEffect, useState } from 'react';
import { getTaskList } from '@api/task';

function MyHome() {
  const [taskList, setTaskList] = useState<string[]>([]);
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const getList = async () => {
    const data = { ...page, startTime: 1693238400000, endTime: 1693929599999 };
    const res = await getTaskList(data);
    console.log(res, 'res');
  };
  // useEffect(() => {
  //   getList();
  // }, []);
  return (
    <>
      <div className='flex h-full'>
        <SliderBar />
        <div className='content flex w-full justify-center'>
          <Content taskList={taskList} />
        </div>
      </div>
    </>
  );
}

export default MyHome;
