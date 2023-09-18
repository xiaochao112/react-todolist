import { BellOutlined, CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import empty from '@assets/img/empty.jpg';
import { Button, message, notification } from 'antd';
import TaskItem from './Tasks/TaskItem';
import { TTaskItem } from '@api/task/type';
import { delTaskItem, updateTaskStatus } from '@api/task';
import { TSaerchParams } from '..';
import { getFullTimeByIndex, getTimeTextByIndex } from '../util';
import { useStateUserInfo } from '@store/hook';
import { useSearch } from '@hooks/useSearch';
import { useMemo } from 'react';

type TProps = {
  taskList: TTaskItem[];
  getList: () => void;
  searchTime: TSaerchParams;
  onEditTaskModal: (type?: 'add' | 'edit', task?: TTaskItem) => void;
};

function Content({ taskList, getList, searchTime, onEditTaskModal }: TProps) {
  const userInfo = useStateUserInfo();
  const { searchInfo, setSearchInfo } = useSearch();

  const tasks = useMemo(() => {
    if (searchInfo?.taskId) {
      return [searchInfo];
    } else {
      return taskList;
    }
  }, [searchInfo, taskList]);

  return (
    <>
      <div className=' h-full pt-5' style={{ width: 800 }}>
        <div>
          <h3 className='font-bold inline-block mr-1'>
            {getTimeTextByIndex(searchTime?.timeIndex)}
          </h3>
          <span className='text-xs text-desc'>
            {getFullTimeByIndex(searchTime?.timeIndex, searchTime?.startTime, searchTime?.endTime)}
          </span>
        </div>
        {tasks?.map((item, index) => (
          <TaskItem
            key={index}
            item={item}
            onShowTaskModal={() => {
              onEditTaskModal('edit', item);
            }}
            onToggleState={async (state) => {
              const data = {
                userId: userInfo.user.id,
                status: state ? 1 : 0,
                taskId: item.taskId,
              };
              const res = await updateTaskStatus(data);
              if (res.code === 200) {
                notification.info({
                  message: state ? '任务已完成' : '恢复任务',
                  description: (
                    <>
                      <p className='text-base'>{item.taskName}</p>
                      <p className='text-xs'>{item.taskContent}</p>
                    </>
                  ),
                  icon: state ? (
                    <CheckCircleOutlined
                      style={{
                        color: '#2ecc71',
                      }}
                    />
                  ) : (
                    <BellOutlined
                      style={{
                        color: '#f39c12',
                      }}
                    />
                  ),
                });
                getList();
              }
              console.log(res);
            }}
            delItem={async () => {
              const res = await delTaskItem({ taskId: item.taskId });
              if (res.code === 200) {
                message.success('删除成功！');
                getList();
              }
            }}
          />
        ))}
        {!tasks.length && (
          <div className=' w-full flex justify-center flex-col items-center mt-10'>
            <img src={empty} alt='' />
            <p className=' font-bold'>准备做点什么呢？😄</p>
            <p className='text-desc text-xs'>“备忘+安排” 任务清单、不断提升效率！😎</p>
          </div>
        )}
        <div>
          {searchInfo?.taskId ? (
            <Button
              icon={<PlusCircleOutlined />}
              type='link'
              className='mt-5'
              onClick={() => {
                setSearchInfo(undefined as any);
              }}>
              恢复搜索
            </Button>
          ) : (
            <Button
              icon={<PlusCircleOutlined />}
              type='link'
              className='mt-5'
              onClick={() => {
                onEditTaskModal('add');
              }}>
              添加任务
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Content;
