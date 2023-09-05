import './index.less';
import Content from './Content';
import SliderBar from './SliderBar';
import { useEffect, useRef, useState } from 'react';
import { getTaskList } from '@api/task';
import { useStateUserInfo } from '@store/hook';
import { TResTaskList, TTaskItem } from '@api/task/type';

function MyHome() {
  const userInfo = useStateUserInfo();
  const [taskList, setTaskList] = useState<TTaskItem[]>([]);
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const res = useRef<TResTaskList | null>(null);
  useEffect(() => {
    let ignore = false;
    const getList = async () => {
      const data = { ...page, startTime: 1693238400000, endTime: 1693929599999 };
      if (!res.current) {
        res.current = await getTaskList(data);
      }
      if (!ignore) {
        setTaskList(res.current.result!.result);
      }
    };
    getList();
    return () => {
      ignore = true;
    };
  }, [page]);
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
