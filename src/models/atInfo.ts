// 全局共享数据示例
import { useState } from 'react';
import { IArticles } from '@/types/articles';

const useUser = () => {
  const [atInfo, setAtInfo] = useState<IArticles>();
  return {
    atInfo,
    setAtInfo,
  };
};

export default useUser;
