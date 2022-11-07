import { getUserToken } from './user';

export const requestDataWrap = (data: any) => {
  return { data: JSON.stringify({ ...data, token: getUserToken() }) };
};
export const loginRequestDataWrap = (data: any) => {
  return { data: JSON.stringify(data) };
};
export const uploadFilesDataWrap = (data: any) => {
  const token = localStorage.getItem('token');
  return { file: data, data: JSON.stringify({ token: token }) };
};
