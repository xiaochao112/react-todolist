import { PlusCircleOutlined } from '@ant-design/icons';
import empty from '@assets/img/empty.jpg';
import { Button, message } from 'antd';
import TaskItem from './Tasks/TaskItem';
import { TTaskItem } from '@api/task/type';
import { delTaskItem } from '@api/task';
import { TSaerchParams } from '..';
import { getFullTimeByIndex, getTimeTextByIndex } from '../util';

type TProps = {
  taskList: TTaskItem[];
  getList: () => void;
  searchTime: TSaerchParams;
  onEditTaskModal: (type?: 'add' | 'edit', task?: TTaskItem) => void;
};

function Content({ taskList, getList, searchTime, onEditTaskModal }: TProps) {
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
        {taskList?.map((item, index) => (
          <TaskItem
            key={index}
            item={item}
            onShowTaskModal={() => {
              onEditTaskModal('edit', item);
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
        {!taskList.length && (
          <div className=' w-full flex justify-center flex-col items-center mt-10'>
            <img src={empty} alt='' />
            <p className=' font-bold'>准备做点什么呢？😄</p>
            <p className='text-desc text-xs'>“备忘+安排” 任务清单、不断提升效率！😎</p>
          </div>
        )}
        <div>
          <Button
            icon={<PlusCircleOutlined />}
            type='link'
            className='mt-5'
            onClick={() => {
              onEditTaskModal('add');
            }}>
            添加任务
          </Button>
        </div>
      </div>
    </>
  );
}

export default Content;
