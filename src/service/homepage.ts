import { request } from 'umi';
import { requestDataWrap } from '@/utils/request';
export const getHPBannerList = async (data: any) => {
  return request('/api/homepage/bannerlist', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
