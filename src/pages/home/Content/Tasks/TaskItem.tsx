import { Checkbox, Popconfirm } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import './index.less';
import { CarryOutOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { TTaskItem } from '@api/task/type';
import dayjs from 'dayjs';

type TPorps = {
  item: TTaskItem;
  delItem: () => void;
  onShowTaskModal: () => void;
};
const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};
function TaskItem({ item, delItem, onShowTaskModal }: TPorps) {
  return (
    <>
      <div className=' w-full task-item relative p-2 rounded-md'>
        <div>
          <Checkbox onChange={onChange}></Checkbox>
          <a
            className=' text-sm ml-2 cursor-pointer'
            onClick={() => {
              onShowTaskModal();
            }}>
            {item.taskName}
          </a>
        </div>
        <div className=' pl-6 mt-1 text-xs text-desc'>{item.taskContent}</div>
        <div className='w-full flex justify-between my-1 text-xs text-desc'>
          <div className='pl-6' style={{ color: 'red' }}>
            状态：{item.status ? '完成' : '未完成'}
          </div>
          <div>
            <CarryOutOutlined className='mr-1' />
            <span>{dayjs(+item.createTime).format('YYYY-MM-DD - h:mm:ss - a')}</span>
          </div>
        </div>
        <Popconfirm
          okText='确定'
          cancelText='取消'
          title='确定删除该任务吗？'
          onConfirm={delItem}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
          <DeleteOutlined className='snow-delete-btn absolute right-2 top-1/2 -translate-y-1/2 text-base cursor-pointer' />
        </Popconfirm>
      </div>
    </>
  );
}

export default TaskItem;
