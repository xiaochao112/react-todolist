import { TTaskItem } from '@api/task/type';
import { ReactNode, createContext, useContext, useState } from 'react';

type searchInfo = {
  searchInfo?: TTaskItem;
  setSearchInfo: (taskItem?: TTaskItem) => void;
};

// 创建搜索上下文
const SearchInfoContext = createContext<searchInfo>({
  searchInfo: undefined,
  setSearchInfo: () => {},
});

type TProps = {
  children: ReactNode;
};
export const SearchProvider = ({ children }: TProps) => {
  const [searchInfo, setSearchInfo] = useState<TTaskItem | undefined>();

  const contextValue = {
    searchInfo,
    setSearchInfo,
  };

  return (
    <>
      <SearchInfoContext.Provider value={contextValue}>{children}</SearchInfoContext.Provider>
    </>
  );
};

// 获取搜索上下文数据
export const useSearch = () => useContext(SearchInfoContext);
