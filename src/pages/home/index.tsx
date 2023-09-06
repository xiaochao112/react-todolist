import './index.less';
import Content from './Content';
import SliderBar from './SliderBar';
import { useEffect, useState } from 'react';
import { getTaskList } from '@api/task';
import { useStateUserInfo } from '@store/hook';
import { TTaskItem } from '@api/task/type';

function MyHome() {
  const userInfo = useStateUserInfo();
  const [taskList, setTaskList] = useState<TTaskItem[]>([]);
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  // 初始化请求
  useEffect(() => {
    let ignore = false;
    const getList = async () => {
      const data = { ...page, startTime: 1693238400000, endTime: 1693929599999 };
      if (userInfo.isLogin) {
        const res = await getTaskList(data);
        // 如果有缓存，则不重新赋值
        if (!ignore) {
          setTaskList(res.result!.result);
        }
      } else {
        setTaskList([]);
      }
    };
    getList();
    return () => {
      ignore = true;
    };
  }, [page, userInfo]);

  async function getList() {
    const data = { ...page, startTime: 1693238400000, endTime: 1693929599999 };
    const res = await getTaskList(data);
    // 如果有缓存，则不重新赋值
    setTaskList(res.result!.result);
  }
  return (
    <>
      <div className='flex h-full'>
        <SliderBar />
        <div className='content flex w-full justify-center'>
          <Content taskList={taskList} getList={getList} />
        </div>
      </div>
    </>
  );
}

export default MyHome;
