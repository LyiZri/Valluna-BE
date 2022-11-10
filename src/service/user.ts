import { request } from 'umi';
import { loginRequestDataWrap } from '@/utils/request';
export const userLogin = async (data: any) => {
  return request('/api/login', {
    method: 'post',
    requestType: 'form',
    data: loginRequestDataWrap(data),
  });
};
export const gmailLogin = async (data: any) => {
  return request('/api/gmaillogin', {
    method: 'post',
    requestType: 'form',
    data: loginRequestDataWrap(data),
  });
};
