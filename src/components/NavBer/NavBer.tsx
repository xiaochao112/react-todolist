import {
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import { Avatar, Input, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import LoginAndRegister from '@components/common/LoginAndRegister';

function NavBer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <p>主题设置</p>,
    },
    {
      key: '2',
      label: <p>更新日志</p>,
    },
    {
      key: '3',
      label: (
        <p
          onClick={() => {
            setIsLoginModalOpen(true);
          }}>
          立即登录
        </p>
      ),
    },
  ];
  return (
    <>
      <div className=' w-full px-5 flex-shrink-0 primaryNavBarBgColor' style={{ height: 45 }}>
        <div className=' w-full h-full flex items-center justify-between'>
          <div className='flex items-center'>
            <MyIcon className=' mr-2' icon={<UnorderedListOutlined className=' flex text-xl' />} />
            <div>
              <Input placeholder='搜索' style={{ width: 200 }} prefix={<SearchOutlined />} />
            </div>
          </div>
          <div className='flex items-center'>
            <MyIcon className=' mr-2' icon={<PlusOutlined className=' flex text-xl' />} />
            <div>
              <Dropdown menu={{ items }}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <LoginAndRegister
        show={isLoginModalOpen}
        handleCancel={() => {
          setIsLoginModalOpen(false);
        }}
      />
    </>
  );
}

export default NavBer;
