// 全局共享数据示例
import { IGame } from '@/types/gameListing';
import { useState } from 'react';

const useUser = () => {
  const [glInfo, setGlInfo] = useState<IGame>();
  return {
    glInfo,
    setGlInfo,
  };
};

export default useUser;
