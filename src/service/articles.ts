import { request } from 'umi';
import { requestDataWrap } from '@/utils/request';
export const getArticlesList = async (data: any) => {
  return request('/api/articles/list', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const editArticlesList = async (data: any) => {
  return request('/api/articles/edit', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const addArticlesList = async (data: any) => {
  return request('/api/articles/add', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const deleteArticlesList = async (data: any) => {
  return request('/api/articles/delete', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const changeArticlesListPublish = async (data: any) => {
  return request('/api/articles/multiplepublish', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
};
export const getArticlesDetails = async (data: any) => {
  return request('/api/articles/fetching', {
    method: 'post',
    requestType: 'form',
    data: requestDataWrap(data),
  });
}
