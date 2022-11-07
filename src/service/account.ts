import { request } from 'umi';
import { requestDataWrap } from '../utils/request';

export const getAccountList = async (data: any) => {
  return request('/api/accounts/list', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const createAccountItem = async (data: unknown) => {
  return request('/api/accounts/create', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editAccountItem = async (data: unknown) => {
  return request('/api/accounts/edit', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};

export const deleteAccountItem = async (data: unknown) => {
  return request('/api/accounts/delete', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};

export const getRolesList = async (data: unknown) => {
  return request('/api/accounts/role/list', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const createRolesItem = async (data: unknown) => {
  return request('/api/accounts/role/create', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editRolesList = async (data: unknown) => {
  return request('/api/accounts/role/edit', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const deleteRolesList = async (data: unknown) => {
  return request('/api/accounts/role/delete', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
