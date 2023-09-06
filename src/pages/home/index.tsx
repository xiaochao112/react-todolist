import './index.less';
import Content from './Content';
import SliderBar from './SliderBar';
import { useEffect, useState } from 'react';
import { getTaskList } from '@api/task';
import { useStateUserInfo } from '@store/hook';
import { TTaskItem } from '@api/task/type';

export type TSaerchParams = {
  // taskType: number;
  status: number;
  startTime: number;
  endTime: number;
  timeIndex: number;
};

function MyHome() {
  const userInfo = useStateUserInfo();
  const [taskList, setTaskList] = useState<TTaskItem[]>([]);
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const [searchParams, setSearchParams] = useState<TSaerchParams>();
  // 初始化请求
  useEffect(() => {
    let ignore = false;
    const getList = async () => {
      if (searchParams) {
        const data = { ...page, ...searchParams };
        if (userInfo.isLogin) {
          const res = await getTaskList(data);
          // 如果有缓存，则不重新赋值
          if (!ignore) {
            setTaskList(res.result!.result);
          }
        } else {
          setTaskList([]);
        }
      }
    };
    getList();
    return () => {
      ignore = true;
    };
  }, [page, userInfo, searchParams]);

  async function getList() {
    const data = { ...page, ...searchParams };
    const res = await getTaskList(data);
    setTaskList(res.result!.result);
  }
  return (
    <>
      <div className='flex h-full'>
        <SliderBar
          onSearchChange={(data) => {
            setSearchParams(data);
          }}
        />
        <div className='content flex w-full justify-center'>
          <Content taskList={taskList} getList={getList} searchTime={searchParams!} />
        </div>
      </div>
    </>
  );
}

export default MyHome;
