// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const [glInfo, setGlInfo] = useState<string>();
  return {
    glInfo,
    setGlInfo,
  };
};

export default useUser;
