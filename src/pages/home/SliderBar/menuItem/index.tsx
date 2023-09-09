import { HTMLAttributes, ReactNode } from 'react';
import './index.less';
import { Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
interface TPorps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: ReactNode;
  checked: boolean;
  isShowDel: boolean;
  isShowEdit: boolean;
}

function MenuItem({ text, icon, checked, isShowDel, isShowEdit, ...args }: TPorps) {
  return (
    <>
      <div
        {...args}
        className='sliderBar_menuItem p-2 rounded-md cursor-pointer'
        style={{ backgroundColor: checked ? '#eee' : '' }}>
        {icon}
        <span className=' ml-2'>{text}</span>
        <div className='float-right'>
          {isShowEdit && <EditOutlined className='sliderBar_menuItem-icon cursor-pointer mr-3' />}
          {isShowDel && (
            <Popconfirm
              okText='确定'
              cancelText='取消'
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
