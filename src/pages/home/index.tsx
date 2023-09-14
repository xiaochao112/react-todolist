import './index.less';
import Content from './Content';
import SliderBar from './SliderBar';
import { useEffect, useState } from 'react';
import { getTaskList } from '@api/task';
import { useStateUserInfo } from '@store/hook';
import { TTaskItem } from '@api/task/type';
import { Spin } from 'antd';
import TaskModal from './Content/Tasks/TaskModal';

export type TSaerchParams = {
  typeId: number;
  status: number;
  startTime: number;
  endTime: number;
};
type TPorps = {
  showTaskModal: boolean;
  cancelTaskModal: () => void;
  onShowTaskModal: () => void;
};

function MyHome({ showTaskModal, cancelTaskModal, onShowTaskModal }: TPorps) {
  const userInfo = useStateUserInfo();
  const [taskList, setTaskList] = useState<TTaskItem[]>([]);
  const [page, setPage] = useState({ page: 1, pageSize: 10 });
  const [searchParams, setSearchParams] = useState<TSaerchParams>();
  const [isFetching, setIsFetching] = useState(false);
  // 初始化请求
  useEffect(() => {
    let ignore = false;
    setIsFetching(true);
    const getList = async () => {
      if (searchParams) {
        const data = { ...page, ...searchParams };
        if (userInfo.isLogin) {
          const res = await getTaskList(data);
          setTimeout(() => {
            setIsFetching(false);
          }, 200);
          // 如果有缓存，则不重新赋值
          if (!ignore) {
            setTaskList(res.result!.result);
          }
        } else {
          setIsFetching(false);
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
          <Spin tip='Loading...' spinning={isFetching}>
            <Content taskList={taskList} getList={getList} searchTime={searchParams!} />
          </Spin>
        </div>
      </div>
      <TaskModal
        type='add'
        show={showTaskModal}
        handleCancel={() => {
          cancelTaskModal();
        }}
        handleOk={() => {
          getList();
        }}
      />
    </>
  );
}

export default MyHome;
