import { HTMLAttributes, ReactNode } from 'react';
import './index.less';
import { Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
interface TProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon?: ReactNode;
  checked?: boolean;
  isShowDel?: boolean;
  isShowEdit?: boolean;
  onDel?: () => void;
  onEdit?: () => void;
}

function MenuItem({ text, icon, checked, isShowDel, isShowEdit, onDel, onEdit, ...args }: TProps) {
  return (
    <>
      <div
        {...args}
        className='sliderBar_menuItem p-2 rounded-md cursor-pointer'
        style={{ backgroundColor: checked ? '#eee' : '' }}>
        {icon}
        <span className=' ml-2'>{text}</span>
        <div className='float-right'>
          {isShowEdit && (
            <EditOutlined
              onClick={onEdit}
              className='sliderBar_menuItem-icon cursor-pointer mr-3'
            />
          )}
          {isShowDel && (
            <Popconfirm
              okText='确定'
              cancelText='取消'
              onConfirm={onDel}
              title='确定删除该任务吗？'
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
              <DeleteOutlined className='sliderBar_menuItem-icon cursor-pointer' />
            </Popconfirm>
          )}
        </div>
      </div>
    </>
  );
}

export default MenuItem;
