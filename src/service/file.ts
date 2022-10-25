import { request } from 'umi';
import { requestDataWrap } from '@/utils/request';
export const uploadFile = async (data: any) => {
  return request('/api/accounts/fileupload', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap({}),
  });
};
