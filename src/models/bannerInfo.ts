// 全局共享数据示例
import { useState } from 'react';
import { IBanners } from '@/types/homepage';

const useUser = () => {
  const [bannerInfo, setBannerInfo] = useState<IBanners>();
  return {
    bannerInfo,
    setBannerInfo,
  };
};

export default useUser;
