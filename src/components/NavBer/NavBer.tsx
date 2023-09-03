import {
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Input } from 'antd';

function NavBer() {
  return (
    <>
      <div className=' w-full px-5 flex-shrink-0 primaryNavBarBgColor' style={{ height: 45 }}>
        <div className=' w-full h-full flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='  pr-5'>
              <UnorderedListOutlined className=' flex text-xl' />
            </div>
            <div>
              <Input placeholder='搜索' style={{ width: 200 }} prefix={<SearchOutlined />} />
            </div>
          </div>
          <div className='flex items-center'>
            <div className=' pr-5'>
              <PlusOutlined />
            </div>
            <div>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBer;
