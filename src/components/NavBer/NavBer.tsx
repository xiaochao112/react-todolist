import {
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import MyIcon from '@components/common/MyIcon';
import { Avatar, Input, Dropdown, Modal, message } from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { useStateUserInfo, useDispatchUser } from '@store/hook';
import { searchTask } from '@api/task';
import { debounce } from 'lodash';
import { useSearch } from '@hooks/useSearch';
import { TTaskItem } from '@api/task/type';
import './navber.less';

type TProps = {
  onShowTaskModal: () => void;
  onLogin: () => void;
};

const { confirm } = Modal;
const showConfirm = (
  stateClearUser: () => {
    type: string;
  },
) => {
  confirm({
    title: '是否退出登录？',
    icon: <ExclamationCircleOutlined />,
    content: '',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      stateClearUser();
      message.success('已退出登录');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
function NavBer({ onShowTaskModal, onLogin }: TProps) {
  const { setSearchInfo } = useSearch();
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState<TTaskItem[]>([]);

  const { stateClearUser } = useDispatchUser();
  const userInfo = useStateUserInfo();

  const loginItem: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <p
          className='ml-2'
          style={{
            width: 200,
          }}
          onClick={() => showConfirm(stateClearUser)}>
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
          onClick={onLogin}>
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

  const searchFn = debounce(async (e) => {
    const searchValue = e.target.value;
    if (!searchValue) {
      setSearchList([]);
      return;
    }
    const res = await searchTask({ taskName: searchValue });
    if (res.code === 200) {
      setSearchList(res.result!.result);
    }
  }, 500);

  // 搜索
  const onChageSearch = (e) => {
    setSearchText(e.target.value);
    searchFn(e);
  };

  return (
    <>
      <div className=' w-full px-5 flex-shrink-0 primaryNavBarBgColor' style={{ height: 45 }}>
        <div className=' w-full h-full flex items-center justify-between'>
          <div className='flex items-center'>
            <MyIcon className=' mr-2' icon={<UnorderedListOutlined className=' flex text-xl' />} />
            <div>
              <Input
                placeholder='搜索'
                value={searchText}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
                onChange={onChageSearch}
              />
              {!!searchList.length && (
                <div
                  className=' absolute left-0 top-10 ml-4 bg-white z-30'
                  style={{
                    width: 300,
                  }}>
                  {searchList.map((task, index) => (
                    <div
                      key={index}
                      className='snow-search-item-hover text-black flex justify-between py-2 px-2 text-xs cursor-pointer'
                      onClick={() => {
                        setSearchInfo(task);
                        setSearchList([]);
                        setSearchText('');
                      }}>
                      <div>
                        {task.taskName.length > 18
                          ? task.taskName.slice(0, 18) + '...'
                          : task.taskName}
                      </div>
                      <div>{task.typeMessage.typeName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center'>
            <MyIcon
              className=' mr-2'
              icon={<PlusOutlined className=' flex text-xl' />}
              onClick={() => {
                onShowTaskModal();
              }}
            />
            <div>
              <Dropdown menu={{ items: menulist() }}>
                <Avatar
                  style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBer;
