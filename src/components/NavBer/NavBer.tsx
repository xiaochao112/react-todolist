import {
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import { Avatar, Input, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useEffect, useState } from 'react';
import LoginAndRegister from '@components/common/LoginAndRegister';
import { useStateUserInfo } from '@store/hook';

function NavBer() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const userInfo = useStateUserInfo();
  const loginItem: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <p
          className='ml-2'
          style={{
            width: 200,
          }}>
          退出登录
        </p>
      ),
    },
  ];
  const logoutItem: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <p
          className='ml-2'
          style={{
            width: 200,
          }}
          onClick={() => {
            setIsLoginModalOpen(true);
          }}>
          立即登录
        </p>
      ),
    },
  ];
  const menulist = () => {
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: <p className='ml-2'>主题设置</p>,
      },
      {
        key: '2',
        label: <p className='ml-2'>更新日志</p>,
      },
    ];
    return items.concat(userInfo.isLogin ? loginItem : logoutItem);
  };
  useEffect(() => {
    console.log(userInfo.isLogin, 'userInfo');
  }, [userInfo]);
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
              <Dropdown menu={{ items: menulist() }}>
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
