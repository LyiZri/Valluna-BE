// 全局共享数据示例
import { useState } from 'react';
import { IManage } from '@/types/user';

const useUser = () => {
  const [rolesInfo, setRolesInfo] = useState<IManage>();
  return {
    rolesInfo,
    setRolesInfo,
  };
};

export default useUser;
