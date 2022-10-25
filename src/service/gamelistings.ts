import { request } from 'umi';
import { requestDataWrap } from '@/utils/request';
export const getGLOverviewList = async (data: any) => {
  return request('/api/gamelistings/list', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const deleteGLOverviewItem = async (data: any) => {
  return request('/api/gamelistings/delete', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const getGLBlockChainList = async (data: any) => {
  return request('/api/gamelistings/blockchainlist', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editGLOverviewItem = async (data: any) => {
  return request('/api/gamelistings/edit', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const addGLOverviewItem = async (data: any) => {
  return request('/api/gamelistings/create', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const getCategoryList = async (data: any) => {
  return request('/api/gamelistings/categorylist', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const addCategoryItem = async (data: any) => {
  return request('/api/gamelistings/addcategory', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editCategoryItem = async (data: any) => {
  return request('/api/gamelistings/editcategory', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};

export const addGLBlockChainItem = async (data: any) => {
  return request('/api/gamelistings/addblockchain', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editGLBlockChainItem = async (data: any) => {
  return request('/api/gamelistings/editblockchain', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
