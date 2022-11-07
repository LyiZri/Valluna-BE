import { request } from 'umi';
import { requestDataWrap } from '@/utils/request';
export const getHPBannerList = async (data: any) => {
  return request('/api/homepage/bannerlist', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const createHPBannerList = async (data: any) => {
  return request('/api/homepage/bannercreate', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editHPBannerList = async (data: any) => {
  return request('/api/homepage/banneredit', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const deleteHPBannerList = async (data: any) => {
  return request('/api/homepage/bannerdelete', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
